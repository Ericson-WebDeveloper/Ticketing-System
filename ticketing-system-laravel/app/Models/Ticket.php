<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;

    protected $guarded = [];
    protected $with = ['creator', 'progress'];
    public $preserveKeys = true;

    public function creator()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function programmer()
    {
        return $this->belongsTo(User::class, 'programmer_id', 'id');
    }

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id', 'id');
    }

    public function qa()
    {
        return $this->belongsTo(User::class, 'qa_id', 'id');
    }
    
    public function progress()
    {
        return $this->hasOne(TicketProgress::class, 'ticket_id', 'id');
    }
}
