<?php

namespace App\Http\Controllers;

use App\Models\Faq;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FaqController extends Controller
{
    public function index(Request $request)
    {
        $query = Faq::with('category');

        // Search by question or answer
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('question', 'like', "%{$search}%")
                  ->orWhere('question_ar', 'like', "%{$search}%")
                  ->orWhere('answer', 'like', "%{$search}%")
                  ->orWhere('answer_ar', 'like', "%{$search}%");
            });
        }

        // Filter by category
        if ($request->filled('category_id') && $request->category_id !== 'all') {
            $query->where('category_id', $request->category_id);
        }

        // Filter by publication status
        if ($request->filled('is_published') && $request->is_published !== 'all') {
            $query->where('is_published', $request->is_published === 'true');
        }

        $faqs = $query->orderBy('display_order')->paginate(10);

        return Inertia::render('faqs/faqs-list', [
            'faqs' => $faqs
        ]);
    }

    public function create()
    {
        return Inertia::render('faqs/faqs-create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'question' => 'required|string',
            'question_ar' => 'required|string',
            'answer' => 'required|string',
            'answer_ar' => 'required|string',
            'category_id' => 'required|exists:categories,category_id',
            'display_order' => 'required|integer|min:0',
            'is_published' => 'boolean'
        ]);

        Faq::create($validated);

        return redirect()->route('faqs.index')
            ->with('message', 'FAQ created successfully');
    }

    public function edit(Faq $faq)
    {
        return Inertia::render('faqs/faqs-edit', [
            'faq' => $faq
        ]);
    }

    public function update(Request $request, Faq $faq)
    {
        $validated = $request->validate([
            'question' => 'required|string',
            'question_ar' => 'required|string',
            'answer' => 'required|string',
            'answer_ar' => 'required|string',
            'category_id' => 'required|exists:categories,category_id',
            'display_order' => 'required|integer|min:0',
            'is_published' => 'boolean'
        ]);

        $faq->update($validated);

        return redirect()->route('faqs.index')
            ->with('message', 'FAQ updated successfully');
    }

    public function destroy(Faq $faq)
    {
        $faq->delete();

        return redirect()->route('faqs.index')
            ->with('message', 'FAQ deleted successfully');
    }
} 