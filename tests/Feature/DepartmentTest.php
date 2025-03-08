<?php

use App\Models\User;
use App\Models\Department;
use Illuminate\Support\Str;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('guests are redirected to the login page when accessing departments', function () {
    $this->get('/departments')->assertRedirect('/login');
});

test('authenticated users can view departments list', function () {
    $this->actingAs($user = User::factory()->create());
    $departments = Department::factory(3)->create();

    $this->get('/departments')
        ->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->component('department/department-list')
                ->has('departments.data', 3)
        );
});

test('authenticated users can create departments', function () {
    $this->actingAs($user = User::factory()->create());

    $departmentData = [
        'name' => 'Test Department',
        'name_ar' => 'قسم الاختبار',
        'description' => 'Test Department Description',
        'description_ar' => 'وصف قسم الاختبار',
        'is_active' => true
    ];

    $this->post('/departments', $departmentData)
        ->assertRedirect('/departments')
        ->assertSessionHas('message', 'Department created successfully');

    $this->assertDatabaseHas('departments', [
        'name' => 'Test Department',
        'name_ar' => 'قسم الاختبار',
        'slug' => Str::slug('Test Department'),
        'slug_ar' => Str::slug('قسم الاختبار')
    ]);
});

test('authenticated users can create nested departments', function () {
    $this->actingAs($user = User::factory()->create());
    $parentDepartment = Department::factory()->create();

    $departmentData = [
        'name' => 'Child Department',
        'name_ar' => 'قسم فرعي',
        'description' => 'Child Department Description',
        'description_ar' => 'وصف القسم الفرعي',
        'parent_id' => $parentDepartment->department_id,
        'is_active' => true
    ];

    $this->post('/departments', $departmentData)
        ->assertRedirect('/departments')
        ->assertSessionHas('message', 'Department created successfully');

    $this->assertDatabaseHas('departments', [
        'parent_id' => $parentDepartment->department_id,
        'name' => 'Child Department',
        'name_ar' => 'قسم فرعي',
        'slug' => Str::slug('Child Department'),
        'slug_ar' => Str::slug('قسم فرعي')
    ]);
});

test('authenticated users can update departments', function () {
    $this->actingAs($user = User::factory()->create());
    $department = Department::factory()->create();

    $updateData = [
        'name' => 'Updated Department',
        'name_ar' => 'قسم محدث',
        'description' => 'Updated Department Description',
        'description_ar' => 'وصف قسم محدث',
        'is_active' => true
    ];

    $this->put("/departments/{$department->department_id}", $updateData)
        ->assertRedirect('/departments')
        ->assertSessionHas('message', 'Department updated successfully');

    $this->assertDatabaseHas('departments', [
        'department_id' => $department->department_id,
        'name' => 'Updated Department',
        'name_ar' => 'قسم محدث',
        'slug' => Str::slug('Updated Department'),
        'slug_ar' => Str::slug('قسم محدث')
    ]);
});

test('authenticated users can delete departments', function () {
    $this->actingAs($user = User::factory()->create());
    $department = Department::factory()->create();

    $this->delete("/departments/{$department->department_id}")
        ->assertRedirect('/departments')
        ->assertSessionHas('message', 'Department deleted successfully');

    $this->assertDatabaseMissing('departments', [
        'department_id' => $department->department_id
    ]);
});

test('departments can be filtered by status', function () {
    $this->actingAs($user = User::factory()->create());

    // Create departments with different statuses
    Department::factory()->create(['is_active' => true]);
    Department::factory()->create(['is_active' => false]);
    Department::factory()->create(['is_active' => true]);

    $this->get('/departments?status=active')
        ->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->component('department/department-list')
                ->has('departments.data', 2)
        );
});

test('departments can be searched by name or description', function () {
    $this->actingAs($user = User::factory()->create());

    Department::factory()->create(['name' => 'Test Department']);
    Department::factory()->create(['name' => 'Another Department']);
    Department::factory()->create(['description' => 'Test Description']);

    $this->get('/departments?search=Test')
        ->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->component('department/department-list')
                ->has('departments.data', 2)
        );
});

test('department creation requires all fields', function () {
    $this->actingAs($user = User::factory()->create());

    $this->post('/departments', [])
        ->assertSessionHasErrors([
            'name',
            'name_ar',
            'description',
            'description_ar',
            'is_active'
        ]);
});

test('department name must be unique', function () {
    $this->actingAs($user = User::factory()->create());

    // Create first department
    Department::factory()->create(['name' => 'Test Department']);

    // Try to create another department with the same name
    $this->post('/departments', [
        'name' => 'Test Department',
        'name_ar' => 'قسم الاختبار',
        'description' => 'Test Description',
        'description_ar' => 'وصف الاختبار',
        'is_active' => true
    ])->assertSessionHasErrors('name');
});