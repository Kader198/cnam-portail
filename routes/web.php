<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ContentController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;

Route::get('/', function () {
    return Inertia::render('welcome/welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Content Management Routes
    Route::resource('content', ContentController::class);

    // User Management Routes
    Route::resource('users', UserController::class);

    // Role Management Routes
    Route::resource('roles', RoleController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
