<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Content;
use App\Models\Role;
use App\Models\AuditLog;
use App\Models\ContentVersion;
use App\Models\Media;
use App\Models\Category;
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
            // Content statistics
            'content_stats' => [
                'published' => Content::where('is_published', true)->count(),
                'unpublished' => Content::where('is_published', false)->count(),
                'by_type' => Content::select('content_type')
                    ->selectRaw('count(*) as count')
                    ->groupBy('content_type')
                    ->get()
            ],
            // User activity
            'user_activity' => [
                'recent_audit_logs' => AuditLog::with('user')
                    ->latest()
                    ->take(10)
                    ->get(),
                'active_users' => User::whereHas('auditLogs', function ($query) {
                    $query->where('timestamp', '>=', now()->subDays(7));
                })->count()
            ],
            // Content versions
            'recent_versions' => ContentVersion::with(['content', 'author'])
                ->latest()
                ->take(5)
                ->get(),
            // Media statistics
            'media_stats' => [
                'total_media' => Media::count(),
                'by_type' => Media::select('media_type')
                    ->selectRaw('count(*) as count')
                    ->groupBy('media_type')
                    ->get()
            ],
            // Category distribution
            'category_stats' => Category::withCount('contents')
                ->orderByDesc('contents_count')
                ->take(5)
                ->get(),
            // Role distribution
            'role_stats' => Role::withCount('users')
                ->orderByDesc('users_count')
                ->get()
        ];

        return Inertia::render('dashboard', [
            'stats' => $stats
        ]);
    }
}