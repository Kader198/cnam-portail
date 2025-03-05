<?php

namespace App\Http\Controllers;

use App\Models\Glossary;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class GlossaryController extends Controller
{
    public function index(Request $request)
    {
        $query = Glossary::query();

        // Search by term or definition
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('term', 'like', "%{$search}%")
                  ->orWhere('term_ar', 'like', "%{$search}%")
                  ->orWhere('definition', 'like', "%{$search}%")
                  ->orWhere('definition_ar', 'like', "%{$search}%");
            });
        }

        // Filter by first letter
        if ($request->filled('first_letter')) {
            $query->where('first_letter', $request->first_letter);
        }

        // Filter by Arabic first letter
        if ($request->filled('first_letter_ar')) {
            $query->where('first_letter_ar', $request->first_letter_ar);
        }

        $glossary = $query->orderBy('display_order')->paginate(10);

        return Inertia::render('glossary/glossary-list', [
            'glossary' => $glossary
        ]);
    }

    public function create()
    {
        return Inertia::render('glossary/glossary-create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'term' => 'required|string|max:100',
            'term_ar' => 'required|string|max:100',
            'definition' => 'required|string',
            'definition_ar' => 'required|string',
            'display_order' => 'required|integer|min:0'
        ]);

        // Generate first letters
        $validated['first_letter'] = Str::upper(Str::substr($validated['term'], 0, 1));
        $validated['first_letter_ar'] = Str::substr($validated['term_ar'], 0, 1);

        Glossary::create($validated);

        return redirect()->route('glossary.index')
            ->with('message', 'Glossary term created successfully');
    }

    public function edit(Glossary $glossary)
    {
        return Inertia::render('glossary/glossary-edit', [
            'glossary' => $glossary
        ]);
    }

    public function update(Request $request, Glossary $glossary)
    {
        $validated = $request->validate([
            'term' => 'required|string|max:100',
            'term_ar' => 'required|string|max:100',
            'definition' => 'required|string',
            'definition_ar' => 'required|string',
            'display_order' => 'required|integer|min:0'
        ]);

        // Update first letters
        $validated['first_letter'] = Str::upper(Str::substr($validated['term'], 0, 1));
        $validated['first_letter_ar'] = Str::substr($validated['term_ar'], 0, 1);

        $glossary->update($validated);

        return redirect()->route('glossary.index')
            ->with('message', 'Glossary term updated successfully');
    }

    public function destroy(Glossary $glossary)
    {
        $glossary->delete();

        return redirect()->route('glossary.index')
            ->with('message', 'Glossary term deleted successfully');
    }
} 