<?php

namespace App\Listeners;

use App\Events\TicketAssign;
use App\Mail\TicketAssignMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class SendNotifTicketAssign
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\TicketAssign  $event
     * @return void
     */
    public function handle(TicketAssign $event)
    {
        Mail::to($event->email)->send(new TicketAssignMail($event->ticket)); 
    }
}
