<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class ProcessMeeting implements ShouldQueue
{
    use Queueable;

    public $meeting;

    /**
     * Create a new job instance.
     */
    public function __construct(\App\Models\Meeting $meeting)
    {
        $this->meeting = $meeting;
    }

    /**
     * Execute the job.
     */
    public function handle(\App\Services\OpenAIService $openAIService): void
    {
        \Illuminate\Support\Facades\Log::info("Starting processing for meeting ID: {$this->meeting->id}");
        
        $localOriginalPath = null;
        $normalizedPath = null;
        $chunkDir = null;

        try {
            // 1. Download file from R2
            $disk = \Illuminate\Support\Facades\Storage::disk('r2');
            if (!$disk->exists($this->meeting->audio_path)) {
                throw new \Exception("Audio file not found: " . $this->meeting->audio_path);
            }
            \Illuminate\Support\Facades\Log::info("Audio file found on R2: {$this->meeting->audio_path}");

            $originalExtension = pathinfo($this->meeting->audio_path, PATHINFO_EXTENSION) ?: 'mp3';
            $localOriginalPath = sys_get_temp_dir() . '/original_' . uniqid() . '.' . $originalExtension;
            file_put_contents($localOriginalPath, $disk->get($this->meeting->audio_path));
            \Illuminate\Support\Facades\Log::info("Downloaded to local path: {$localOriginalPath}");

            // 2. Normalize Audio (Convert to 64k mono MP3)
            $normalizedPath = sys_get_temp_dir() . '/normalized_' . uniqid() . '.mp3';
            \Illuminate\Support\Facades\Log::info("Normalizing audio to: {$normalizedPath}");

            $cmdNormalize = "ffmpeg -i {$localOriginalPath} -map 0:a -ac 1 -b:a 64k -ar 16000 -f mp3 -y {$normalizedPath} 2>&1";
            exec($cmdNormalize, $outputNormalize, $returnCodeNormalize);

            if ($returnCodeNormalize !== 0 || !file_exists($normalizedPath) || filesize($normalizedPath) === 0) {
                \Illuminate\Support\Facades\Log::error("FFmpeg normalization failed", [
                    'return_code' => $returnCodeNormalize,
                    'output' => $outputNormalize,
                    'file_exists' => file_exists($normalizedPath),
                    'file_size' => file_exists($normalizedPath) ? filesize($normalizedPath) : 0
                ]);
                throw new \Exception("FFmpeg normalization failed: " . implode("\n", $outputNormalize));
            }
            \Illuminate\Support\Facades\Log::info("Audio normalized successfully. Size: " . filesize($normalizedPath) . " bytes");

            // 3. Chunking (Split into 10-minute segments)
            $chunkDir = sys_get_temp_dir() . '/chunks_' . uniqid();
            mkdir($chunkDir);

            $chunkPattern = $chunkDir . '/chunk_%03d.mp3';
            \Illuminate\Support\Facades\Log::info("Chunking audio to: {$chunkDir}");

            $cmdChunk = "ffmpeg -i {$normalizedPath} -f segment -segment_time 600 -c copy -reset_timestamps 1 {$chunkPattern} 2>&1";
            exec($cmdChunk, $outputChunk, $returnCodeChunk);

            if ($returnCodeChunk !== 0) {
                \Illuminate\Support\Facades\Log::error("FFmpeg chunking failed", [
                    'return_code' => $returnCodeChunk,
                    'output' => $outputChunk
                ]);
                throw new \Exception("FFmpeg chunking failed: " . implode("\n", $outputChunk));
            }

            $chunkFiles = glob($chunkDir . '/*.mp3');
            sort($chunkFiles);

            // Filter out empty chunks
            $chunkFiles = array_filter($chunkFiles, function($file) {
                return file_exists($file) && filesize($file) > 0;
            });

            \Illuminate\Support\Facades\Log::info("Created " . count($chunkFiles) . " valid chunks.");

            if (empty($chunkFiles)) {
                 throw new \Exception("No valid audio chunks created.");
            }

            // 4. Transcription
            $fullTranscript = '';
            
            foreach ($chunkFiles as $index => $chunkFile) {
                \Illuminate\Support\Facades\Log::info("Transcribing chunk " . ($index + 1) . "/" . count($chunkFiles) . " - Size: " . filesize($chunkFile) . " bytes");

                if (!file_exists($chunkFile) || filesize($chunkFile) === 0) {
                    \Illuminate\Support\Facades\Log::error("Chunk file is empty or doesn't exist: {$chunkFile}");
                    continue;
                }

                $fileStream = fopen($chunkFile, 'r');
                if (!$fileStream) {
                    \Illuminate\Support\Facades\Log::error("Failed to open chunk file: {$chunkFile}");
                    continue;
                }

                try {
                    $chunkTranscript = $openAIService->transcribe($fileStream);
                    $fullTranscript .= $chunkTranscript . " ";

                    $this->meeting->update([
                        'transcription' => trim($fullTranscript),
                    ]);

                    \Illuminate\Support\Facades\Log::info("Chunk " . ($index + 1) . " transcribed successfully. Length: " . strlen($chunkTranscript));
                } catch (\Exception $e) {
                    \Illuminate\Support\Facades\Log::error("Failed to transcribe chunk " . ($index + 1) . ": " . $e->getMessage());
                    // Continue with other chunks instead of failing completely
                } finally {
                    // Only close if it's still a valid resource (OpenAI might have closed it)
                    if (is_resource($fileStream)) {
                        @fclose($fileStream);
                    }
                }
            }
            \Illuminate\Support\Facades\Log::info("Transcription complete. Length: " . strlen($fullTranscript));

            // 5. Summarization & Action Items
            if (empty(trim($fullTranscript))) {
                throw new \Exception("No transcription content generated.");
            }

            try {
                $notes = $openAIService->generateMeetingNotes($fullTranscript);
                \Illuminate\Support\Facades\Log::info("Summarization complete.");

                $this->meeting->update([
                    'summary' => $notes['summary'] ?? 'Summary could not be generated.',
                    'status' => 'completed',
                ]);

                if (isset($notes['action_items']) && is_array($notes['action_items'])) {
                    foreach ($notes['action_items'] as $item) {
                        if (!empty(trim($item))) {
                            $this->meeting->actionItems()->create(['content' => trim($item)]);
                        }
                    }
                }
            } catch (\Exception $e) {
                \Illuminate\Support\Facades\Log::error("Summarization failed: " . $e->getMessage());
                // Still mark as completed since we have transcription
                $this->meeting->update([
                    'summary' => 'Summary could not be generated due to an error.',
                    'status' => 'completed',
                ]);
            }

        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error("Processing meeting {$this->meeting->id} failed: " . $e->getMessage());
            $this->meeting->update(['status' => 'failed']);
            throw $e; 
        } finally {
            if ($localOriginalPath && file_exists($localOriginalPath)) unlink($localOriginalPath);
            if ($normalizedPath && file_exists($normalizedPath)) unlink($normalizedPath);
            if ($chunkDir && is_dir($chunkDir)) {
                array_map('unlink', glob("$chunkDir/*.mp3"));
                rmdir($chunkDir);
            }
        }
    }
}
