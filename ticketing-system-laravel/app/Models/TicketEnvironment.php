<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TicketEnvironment extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function ticketprogress()
    {
        return $this->belongsTo(TicketProgress::class,  'environment_id', 'id');
    }
}
