<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MeetingController extends Controller
{
    public function index()
    {
        // Get processing meetings first (up to 3)
        $processingMeetings = \App\Models\Meeting::where('user_id', request()->user()->id)
            ->where('status', 'processing')
            ->orderBy('created_at', 'desc')
            ->limit(3)
            ->get();

        // If we have less than 3 processing meetings, fill with completed ones
        if ($processingMeetings->count() < 3) {
            $needed = 3 - $processingMeetings->count();
            $completedMeetings = \App\Models\Meeting::where('user_id', request()->user()->id)
                ->where('status', 'completed')
                ->whereNotIn('id', $processingMeetings->pluck('id'))
                ->orderBy('created_at', 'desc')
                ->limit($needed)
                ->get();

            $processingMeetings = $processingMeetings->merge($completedMeetings);
        }

        return \Inertia\Inertia::render('Dashboard', [
            'meetingList' => $processingMeetings,
        ]);
    }

    public function notes()
    {
        return \Inertia\Inertia::render('AllNotes', [
            'meetingList' => \App\Models\Meeting::where('user_id', request()->user()->id)
                ->orderBy('created_at', 'desc')
                ->get(),
        ]);
    }

    public function team()
    {
        return \Inertia\Inertia::render('Team/Index', [
            'team' => \App\Models\User::all(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'audio' => 'required|file|mimes:mp3,wav,m4a|max:25600', // 25MB limit
        ]);

        $file = $request->file('audio');
        
        // Generate a secure filename with the correct extension
        $extension = $file->getClientOriginalExtension();
        $filename = \Illuminate\Support\Str::uuid() . '.' . $extension;
        
        // Store explicitly with the filename
        $path = $file->storeAs('meetings', $filename, 'r2');

        $meeting = \App\Models\Meeting::create([
            'user_id' => $request->user()->id,
            'title' => $file->getClientOriginalName(),
            'audio_path' => $path,
            'status' => 'processing',
        ]);

        \App\Jobs\ProcessMeeting::dispatch($meeting);

        return redirect("/meetings/{$meeting->id}")->with('success', 'Meeting uploaded and processing started.');
    }

    public function show(string $id)
    {
        \Illuminate\Support\Facades\Log::info("MeetingController@show hit for ID: {$id}. User: " . (request()->user() ? request()->user()->id : 'guest'));

        $meeting = \App\Models\Meeting::with('actionItems')
            ->where('user_id', request()->user()->id)
            ->findOrFail($id);

        $audioUrl = null;
        if ($meeting->audio_path) {
            try {
                $disk = \Illuminate\Support\Facades\Storage::disk('r2');
                if ($disk->exists($meeting->audio_path)) {
                    // For R2, we might need to use a different approach for temporary URLs
                    // For now, skip temporary URL generation
                    $audioUrl = null; // Will handle in frontend differently
                }
            } catch (\Exception $e) {
                // Fallback or log if R2 fails
                \Illuminate\Support\Facades\Log::warning("Failed to access audio file: " . $e->getMessage());
            }
        }

        return \Inertia\Inertia::render('Meeting/Show', [
            'meeting' => $meeting,
            'audio_url' => $audioUrl,
        ]);
    }

    public function destroy(string $id)
    {
        $meeting = \App\Models\Meeting::where('user_id', request()->user()->id)->findOrFail($id);

        if ($meeting->audio_path) {
            \Illuminate\Support\Facades\Storage::disk('r2')->delete($meeting->audio_path);
        }

        $meeting->delete();

        return redirect()->route('dashboard');
    }
}
