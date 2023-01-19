<?php

namespace App\Providers;

use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;
use App\Events\LoginHistory;
use App\Events\TicketAssign;
use App\Events\ReAssignTicket;
use App\Listeners\SendNotificReAssignTicket;
use App\Listeners\storeUserLoginHistory;
use App\Listeners\SendNotifTicketAssign;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        LoginHistory::class => [
            StoreUserLoginHistory::class,
        ],
        TicketAssign::class => [
            SendNotifTicketAssign::class,
        ],
        ReAssignTicket::class => [
            SendNotificReAssignTicket::class,
        ]
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
