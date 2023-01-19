<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Log;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'job_id'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected $with = ['roles', 'detail', 'job'];

    public function detail()
    {
        return $this->hasOne(UserDetail::class, 'user_id', 'id');
    }

    public function tickets()
    {
        return $this->hasMany(Ticket::class, 'user_id', 'id');
    }

    public function programmertickets()
    {
        return $this->hasMany(Ticket::class, 'programmer_id', 'id');
    }

    public function job()
    {
        return $this->hasOne(Job::class, 'id', 'job_id');
    }

    public function hasJob($job, $jobs)
    {
        foreach($jobs as $j) {
            if($job == $j) {
                $hasJobs = true;
            }
        }
        return $hasJobs ?? false;
    }

    public function isQA($ticket)
    {
        return $this->id == $ticket->qa_id ? true : false;
    }

    public function isOwner($ticket)
    {
        return $this->id == $ticket->owner_id ? true : false;
    }

    public function isProgrammer($ticket)
    {
        
        return $this->id == $ticket->programmer_id;
    }

}
