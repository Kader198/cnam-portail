<?php

use App\Models\User;
use App\Models\Menu;
use App\Models\MenuItem;
use Illuminate\Support\Str;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('guests are redirected to the login page when accessing menu items', function () {
    $this->get('/menu-items')->assertRedirect('/login');
});

test('authenticated users can view menu items list', function () {
    $this->actingAs($user = User::factory()->create());
    $menuItems = MenuItem::factory(3)->create();

    $this->get('/menu-items')
        ->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->component('menu/menu-item-list')
                ->has('menuItems.data', 3)
        );
});

test('authenticated users can create menu items', function () {
    $this->actingAs($user = User::factory()->create());
    $menu = Menu::factory()->create();

    $menuItemData = [
        'menu_id' => $menu->menu_id,
        'title' => 'Test Menu Item',
        'title_ar' => 'عنصر قائمة الاختبار',
        'url' => '/test',
        'target' => '_self',
        'display_order' => 1,
        'is_active' => true
    ];

    $this->post('/menu-items', $menuItemData)
        ->assertRedirect('/menu-items')
        ->assertSessionHas('message', 'Menu item created successfully');

    $this->assertDatabaseHas('menu_items', [
        'menu_id' => $menu->menu_id,
        'title' => 'Test Menu Item',
        'title_ar' => 'عنصر قائمة الاختبار',
        'slug' => Str::slug('Test Menu Item'),
        'slug_ar' => Str::slug('عنصر قائمة الاختبار')
    ]);
});

test('authenticated users can create nested menu items', function () {
    $this->actingAs($user = User::factory()->create());
    $menu = Menu::factory()->create();
    $parentItem = MenuItem::factory()->create(['menu_id' => $menu->menu_id]);

    $menuItemData = [
        'menu_id' => $menu->menu_id,
        'parent_id' => $parentItem->menu_item_id,
        'title' => 'Child Menu Item',
        'title_ar' => 'عنصر قائمة فرعي',
        'url' => '/child',
        'target' => '_self',
        'display_order' => 1,
        'is_active' => true
    ];

    $this->post('/menu-items', $menuItemData)
        ->assertRedirect('/menu-items')
        ->assertSessionHas('message', 'Menu item created successfully');

    $this->assertDatabaseHas('menu_items', [
        'menu_id' => $menu->menu_id,
        'parent_id' => $parentItem->menu_item_id,
        'title' => 'Child Menu Item',
        'title_ar' => 'عنصر قائمة فرعي',
        'slug' => Str::slug('Child Menu Item'),
        'slug_ar' => Str::slug('عنصر قائمة فرعي')
    ]);
});

test('authenticated users can update menu items', function () {
    $this->actingAs($user = User::factory()->create());
    $menuItem = MenuItem::factory()->create();

    $updateData = [
        'menu_id' => $menuItem->menu_id,
        'title' => 'Updated Menu Item',
        'title_ar' => 'عنصر قائمة محدث',
        'url' => '/updated',
        'target' => '_blank',
        'display_order' => 2,
        'is_active' => true
    ];

    $this->put("/menu-items/{$menuItem->menu_item_id}", $updateData)
        ->assertRedirect('/menu-items')
        ->assertSessionHas('message', 'Menu item updated successfully');

    $this->assertDatabaseHas('menu_items', [
        'menu_item_id' => $menuItem->menu_item_id,
        'title' => 'Updated Menu Item',
        'title_ar' => 'عنصر قائمة محدث',
        'slug' => Str::slug('Updated Menu Item'),
        'slug_ar' => Str::slug('عنصر قائمة محدث')
    ]);
});

test('authenticated users can delete menu items', function () {
    $this->actingAs($user = User::factory()->create());
    $menuItem = MenuItem::factory()->create();

    $this->delete("/menu-items/{$menuItem->menu_item_id}")
        ->assertRedirect('/menu-items')
        ->assertSessionHas('message', 'Menu item deleted successfully');

    $this->assertDatabaseMissing('menu_items', [
        'menu_item_id' => $menuItem->menu_item_id
    ]);
});

test('menu items can be filtered by menu', function () {
    $this->actingAs($user = User::factory()->create());
    $menu1 = Menu::factory()->create();
    $menu2 = Menu::factory()->create();

    // Create menu items in different menus
    MenuItem::factory()->create(['menu_id' => $menu1->menu_id]);
    MenuItem::factory()->create(['menu_id' => $menu2->menu_id]);
    MenuItem::factory()->create(['menu_id' => $menu1->menu_id]);

    $this->get("/menu-items?menu_id={$menu1->menu_id}")
        ->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->component('menu/menu-item-list')
                ->has('menuItems.data', 2)
        );
});

test('menu items can be filtered by status', function () {
    $this->actingAs($user = User::factory()->create());

    // Create menu items with different statuses
    MenuItem::factory()->create(['is_active' => true]);
    MenuItem::factory()->create(['is_active' => false]);
    MenuItem::factory()->create(['is_active' => true]);

    $this->get('/menu-items?status=active')
        ->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->component('menu/menu-item-list')
                ->has('menuItems.data', 2)
        );
});

test('menu item creation requires all fields', function () {
    $this->actingAs($user = User::factory()->create());

    $this->post('/menu-items', [])
        ->assertSessionHasErrors([
            'menu_id',
            'title',
            'title_ar',
            'url',
            'target',
            'display_order',
            'is_active'
        ]);
});

test('menu item title must be unique within the same menu', function () {
    $this->actingAs($user = User::factory()->create());
    $menu = Menu::factory()->create();

    // Create first menu item
    MenuItem::factory()->create([
        'menu_id' => $menu->menu_id,
        'title' => 'Test Menu Item'
    ]);

    // Try to create another menu item with the same title in the same menu
    $this->post('/menu-items', [
        'menu_id' => $menu->menu_id,
        'title' => 'Test Menu Item',
        'title_ar' => 'عنصر قائمة الاختبار',
        'url' => '/test',
        'target' => '_self',
        'display_order' => 1,
        'is_active' => true
    ])->assertSessionHasErrors('title');
});