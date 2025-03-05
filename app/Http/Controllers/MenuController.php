<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MenuController extends Controller
{
    public function index(Request $request)
    {
        $query = Menu::withCount('items');

        // Search by menu name or location
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('menu_name', 'like', "%{$search}%")
                  ->orWhere('menu_name_ar', 'like', "%{$search}%")
                  ->orWhere('location', 'like', "%{$search}%");
            });
        }

        // Filter by active status
        if ($request->filled('is_active') && $request->is_active !== 'all') {
            $query->where('is_active', $request->is_active === 'true');
        }

        $menus = $query->latest()->paginate(10);

        return Inertia::render('menu/menu-list', [
            'menus' => $menus
        ]);
    }

    public function create()
    {
        return Inertia::render('menu/menu-create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'menu_name' => 'required|string|max:100',
            'menu_name_ar' => 'required|string|max:100',
            'location' => 'required|string|max:100',
            'is_active' => 'boolean'
        ]);

        Menu::create($validated);

        return redirect()->route('menus.index')
            ->with('message', 'Menu created successfully');
    }

    public function edit(Menu $menu)
    {
            return Inertia::render('menu/menu-edit', [
            'menu' => $menu
        ]);
    }

    public function update(Request $request, Menu $menu)
    {
        $validated = $request->validate([
            'menu_name' => 'required|string|max:100',
            'menu_name_ar' => 'required|string|max:100',
            'location' => 'required|string|max:100',
            'is_active' => 'boolean'
        ]);

        $menu->update($validated);

        return redirect()->route('menus.index')
            ->with('message', 'Menu updated successfully');
    }

    public function destroy(Menu $menu)
    {
        if ($menu->items()->exists()) {
            return back()->with('error', 'Cannot delete menu with assigned items.');
        }

        $menu->delete();

        return redirect()->route('menus.index')
            ->with('message', 'Menu deleted successfully');
    }
} 