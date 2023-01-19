<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class JobMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next, $jobnames)
    {
        $job = $request->user()->job->name ?? null;
        $jobs = is_array($jobnames)
        ? $jobnames
        : explode('|', $jobnames);
        // Log::info(array_values($jobs, $jobs));
        if(!in_array($job, $jobs)) {
            return response()->json([
                'message' => 'User does not have a right credentials',
                'error' => 'User does not have a right credentials'
            ], 403);
        } else {
           return $next($request); 
        }
    }
}
