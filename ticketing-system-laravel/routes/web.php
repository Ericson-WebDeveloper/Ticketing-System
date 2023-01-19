<?php

use App\Http\Controllers\Auth\AuthController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return 'Sorry Cannot Found!!!!..';
});
Route::post('/ticketing-system/login', [AuthController::class, 'login']);
Route::post('/ticketing-system/forgot-password', [AuthController::class, 'forgotpassword']);
Route::post('/ticketing-system/check-validate', [AuthController::class, 'checkingExpiration']);
Route::put('/ticketing-system/update-password/{email}', [AuthController::class, 'updatePass']);