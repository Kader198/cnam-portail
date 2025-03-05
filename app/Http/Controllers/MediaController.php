<?php

namespace App\Http\Controllers;

use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MediaController extends Controller
{
    public function index(Request $request)
    {
        $query = Media::with('uploader');

        // Search by title or description
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('title_ar', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhere('description_ar', 'like', "%{$search}%");
            });
        }

        // Filter by media type
        if ($request->filled('media_type') && $request->media_type !== 'all') {
            $query->where('media_type', $request->media_type);
        }

        $media = $query->latest('upload_date')->paginate(10);

        return Inertia::render('media/media-list', [
            'media' => $media
        ]);
    }

    public function create()
    {
        return Inertia::render('media/media-create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'file' => 'required|file|max:10240', // 10MB max
            'media_type' => 'required|string|max:50',
            'alt_text' => 'required|string|max:255',
            'alt_text_ar' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'title_ar' => 'required|string|max:255',
            'description' => 'nullable|string',
            'description_ar' => 'nullable|string'
        ]);

        $file = $request->file('file');
        $path = $file->store('media', 'public');

        $media = Media::create([
            'file_name' => $file->getClientOriginalName(),
            'file_path' => $path,
            'media_type' => $validated['media_type'],
            'uploaded_by' => auth()->id(),
            'upload_date' => now(),
            'alt_text' => $validated['alt_text'],
            'alt_text_ar' => $validated['alt_text_ar'],
            'title' => $validated['title'],
            'title_ar' => $validated['title_ar'],
            'description' => $validated['description'],
            'description_ar' => $validated['description_ar'],
            'file_size' => $file->getSize()
        ]);

        return redirect()->route('media.index')
            ->with('message', 'Media uploaded successfully');
    }

    public function edit(Media $media)
    {
        return Inertia::render('media/media-edit', [
            'media' => $media
        ]);
    }

    public function update(Request $request, Media $media)
    {
        $validated = $request->validate([
            'alt_text' => 'required|string|max:255',
            'alt_text_ar' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'title_ar' => 'required|string|max:255',
            'description' => 'nullable|string',
            'description_ar' => 'nullable|string'
        ]);

        $media->update($validated);

        return redirect()->route('media.index')
            ->with('message', 'Media updated successfully');
    }

    public function destroy(Media $media)
    {
        // Delete the file from storage
        Storage::disk('public')->delete($media->file_path);

        // Delete the database record
        $media->delete();

        return redirect()->route('media.index')
            ->with('message', 'Media deleted successfully');
    }
} 