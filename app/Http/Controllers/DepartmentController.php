<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DepartmentController extends Controller
{
    public function index(Request $request)
    {
        $query = Department::withCount('directories');

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

        $departments = $query->latest()->paginate(10);

        return Inertia::render('departments/departments-list', [
            'departments' => $departments
        ]);
    }

    public function create()
    {
        return Inertia::render('departments/departments-create', [
            'departments' => Department::select('department_id', 'name', 'name_ar')->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'name_ar' => 'required|string|max:100',
            'description' => 'required|string',
            'description_ar' => 'required|string',
            'parent_department_id' => 'nullable|exists:departments,department_id'
        ]);

        Department::create($validated);

        return redirect()->route('departments.index')
            ->with('message', 'Department created successfully');
    }

    public function edit(Department $department)
    {
        return Inertia::render('departments/departments-edit', [
            'department' => $department,
            'departments' => Department::where('department_id', '!=', $department->department_id)
                ->select('department_id', 'name', 'name_ar')
                ->get()
        ]);
    }

    public function update(Request $request, Department $department)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'name_ar' => 'required|string|max:100',
            'description' => 'required|string',
            'description_ar' => 'required|string',
            'parent_department_id' => 'nullable|exists:departments,department_id'
        ]);

        $department->update($validated);

        return redirect()->route('departments.index')
            ->with('message', 'Department updated successfully');
    }

    public function destroy(Department $department)
    {
        if ($department->directories()->exists()) {
            return back()->with('error', 'Cannot delete department with associated directories.');
        }

        if ($department->children()->exists()) {
            return back()->with('error', 'Cannot delete department with child departments.');
        }

        $department->delete();

        return redirect()->route('departments.index')
            ->with('message', 'Department deleted successfully');
    }
} 