<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoleController extends Controller
{
    public function index(Request $request)
    {
        $query = Role::withCount('users');

        // Search by role name or description
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('role_name', 'like', "%{$search}%")
                  ->orWhere('role_name_ar', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhere('description_ar', 'like', "%{$search}%");
            });
        }

        // Filter by permission level
        if ($request->filled('level') && $request->level !== 'all') {
            $query->where('permission_level', $request->level);
        }

        $roles = $query->latest()->paginate(10);

        return Inertia::render('roles/roles-list', [
            'roles' => $roles
        ]);
    }

    public function create()
    {
        return Inertia::render('roles/roles-create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'role_name' => 'required|string|max:255|unique:roles',
            'role_name_ar' => 'required|string|max:255',
            'description' => 'required|string',
            'description_ar' => 'required|string',
            'permission_level' => 'required|integer|min:1|max:10'
        ]);

        Role::create($validated);

        return redirect()->route('roles.index')
            ->with('message', 'Role created successfully');
    }

    public function edit(Role $role)
    {
        return Inertia::render('roles/roles-edit', [
            'role' => $role
        ]);
    }

    public function update(Request $request, Role $role)
    {
        $validated = $request->validate([
            'role_name' => 'required|string|max:255|unique:roles,role_name,' . $role->role_id . ',role_id',
            'role_name_ar' => 'required|string|max:255',
            'description' => 'required|string',
            'description_ar' => 'required|string',
            'permission_level' => 'required|integer|min:1|max:10'
        ]);

        $role->update($validated);

        return redirect()->route('roles.index')
            ->with('message', 'Role updated successfully');
    }

    public function destroy(Role $role)
    {
        if ($role->users()->exists()) {
            return back()->with('error', 'Cannot delete role with assigned users.');
        }

        $role->delete();

        return redirect()->route('roles.index')
            ->with('message', 'Role deleted successfully');
    }
} 