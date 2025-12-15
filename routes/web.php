<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('LandingPage', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('/debug-auth/{id?}', function ($id = null) {
    return [
        'user_id' => auth()->id(),
        'session_id' => session()->getId(),
        'ip' => request()->ip(),
        'app_url' => config('app.url'),
        'meeting_status' => $id ? \App\Models\Meeting::find($id)?->status : 'no_id',
        'meeting_user_id' => $id ? \App\Models\Meeting::find($id)?->user_id : 'no_id',
    ];
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [App\Http\Controllers\MeetingController::class, 'index'])->name('dashboard');

    Route::get('team', [App\Http\Controllers\MeetingController::class, 'team'])->name('team');

    Route::get('notes', [App\Http\Controllers\MeetingController::class, 'notes'])->name('notes');
    
    Route::get('pricing', function () {
        return Inertia::render('Pricing');
    })->name('pricing');
    Route::resource('meetings', App\Http\Controllers\MeetingController::class)->except(['index', 'create', 'edit']);
});

require __DIR__.'/settings.php';
