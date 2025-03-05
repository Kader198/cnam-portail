<?php

namespace App\Http\Controllers;

use App\Models\Directory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DirectoryController extends Controller
{
    public function index(Request $request)
    {
        $query = Directory::with('department');

        // Search by entity name or description
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('entity_name', 'like', "%{$search}%")
                  ->orWhere('entity_name_ar', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhere('description_ar', 'like', "%{$search}%");
            });
        }

        // Filter by department
        if ($request->filled('department_id') && $request->department_id !== 'all') {
            $query->where('department_id', $request->department_id);
        }

        $directories = $query->latest()->paginate(10);

        return Inertia::render('directories/directories-list', [
            'directories' => $directories
        ]);
    }

    public function create()
    {
        return Inertia::render('directories/directories-create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'entity_name' => 'required|string|max:255',
            'entity_name_ar' => 'required|string|max:255',
            'description' => 'required|string',
            'description_ar' => 'required|string',
            'contact_person' => 'required|string|max:100',
            'contact_person_ar' => 'required|string|max:100',
            'phone' => 'required|string|max:20',
            'email' => 'required|email|max:100',
            'address' => 'required|string',
            'address_ar' => 'required|string',
            'department_id' => 'required|exists:departments,department_id',
            'website' => 'nullable|url|max:255',
            'hours' => 'required|string|max:255',
            'hours_ar' => 'required|string|max:255',
            'position' => 'required|string|max:100',
            'position_ar' => 'required|string|max:100'
        ]);

        Directory::create($validated);

        return redirect()->route('directories.index')
            ->with('message', 'Directory entry created successfully');
    }

    public function edit(Directory $directory)
    {
        return Inertia::render('directories/directories-edit', [
            'directory' => $directory
        ]);
    }

    public function update(Request $request, Directory $directory)
    {
        $validated = $request->validate([
            'entity_name' => 'required|string|max:255',
            'entity_name_ar' => 'required|string|max:255',
            'description' => 'required|string',
            'description_ar' => 'required|string',
            'contact_person' => 'required|string|max:100',
            'contact_person_ar' => 'required|string|max:100',
            'phone' => 'required|string|max:20',
            'email' => 'required|email|max:100',
            'address' => 'required|string',
            'address_ar' => 'required|string',
            'department_id' => 'required|exists:departments,department_id',
            'website' => 'nullable|url|max:255',
            'hours' => 'required|string|max:255',
            'hours_ar' => 'required|string|max:255',
            'position' => 'required|string|max:100',
            'position_ar' => 'required|string|max:100'
        ]);

        $directory->update($validated);

        return redirect()->route('directories.index')
            ->with('message', 'Directory entry updated successfully');
    }

    public function destroy(Directory $directory)
    {
        $directory->delete();

        return redirect()->route('directories.index')
            ->with('message', 'Directory entry deleted successfully');
    }
} 