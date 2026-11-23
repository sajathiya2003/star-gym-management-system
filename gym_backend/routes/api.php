<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CustomerRegisterController;
use App\Http\Controllers\GymBookingController;
use App\Http\Controllers\ClassesController;
use App\Http\Controllers\ProgressController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Gym Booking Routes
Route::post('/bookings', [GymBookingController::class, 'store']);
Route::get('/bookings', [GymBookingController::class, 'index']);

// Customer Registration & Login
Route::post('/customer_register', [CustomerRegisterController::class, 'register']);
Route::post('/customer_login', [CustomerRegisterController::class, 'login']);

// Classes Routes
Route::get('/classes', [ClassesController::class, 'index']);
Route::post('/classes', [ClassesController::class, 'store']);

// Customers
Route::get('/customers', [CustomerRegisterController::class, 'getAllCustomers']); // Keep this for listing customers

// Progress Routes
Route::get('/customer-progress/{customerId}', [ProgressController::class, 'getProgress']); // get progress by customer
Route::post('/save-progress', [ProgressController::class, 'saveProgress']); // save progress
Route::delete('/delete-progress/{id}', [ProgressController::class, 'deleteProgress']); // delete progress
Route::post('/progress', [ProgressController::class, 'store']);
Route::post('/progress', [ProgressController::class, 'saveProgress']);

Route::get('/progress', [ProgressController::class, 'index']);
Route::get('/progress/{id}', [ProgressController::class, 'show']);