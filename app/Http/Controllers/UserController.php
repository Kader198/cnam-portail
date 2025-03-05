<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $query = User::with(['roles', 'auditLogs']);

        // Search functionality
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        // Filter by role
        if ($request->filled('role') && $request->role !== 'all') {
            $query->whereHas('roles', function($q) use ($request) {
                $q->where('role_name', $request->role);
            });
        }

        // Filter by status
        if ($request->filled('status') && $request->status !== 'all') {
            if ($request->status === 'verified') {
                $query->whereNotNull('email_verified_at');
            } else {
                $query->whereNull('email_verified_at');
            }
        }

        $users = $query->latest()->paginate(10);

        return Inertia::render('users/users-list', [
            'users' => $users
        ]);
    }

    public function create()
    {
        $roles = Role::all();
        
        return Inertia::render('users/users-create', [
            'roles' => $roles
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', Password::defaults()],
            'roles' => 'required',
        ]);

        $role = explode(',', $validated['roles']);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        $user->roles()->attach($role);

        return redirect()->route('users.index')
            ->with('message', 'User created successfully');
    }

    public function edit(User $user)
    {
        $user->load('roles');
        $roles = Role::all();
        
        return Inertia::render('users/users-edit', [
            'user' => $user,
            'roles' => $roles
        ]);
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => ['nullable', Password::defaults()],
            'roles' => 'required|array',
            'roles.*' => 'exists:roles,role_id'
        ]);

        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
        ]);

        if (isset($validated['password'])) {
            $user->update([
                'password' => Hash::make($validated['password'])
            ]);
        }

        $user->roles()->sync($validated['roles']);

        return redirect()->route('users.index')
            ->with('message', 'User updated successfully');
    }

    public function destroy(User $user)
    {
        if ($user->id === auth()->id()) {
            return back()->with('error', 'You cannot delete your own account.');
        }

        $user->roles()->detach();
        $user->delete();

        return redirect()->route('users.index')
            ->with('message', 'User deleted successfully');
    }
} 