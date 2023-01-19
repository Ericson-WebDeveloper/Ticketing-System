<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TicketProgress extends Model
{
    use HasFactory;
    protected $guarded = [];

    protected $with = ['status', 'env', 'type'];

    public function ticket()
    {
        return $this->belongsTo(Ticket::class, 'ticket_id', 'id');
    }

    public function status()
    {
        return $this->hasOne(TicketStatus::class,  'id', 'status_id');
    }

    public function env()
    {
        return $this->hasOne(TicketEnvironment::class, 'id', 'environment_id');
    }

    public function type()
    {
        return $this->hasOne(TicketType::class, 'id', 'type_id');
    }

}
