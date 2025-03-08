<?php

use App\Models\User;
use App\Models\Menu;
use Illuminate\Support\Str;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('guests are redirected to the login page when accessing menus', function () {
    $this->get('/menus')->assertRedirect('/login');
});

test('authenticated users can view menus list', function () {
    $this->actingAs($user = User::factory()->create());
    $menus = Menu::factory(3)->create();

    $this->get('/menus')
        ->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->component('menu/menu-list')
                ->has('menus.data', 3)
        );
});

test('authenticated users can create menus', function () {
    $this->actingAs($user = User::factory()->create());

    $menuData = [
        'name' => 'Test Menu',
        'name_ar' => 'قائمة الاختبار',
        'location' => 'header',
        'is_active' => true
    ];

    $this->post('/menus', $menuData)
        ->assertRedirect('/menus')
        ->assertSessionHas('message', 'Menu created successfully');

    $this->assertDatabaseHas('menus', [
        'name' => 'Test Menu',
        'name_ar' => 'قائمة الاختبار',
        'slug' => Str::slug('Test Menu'),
        'slug_ar' => Str::slug('قائمة الاختبار')
    ]);
});

test('authenticated users can update menus', function () {
    $this->actingAs($user = User::factory()->create());
    $menu = Menu::factory()->create();

    $updateData = [
        'name' => 'Updated Menu',
        'name_ar' => 'قائمة محدثة',
        'location' => 'footer',
        'is_active' => true
    ];

    $this->put("/menus/{$menu->menu_id}", $updateData)
        ->assertRedirect('/menus')
        ->assertSessionHas('message', 'Menu updated successfully');

    $this->assertDatabaseHas('menus', [
        'menu_id' => $menu->menu_id,
        'name' => 'Updated Menu',
        'name_ar' => 'قائمة محدثة',
        'slug' => Str::slug('Updated Menu'),
        'slug_ar' => Str::slug('قائمة محدثة')
    ]);
});

test('authenticated users can delete menus', function () {
    $this->actingAs($user = User::factory()->create());
    $menu = Menu::factory()->create();

    $this->delete("/menus/{$menu->menu_id}")
        ->assertRedirect('/menus')
        ->assertSessionHas('message', 'Menu deleted successfully');

    $this->assertDatabaseMissing('menus', [
        'menu_id' => $menu->menu_id
    ]);
});

test('menus can be filtered by location', function () {
    $this->actingAs($user = User::factory()->create());

    // Create menus in different locations
    Menu::factory()->create(['location' => 'header']);
    Menu::factory()->create(['location' => 'footer']);
    Menu::factory()->create(['location' => 'header']);

    $this->get('/menus?location=header')
        ->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->component('menu/menu-list')
                ->has('menus.data', 2)
        );
});

test('menus can be filtered by status', function () {
    $this->actingAs($user = User::factory()->create());

    // Create menus with different statuses
    Menu::factory()->create(['is_active' => true]);
    Menu::factory()->create(['is_active' => false]);
    Menu::factory()->create(['is_active' => true]);

    $this->get('/menus?status=active')
        ->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->component('menu/menu-list')
                ->has('menus.data', 2)
        );
});

test('menu creation requires all fields', function () {
    $this->actingAs($user = User::factory()->create());

    $this->post('/menus', [])
        ->assertSessionHasErrors(['name', 'name_ar', 'location', 'is_active']);
});

test('menu name must be unique', function () {
    $this->actingAs($user = User::factory()->create());

    // Create first menu
    Menu::factory()->create(['name' => 'Test Menu']);

    // Try to create another menu with the same name
    $this->post('/menus', [
        'name' => 'Test Menu',
        'name_ar' => 'قائمة الاختبار',
        'location' => 'header',
        'is_active' => true
    ])->assertSessionHasErrors('name');
});