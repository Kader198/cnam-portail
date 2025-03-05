<?php

namespace App\Http\Controllers;

use App\Models\SeoAnalytic;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SeoAnalyticController extends Controller
{
    public function index(Request $request)
    {
        $query = SeoAnalytic::query();

        // Search by page URL
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where('page_url', 'like', "%{$search}%");
        }

        // Filter by date range
        if ($request->filled('start_date')) {
            $query->where('record_date', '>=', $request->start_date);
        }
        if ($request->filled('end_date')) {
            $query->where('record_date', '<=', $request->end_date);
        }

        $analytics = $query->latest('record_date')->paginate(10);

        return Inertia::render('seo-analytics/seo-analytics-list', [
            'analytics' => $analytics
        ]);
    }

    public function create()
    {
        return Inertia::render('seo-analytics/seo-analytics-create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'page_url' => 'required|string|max:255',
            'visitors' => 'required|integer|min:0',
            'unique_visitors' => 'required|integer|min:0',
            'bounce_rate' => 'required|numeric|min:0|max:100',
            'avg_time_on_page' => 'required|integer|min:0',
            'record_date' => 'required|date'
        ]);

        SeoAnalytic::create($validated);

        return redirect()->route('seo-analytics.index')
            ->with('message', 'SEO analytics record created successfully');
    }

    public function edit(SeoAnalytic $seoAnalytic)
    {
        return Inertia::render('seo-analytics/seo-analytics-edit', [
            'analytic' => $seoAnalytic
        ]);
    }

    public function update(Request $request, SeoAnalytic $seoAnalytic)
    {
        $validated = $request->validate([
            'page_url' => 'required|string|max:255',
            'visitors' => 'required|integer|min:0',
            'unique_visitors' => 'required|integer|min:0',
            'bounce_rate' => 'required|numeric|min:0|max:100',
            'avg_time_on_page' => 'required|integer|min:0',
            'record_date' => 'required|date'
        ]);

        $seoAnalytic->update($validated);

        return redirect()->route('seo-analytics.index')
            ->with('message', 'SEO analytics record updated successfully');
    }

    public function destroy(SeoAnalytic $seoAnalytic)
    {
        $seoAnalytic->delete();

        return redirect()->route('seo-analytics.index')
            ->with('message', 'SEO analytics record deleted successfully');
    }
} 