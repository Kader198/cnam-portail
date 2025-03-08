<?php

use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Str;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('guests are redirected to the login page when accessing roles', function () {
    $this->get('/roles')->assertRedirect('/login');
});

test('authenticated users can view roles list', function () {
    $this->actingAs($user = User::factory()->create());
    $roles = Role::factory(3)->create();

    $this->get('/roles')
        ->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->component('role/role-list')
                ->has('roles.data', 3)
        );
});

test('authenticated users can create roles', function () {
    $this->actingAs($user = User::factory()->create());

    $roleData = [
        'name' => 'Test Role',
        'name_ar' => 'دور الاختبار',
        'description' => 'Test Role Description',
        'description_ar' => 'وصف دور الاختبار',
        'permissions' => ['view', 'create', 'edit', 'delete']
    ];

    $this->post('/roles', $roleData)
        ->assertRedirect('/roles')
        ->assertSessionHas('message', 'Role created successfully');

    $this->assertDatabaseHas('roles', [
        'name' => 'Test Role',
        'name_ar' => 'دور الاختبار',
        'slug' => Str::slug('Test Role'),
        'slug_ar' => Str::slug('دور الاختبار')
    ]);
});

test('authenticated users can update roles', function () {
    $this->actingAs($user = User::factory()->create());
    $role = Role::factory()->create();

    $updateData = [
        'name' => 'Updated Role',
        'name_ar' => 'دور محدث',
        'description' => 'Updated Role Description',
        'description_ar' => 'وصف دور محدث',
        'permissions' => ['view', 'create']
    ];

    $this->put("/roles/{$role->role_id}", $updateData)
        ->assertRedirect('/roles')
        ->assertSessionHas('message', 'Role updated successfully');

    $this->assertDatabaseHas('roles', [
        'role_id' => $role->role_id,
        'name' => 'Updated Role',
        'name_ar' => 'دور محدث',
        'slug' => Str::slug('Updated Role'),
        'slug_ar' => Str::slug('دور محدث')
    ]);
});

test('authenticated users can delete roles', function () {
    $this->actingAs($user = User::factory()->create());
    $role = Role::factory()->create();

    $this->delete("/roles/{$role->role_id}")
        ->assertRedirect('/roles')
        ->assertSessionHas('message', 'Role deleted successfully');

    $this->assertDatabaseMissing('roles', [
        'role_id' => $role->role_id
    ]);
});

test('roles can be filtered by status', function () {
    $this->actingAs($user = User::factory()->create());

    // Create roles with different statuses
    Role::factory()->create(['is_active' => true]);
    Role::factory()->create(['is_active' => false]);
    Role::factory()->create(['is_active' => true]);

    $this->get('/roles?status=active')
        ->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->component('role/role-list')
                ->has('roles.data', 2)
        );
});

test('roles can be searched by name or description', function () {
    $this->actingAs($user = User::factory()->create());

    Role::factory()->create(['name' => 'Test Role']);
    Role::factory()->create(['name' => 'Another Role']);
    Role::factory()->create(['description' => 'Test Description']);

    $this->get('/roles?search=Test')
        ->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->component('role/role-list')
                ->has('roles.data', 2)
        );
});

test('role creation requires all fields', function () {
    $this->actingAs($user = User::factory()->create());

    $this->post('/roles', [])
        ->assertSessionHasErrors([
            'name',
            'name_ar',
            'description',
            'description_ar',
            'permissions'
        ]);
});

test('role name must be unique', function () {
    $this->actingAs($user = User::factory()->create());

    // Create first role
    Role::factory()->create(['name' => 'Test Role']);

    // Try to create another role with the same name
    $this->post('/roles', [
        'name' => 'Test Role',
        'name_ar' => 'دور الاختبار',
        'description' => 'Test Description',
        'description_ar' => 'وصف الاختبار',
        'permissions' => ['view', 'create']
    ])->assertSessionHasErrors('name');
});