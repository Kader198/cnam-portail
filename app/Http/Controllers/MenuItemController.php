<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use App\Models\MenuItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MenuItemController extends Controller
{
    public function index(Request $request)
    {
        $query = MenuItem::with(['menu', 'parent'])
            ->orderBy('display_order');

        // Filter by menu if menu_id is provided
        if ($request->filled('menu_id')) {
            $query->where('menu_id', $request->menu_id);
        }

        $menuItems = $query->paginate(10);


        return Inertia::render('menu/menu-items-list', [
            'menuItems' => $menuItems,
            'selectedMenuId' => $request->menu_id,
        ]);
    }

    public function create()
    {
        $menus = Menu::all();
        $parentItems = MenuItem::all();

        return Inertia::render('menu/menu-item-form', [
            'menus' => $menus,
            'parentItems' => $parentItems,
            'mode' => 'create',
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'menu_id' => 'required|exists:menus,menu_id',
            'item_title' => 'required|string|max:255',
            'item_title_ar' => 'required|string|max:255',
            'url' => 'required|string|max:255',
            'parent_item_id' => 'nullable|exists:menu_items,item_id',
            'display_order' => 'required|integer|min:0',
            'target' => 'required|in:_self,_blank',
            'icon' => 'nullable|string|max:255',
            'css_class' => 'nullable|string|max:255',
        ]);

        MenuItem::create($validated);

        return redirect()->route('menu-items.index')
            ->with('success', 'Menu item created successfully.');
    }

    public function edit(MenuItem $menu_item)
    {
        $menus = Menu::all();
        $parentItems = MenuItem::where('item_id', '!=', $menu_item->item_id)->get();

        return Inertia::render('menu/menu-item-form', [
            'menuItem' => $menu_item,
            'menus' => $menus,
            'parentItems' => $parentItems,
            'mode' => 'edit',
        ]);
    }

    public function update(Request $request, MenuItem $menu_item)
    {
        $validated = $request->validate([
            'menu_id' => 'required|exists:menus,menu_id',
            'item_title' => 'required|string|max:255',
            'item_title_ar' => 'required|string|max:255',
            'url' => 'required|string|max:255',
            'parent_item_id' => 'nullable|exists:menu_items,item_id',
            'display_order' => 'required|integer|min:0',
            'target' => 'required|in:_self,_blank',
            'icon' => 'nullable|string|max:255',
            'css_class' => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ]);

        $menu_item->update($validated);

        return redirect()->route('menu-items.index')
            ->with('success', 'Menu item updated successfully.');
    }

    public function toggleStatus(MenuItem $menu_item)
    {
        $menu_item->update([
            'is_active' => !$menu_item->is_active
        ]);

        return back()->with('success', 'Menu item status updated successfully.');
    }

    public function destroy(MenuItem $menu_item)
    {
        $menu_item->delete();

        return redirect()->route('menu-items.index')
            ->with('success', 'Menu item deleted successfully.');
    }
}