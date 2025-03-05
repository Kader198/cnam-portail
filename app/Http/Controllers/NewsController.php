<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class NewsController extends Controller
{
    public function index(Request $request)
    {
        $query = News::query();

        // Search by title or content
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('title_ar', 'like', "%{$search}%")
                  ->orWhere('content_body', 'like', "%{$search}%")
                  ->orWhere('content_body_ar', 'like', "%{$search}%");
            });
        }

        // Filter by news type
        if ($request->filled('news_type') && $request->news_type !== 'all') {
            $query->where('news_type', $request->news_type);
        }

        // Filter by featured status
        if ($request->filled('featured') && $request->featured !== 'all') {
            $query->where('featured', $request->featured === 'true');
        }

        // Filter by publication status
        if ($request->filled('is_published') && $request->is_published !== 'all') {
            $query->where('is_published', $request->is_published === 'true');
        }

        $news = $query->latest()->paginate(10);

        return Inertia::render('news/news-list', [
            'news' => $news
        ]);
    }

    public function create()
    {
        return Inertia::render('news/news-create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'title_ar' => 'required|string|max:255',
            'content_body' => 'required|string',
            'content_body_ar' => 'required|string',
            'is_published' => 'boolean',
            'publication_date' => 'required|date',
            'news_type' => 'required|string|max:50',
            'featured' => 'boolean',
            'meta_description' => 'nullable|string',
            'meta_description_ar' => 'nullable|string',
            'keywords' => 'nullable|string',
            'keywords_ar' => 'nullable|string',
            'featured_image' => 'nullable|file|max:10240', // 10MB max
            'language_code' => 'required|string|max:10'
        ]);

        // Generate slugs
        $validated['slug'] = Str::slug($validated['title']);
        $validated['slug_ar'] = Str::slug($validated['title_ar']);
        $validated['author_id'] = auth()->id();

        // Handle featured image upload
        if ($request->hasFile('featured_image')) {
            $file = $request->file('featured_image');
            $path = $file->store('media', 'public');

            // Create media record
            $media = Media::create([
                'file_name' => $file->getClientOriginalName(),
                'file_path' => $path,
                'media_type' => 'image',
                'uploaded_by' => auth()->id(),
                'upload_date' => now(),
                'alt_text' => $validated['title'],
                'alt_text_ar' => $validated['title_ar'],
                'title' => $validated['title'],
                'title_ar' => $validated['title_ar'],
                'description' => $validated['meta_description'],
                'description_ar' => $validated['meta_description_ar'],
                'file_size' => $file->getSize()
            ]);

            // Create news record
            $news = News::create($validated);

            // Link news with media
            $news->media()->attach($media->media_id);

            return redirect()->route('news.index')
                ->with('message', 'News created successfully');
        }

        // Create news record without image
        News::create($validated);

        return redirect()->route('news.index')
            ->with('message', 'News created successfully');
    }

    public function edit(News $news)
    {
        return Inertia::render('news/news-edit', [
            'news' => $news
        ]);
    }

    public function update(Request $request, News $news)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'title_ar' => 'required|string|max:255',
            'content_body' => 'required|string',
            'content_body_ar' => 'required|string',
            'is_published' => 'boolean',
            'publication_date' => 'required|date',
            'news_type' => 'required|string|max:50',
            'featured' => 'boolean',
            'meta_description' => 'nullable|string',
            'meta_description_ar' => 'nullable|string',
            'keywords' => 'nullable|string',
            'keywords_ar' => 'nullable|string',
            'featured_image' => 'nullable|file|max:10240', // 10MB max
            'language_code' => 'required|string|max:10'
        ]);

        // Generate slugs
        $validated['slug'] = Str::slug($validated['title']);
        $validated['slug_ar'] = Str::slug($validated['title_ar']);

        // Handle featured image upload
        if ($request->hasFile('featured_image')) {
            // Delete old media if exists
            if ($news->media()->exists()) {
                $oldMedia = $news->media()->first();
                Storage::disk('public')->delete($oldMedia->file_path);
                $news->media()->detach();
                $oldMedia->delete();
            }

            $file = $request->file('featured_image');
            $path = $file->store('media', 'public');

            // Create new media record
            $media = Media::create([
                'file_name' => $file->getClientOriginalName(),
                'file_path' => $path,
                'media_type' => 'image',
                'uploaded_by' => auth()->id(),
                'upload_date' => now(),
                'alt_text' => $validated['title'],
                'alt_text_ar' => $validated['title_ar'],
                'title' => $validated['title'],
                'title_ar' => $validated['title_ar'],
                'description' => $validated['meta_description'],
                'description_ar' => $validated['meta_description_ar'],
                'file_size' => $file->getSize()
            ]);

            // Update news record
            $news->update($validated);

            // Link news with new media
            $news->media()->attach($media->media_id);

            return redirect()->route('news.index')
                ->with('message', 'News updated successfully');
        }

        // Update news record without image
        $news->update($validated);

        return redirect()->route('news.index')
            ->with('message', 'News updated successfully');
    }

    public function destroy(News $news)
    {
        $news->delete();

        return redirect()->route('news.index')
            ->with('message', 'News deleted successfully');
    }
} 