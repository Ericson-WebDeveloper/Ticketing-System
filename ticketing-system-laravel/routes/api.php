<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Helper\IndexController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->get('/backend/ticketing-system/authenticate-user', function (Request $request) {
    try {
        return $request->user() ? 
        response()->json(['auth' => true, 'user' => $request->user()], 200) : 
        response()->json(['auth' => false], 400);
    } catch (\Exception $e) {
        response()->json(['auth' => false], 500);
    }
});

Route::middleware('auth:sanctum')->post('/user/sign-out', [AuthController::class, 'logout']);


Route::group(['prefix' => 'backend', 'middleware'=> 'auth:sanctum'], function() {
    
    Route::middleware(['role:User|Super Admin|Admin', 'job:Q.A|Super Admin|Admin|Project Manager'])->group(function () {
        // admin All tickets page - all_tickets.php
        //  QA
        Route::get('/ticketing-system/open-tickets/all', [TicketController::class, 'openTicketsAssign']);
        // Route::get('/ticketing-system/user-tickets/all', [TicketController::class, 'openTickets']);
        Route::get('/ticketing-system/user-tickets/all', [UserController::class, 'getTicketsByUser']);
        Route::get('/ticketing-system/user-tickets/filter/{key}', [TicketController::class, 'filterTickets']);
        // Route::get('/ticketing-system/get-ticket/{id}', [TicketController::class, 'getTicket']);


        // admin/superadmin/qa - page open_tickets.php -middleware-admin/superadmin/qa
        Route::post('/ticketing-system/add-new/ticket', [TicketController::class, 'newTicket']);
        Route::put('/ticketing-system/edit/open-ticket/{id}', [TicketController::class, 'updateTicket']);
        Route::put('/ticketing-system/assign/open-ticket/{id}', [TicketController::class, 'assignTicket']);
    });


    Route::get('/ticketing-system/get-ticket/{id}', [TicketController::class, 'getTicket']);
    

    // essentials api route
    Route::get('/ticketing-system/count-ticket/status', [TicketController::class, 'countTicketsByStatus']);
    Route::get('/ticketing-system/roles', [IndexController::class, 'roles']);
    Route::get('/ticketing-system/ticket/status', [IndexController::class, 'status']);
    Route::get('/ticketing-system/ticket/envs', [IndexController::class, 'envs']);
    Route::get('/ticketing-system/ticket/type', [IndexController::class, 'type']);
    Route::get('/ticketing-system/jobs', [IndexController::class, 'jobs']);

    Route::get('/ticketing-system/user-qa/all', [UserController::class, 'qaAll']);
    Route::get('/ticketing-system/user-programmer/all', [UserController::class, 'programmerAll']);

    Route::get('/ticketing-system/user/all', [UserController::class, 'userAll']);
    // with page
    Route::get('/ticketing-system/users/all', [IndexController::class, 'users']);


    Route::get('/ticketing-system/user-get/{email}', [UserController::class, 'showUser']);
    Route::get('/ticketing-system/user-view/ticket/{userid}', [UserController::class, 'showUsersTicket']);

    // admin/superadmin page view user with tickets users-tickets.php?USER_ID=81&EMAIL=wetuqunuha@philpacs.com
    // team manager / team leader roles
    Route::get('/ticketing-system/user-with-ticket/{email}', [UserController::class, 'userTickets']);

    // dashboard all user depend on role
    Route::get('/ticketing-system/tickets/dashboard-all', [UserController::class, 'dashTickets']);

    Route::middleware(['role:Admin|Super Admin'])->group(function () {
        // admin/superadmin
        Route::post('/ticketing-system/register-user', [AuthController::class, 'register']);
        // admin/superadmin - admin page users.php
        Route::post('/ticketing-system/user-create', [UserController::class, 'createNewUser']);
        Route::put('/ticketing-system/user-update/{id}', [UserController::class, 'update']);
    });
    // admin/superadmin - admin page users.php
    Route::get('/ticketing-system/{id}/user-get', [UserController::class, 'show']);

    


    // user/programmer
    Route::get('/ticketing-system/user-all-opent/tickets', [UserController::class, 'userOpenTickets']);

    // qa middlware qa
    Route::get('/ticketing-system/tickets-qa/assign', [UserController::class, 'qaAssignTicketsUser'])
    ->middleware('job:Q.A');

    // user
    Route::get('/ticketing-system/tickets-user/on-going', [UserController::class, 'ownOpenTicketsUser']);
    //  list all tickets status
    Route::get('/ticketing-system/tickets-user/list', [UserController::class, 'getTicketsAllUser']);


    // user/QA
    // back to owner / to Assign QA
    Route::middleware(['role:User', 'job:Q.A|Programmer'])->group(function () {
        Route::put('/ticketing-system/ticket/assigningQa/{id}', [TicketController::class, 'assignToQA']);
        Route::put('/ticketing-system/ticket/assigningOwner/{id}', [TicketController::class, 'backToOwner']); // middleware QA  
    });
    
    
    Route::put('/ticketing-system/ticket/update-remarks/{id}', [TicketController::class, 'updateTicketRemarks']);
    //check if closed or done this ticket
    Route::put('/ticketing-system/ticket/update/{id}', [TicketController::class, 'updateTicketDetails']);
    // ->middleware('except.job:Q.A');// ban QA 


    // profile update
    Route::post('/ticketing-system/user-profile/update', [UserController::class, 'updateProfile']);
    Route::post('/ticketing-system/user-image/update', [UserController::class, 'updateProfileImage']);





    //sending email notif 
    Route::post('/ticketing-system/send-notif/email', [TicketController::class, 'sendEmailToProgrammer']);

    // sending email for reaasign Ticket Owner
    Route::post('/ticketing-system/send-notif/ticket-reassign', [TicketController::class, 'sendReAssignTicketEmail']);
});
