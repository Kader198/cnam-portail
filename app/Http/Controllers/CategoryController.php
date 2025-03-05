<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $query = Category::withCount('contents');

        // Search by name or description
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('name_ar', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhere('description_ar', 'like', "%{$search}%");
            });
        }

        $categories = $query->latest()->paginate(10);

        return Inertia::render('category/category-list', [
            'categories' => $categories
        ]);
    }

    public function create()
    {
        return Inertia::render('category/category-create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'name_ar' => 'required|string|max:255',
            'description' => 'required|string',
            'description_ar' => 'required|string'
        ]);

        // Generate slugs
        $validated['slug'] = Str::slug($validated['name']);
        $validated['slug_ar'] = Str::slug($validated['name_ar']);

        Category::create($validated);

        return redirect()->route('categories.index')
            ->with('message', 'Category created successfully');
    }

    public function edit(Category $category)
    {
        return Inertia::render('category/category-edit', [
            'category' => $category
        ]);
    }

    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'name_ar' => 'required|string|max:255',
            'description' => 'required|string',
            'description_ar' => 'required|string'
        ]);

        // Generate slugs
        $validated['slug'] = Str::slug($validated['name']);
        $validated['slug_ar'] = Str::slug($validated['name_ar']);

        $category->update($validated);

        return redirect()->route('categories.index')
            ->with('message', 'Category updated successfully');
    }

    public function destroy(Category $category)
    {
        if ($category->contents()->exists()) {
            return back()->with('error', 'Cannot delete category with associated contents.');
        }

        $category->delete();

        return redirect()->route('categories.index')
            ->with('message', 'Category deleted successfully');
    }
} 