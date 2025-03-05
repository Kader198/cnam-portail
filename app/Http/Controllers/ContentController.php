<?php

namespace App\Http\Controllers;

use App\Models\Content;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ContentController extends Controller
{
    public function index(Request $request)
    {
        $query = Content::with(['author', 'categories', 'media']);

        // Search functionality
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('title_ar', 'like', "%{$search}%")
                  ->orWhere('content_body', 'like', "%{$search}%")
                  ->orWhere('content_body_ar', 'like', "%{$search}%");
            });
        }

        // Filter by type
        if ($request->filled('type') && $request->type !== 'all') {
            $query->where('content_type', $request->type);
        }

        // Filter by status
        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('is_published', $request->status === 'published');
        }

        $contents = $query->latest()->paginate(10);

        return Inertia::render('content/content-list', [
            'contents' => $contents
        ]);
    }

    public function create()
    {
        return Inertia::render('content/content-create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'title_ar' => 'required|string|max:255',
            'content_body' => 'required|string',
            'content_body_ar' => 'required|string',
            'content_type' => 'required|string',
            'is_published' => 'boolean',
            'meta_description' => 'nullable|string',
            'meta_description_ar' => 'nullable|string',
            'keywords' => 'nullable|string',
            'keywords_ar' => 'nullable|string',
            'featured_image' => 'nullable|string',
        ]);

        $validated['slug'] = Str::slug($validated['title']);
        $validated['slug_ar'] = Str::slug($validated['title_ar']);
        $validated['author_id'] = auth()->id();

        $content = Content::create($validated);

        return redirect()->route('content.index')
            ->with('message', 'Content created successfully');
    }

    public function edit(Content $content)
    {
        return Inertia::render('content/content-edit', [
            'content' => $content->load(['author', 'categories', 'media'])
        ]);
    }

    public function update(Request $request, Content $content)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'title_ar' => 'required|string|max:255',
            'content_body' => 'required|string',
            'content_body_ar' => 'required|string',
            'content_type' => 'required|string',
            'is_published' => 'boolean',
            'meta_description' => 'nullable|string',
            'meta_description_ar' => 'nullable|string',
            'keywords' => 'nullable|string',
            'keywords_ar' => 'nullable|string',
            'featured_image' => 'nullable|string',
        ]);

        $validated['slug'] = Str::slug($validated['title']);
        $validated['slug_ar'] = Str::slug($validated['title_ar']);

        $content->update($validated);

        return redirect()->route('content.index')
            ->with('message', 'Content updated successfully');
    }

    public function destroy(Content $content)
    {
        $content->delete();

        return redirect()->route('content.index')
            ->with('message', 'Content deleted successfully');
    }
} 