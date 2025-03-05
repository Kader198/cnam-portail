<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Content;
use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Get statistics for the dashboard
        $stats = [
            'total_users' => User::count(),
            'total_content' => Content::count(),
            'total_roles' => Role::count(),
            'recent_users' => User::latest()->take(5)->get(),
            'recent_content' => Content::latest()->take(5)->get(),
        ];

        return Inertia::render('dashboard', [
            'stats' => $stats
        ]);
    }
} 