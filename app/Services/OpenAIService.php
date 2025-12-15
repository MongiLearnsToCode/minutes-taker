<?php

namespace App\Services;

class OpenAIService
{
    public function transcribe($fileStream)
    {
        try {
            $response = \OpenAI\Laravel\Facades\OpenAI::audio()->transcribe([
                'model' => 'whisper-1',
                'file' => $fileStream,
                'response_format' => 'text',
            ]);

            return trim($response->text ?? '');
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error("OpenAI transcription failed: " . $e->getMessage());
            throw $e;
        }
    }

    public function generateMeetingNotes(string $transcript)
    {
        try {
            // Truncate transcript if too long (GPT-4 has token limits)
            $maxLength = 10000; // Rough character limit
            if (strlen($transcript) > $maxLength) {
                $transcript = substr($transcript, 0, $maxLength) . "...";
            }

            $prompt = "You are a professional minute taker. Analyze the following meeting transcript. Provide a concise summary and a list of actionable items. Return the response as a JSON object with keys 'summary' (string) and 'action_items' (array of strings).\n\nTranscript:\n" . $transcript;

            $response = \OpenAI\Laravel\Facades\OpenAI::chat()->create([
                'model' => 'gpt-4o-mini',
                'messages' => [
                    ['role' => 'system', 'content' => 'You exist to summarize meetings and extract action items. Always return valid JSON.'],
                    ['role' => 'user', 'content' => $prompt],
                ],
                'response_format' => ['type' => 'json_object'],
                'max_tokens' => 1000,
            ]);

            $content = $response->choices[0]->message->content;
            $result = json_decode($content, true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                \Illuminate\Support\Facades\Log::error("Invalid JSON from OpenAI: " . $content);
                return [
                    'summary' => 'Summary could not be generated due to a formatting error.',
                    'action_items' => []
                ];
            }

            return $result;
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error("OpenAI summarization failed: " . $e->getMessage());
            return [
                'summary' => 'Summary could not be generated due to an API error.',
                'action_items' => []
            ];
        }
    }
}
