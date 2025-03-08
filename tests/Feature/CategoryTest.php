<?php

use App\Models\User;
use App\Models\Category;
use Illuminate\Support\Str;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('guests are redirected to the login page when accessing categories', function () {
    $this->get('/categories')->assertRedirect('/login');
});

test('authenticated users can view categories list', function () {
    $this->actingAs($user = User::factory()->create());
    $categories = Category::factory(3)->create();

    $this->get('/categories')
        ->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->component('category/category-list')
                ->has('categories.data', 3)
        );
});

test('authenticated users can create categories', function () {
    $this->actingAs($user = User::factory()->create());

    $categoryData = [
        'name' => 'Test Category',
        'name_ar' => 'فئة الاختبار',
        'description' => 'Test Description',
        'description_ar' => 'وصف الاختبار'
    ];

    $this->post('/categories', $categoryData)
        ->assertRedirect('/categories')
        ->assertSessionHas('message', 'Category created successfully');

    $this->assertDatabaseHas('categories', [
        'name' => 'Test Category',
        'name_ar' => 'فئة الاختبار',
        'slug' => Str::slug('Test Category'),
        'slug_ar' => Str::slug('فئة الاختبار')
    ]);
});

test('authenticated users can update categories', function () {
    $this->actingAs($user = User::factory()->create());
    $category = Category::factory()->create();

    $updateData = [
        'name' => 'Updated Category',
        'name_ar' => 'فئة محدثة',
        'description' => 'Updated Description',
        'description_ar' => 'وصف محدث'
    ];

    $this->put("/categories/{$category->category_id}", $updateData)
        ->assertRedirect('/categories')
        ->assertSessionHas('message', 'Category updated successfully');

    $this->assertDatabaseHas('categories', [
        'category_id' => $category->category_id,
        'name' => 'Updated Category',
        'name_ar' => 'فئة محدثة',
        'slug' => Str::slug('Updated Category'),
        'slug_ar' => Str::slug('فئة محدثة')
    ]);
});

test('authenticated users can delete categories', function () {
    $this->actingAs($user = User::factory()->create());
    $category = Category::factory()->create();

    $this->delete("/categories/{$category->category_id}")
        ->assertRedirect('/categories')
        ->assertSessionHas('message', 'Category deleted successfully');

    $this->assertDatabaseMissing('categories', [
        'category_id' => $category->category_id
    ]);
});

test('cannot delete category with associated contents', function () {
    $this->actingAs($user = User::factory()->create());
    $category = Category::factory()->create();

    // Create associated content
    $category->contents()->create([
        'title' => 'Test Content',
        'title_ar' => 'محتوى الاختبار',
        'content_body' => 'Test Content Body',
        'content_body_ar' => 'محتوى الاختبار',
        'content_type' => 'article',
        'is_published' => true,
        'author_id' => $user->id
    ]);

    $this->delete("/categories/{$category->category_id}")
        ->assertRedirect()
        ->assertSessionHas('error', 'Cannot delete category with associated contents.');

    $this->assertDatabaseHas('categories', [
        'category_id' => $category->category_id
    ]);
});

test('category creation requires all fields', function () {
    $this->actingAs($user = User::factory()->create());

    $this->post('/categories', [])
        ->assertSessionHasErrors(['name', 'name_ar', 'description', 'description_ar']);
});

test('category name must be unique', function () {
    $this->actingAs($user = User::factory()->create());

    // Create first category
    Category::factory()->create(['name' => 'Test Category']);

    // Try to create another category with the same name
    $this->post('/categories', [
        'name' => 'Test Category',
        'name_ar' => 'فئة الاختبار',
        'description' => 'Test Description',
        'description_ar' => 'وصف الاختبار'
    ])->assertSessionHasErrors('name');
});