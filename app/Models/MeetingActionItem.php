<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MeetingActionItem extends Model
{
    protected $fillable = [
        'meeting_id',
        'content',
    ];

    public function meeting()
    {
        return $this->belongsTo(Meeting::class);
    }
}
