<?php

use App\Http\Controllers\GlossaryController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ContentController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\DirectoryController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\MenuItemController;
use App\Http\Controllers\SeoAnalyticController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\WelcomeController;

Route::get('/', [WelcomeController::class, 'index'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Content Management Routes
    Route::resource('content', ContentController::class);

    // Category Management Routes
    Route::resource('categories', CategoryController::class);

    // User Management Routes
    Route::resource('users', UserController::class);

    // Role Management Routes
    Route::resource('roles', RoleController::class);

    // News Management Routes
    Route::resource('news', NewsController::class);

    // Directory Management Routes
    Route::resource('directories', DirectoryController::class);

    // Menu Management Routes
    Route::resource('menus', MenuController::class);

    // Menu Items Management Routes
    Route::resource('menu-items', MenuItemController::class);

    // SEO Analytics Routes
    Route::resource('seo-analytics', SeoAnalyticController::class);

    // Media Management Routes
    Route::resource('media', MediaController::class);

    // Glossary Management Routes
    Route::resource('glossary', GlossaryController::class);
    
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
