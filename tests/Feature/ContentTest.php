<?php

use App\Models\User;
use App\Models\Content;
use App\Models\Category;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('guests are redirected to the login page when accessing contents', function () {
    $this->get('/contents')->assertRedirect('/login');
});

test('authenticated users can view contents list', function () {
    $this->actingAs($user = User::factory()->create());
    $contents = Content::factory(3)->create();

    $this->get('/contents')
        ->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->component('content/content-list')
                ->has('contents.data', 3)
        );
});

test('authenticated users can create contents', function () {
    $this->actingAs($user = User::factory()->create());
    $category = Category::factory()->create();

    $contentData = [
        'title' => 'Test Content',
        'title_ar' => 'محتوى الاختبار',
        'content_body' => 'Test Content Body',
        'content_body_ar' => 'محتوى الاختبار',
        'content_type' => 'article',
        'is_published' => true,
        'meta_description' => 'Test Meta Description',
        'meta_description_ar' => 'وصف ميتا الاختبار',
        'keywords' => 'test,content',
        'keywords_ar' => 'اختبار,محتوى',
        'category_id' => $category->category_id
    ];

    $this->post('/contents', $contentData)
        ->assertRedirect('/contents')
        ->assertSessionHas('message', 'Content created successfully');

    $this->assertDatabaseHas('contents', [
        'title' => 'Test Content',
        'title_ar' => 'محتوى الاختبار',
        'content_type' => 'article',
        'slug' => Str::slug('Test Content'),
        'slug_ar' => Str::slug('محتوى الاختبار'),
        'category_id' => $category->category_id
    ]);
});

test('authenticated users can create content with featured image', function () {
    $this->actingAs($user = User::factory()->create());
    Storage::fake('public');
    $category = Category::factory()->create();

    $contentData = [
        'title' => 'Test Content with Image',
        'title_ar' => 'محتوى الاختبار مع صورة',
        'content_body' => 'Test Content Body',
        'content_body_ar' => 'محتوى الاختبار',
        'content_type' => 'article',
        'is_published' => true,
        'category_id' => $category->category_id,
        'featured_image' => UploadedFile::fake()->image('test.jpg')
    ];

    $this->post('/contents', $contentData)
        ->assertRedirect('/contents')
        ->assertSessionHas('message', 'Content created successfully');

    $this->assertDatabaseHas('contents', [
        'title' => 'Test Content with Image',
        'title_ar' => 'محتوى الاختبار مع صورة',
        'slug' => Str::slug('Test Content with Image'),
        'slug_ar' => Str::slug('محتوى الاختبار مع صورة')
    ]);

    Storage::disk('public')->assertExists('content/test.jpg');
});

test('authenticated users can update contents', function () {
    $this->actingAs($user = User::factory()->create());
    $content = Content::factory()->create();

    $updateData = [
        'title' => 'Updated Content',
        'title_ar' => 'محتوى محدث',
        'content_body' => 'Updated Content Body',
        'content_body_ar' => 'محتوى محدث',
        'content_type' => 'article',
        'is_published' => true,
        'category_id' => $content->category_id
    ];

    $this->put("/contents/{$content->content_id}", $updateData)
        ->assertRedirect('/contents')
        ->assertSessionHas('message', 'Content updated successfully');

    $this->assertDatabaseHas('contents', [
        'content_id' => $content->content_id,
        'title' => 'Updated Content',
        'title_ar' => 'محتوى محدث',
        'slug' => Str::slug('Updated Content'),
        'slug_ar' => Str::slug('محتوى محدث')
    ]);
});

test('authenticated users can delete contents', function () {
    $this->actingAs($user = User::factory()->create());
    $content = Content::factory()->create();

    $this->delete("/contents/{$content->content_id}")
        ->assertRedirect('/contents')
        ->assertSessionHas('message', 'Content deleted successfully');

    $this->assertDatabaseMissing('contents', [
        'content_id' => $content->content_id
    ]);
});

test('content can be filtered by type and status', function () {
    $this->actingAs($user = User::factory()->create());

    // Create contents with different types and statuses
    Content::factory()->create(['content_type' => 'article', 'is_published' => true]);
    Content::factory()->create(['content_type' => 'page', 'is_published' => false]);
    Content::factory()->create(['content_type' => 'article', 'is_published' => false]);

    $this->get('/contents?type=article&status=published')
        ->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->component('content/content-list')
                ->has('contents.data', 1)
        );
});

test('content creation requires all fields', function () {
    $this->actingAs($user = User::factory()->create());

    $this->post('/contents', [])
        ->assertSessionHasErrors([
            'title',
            'title_ar',
            'content_body',
            'content_body_ar',
            'content_type',
            'category_id'
        ]);
});

test('content can be searched by title or content', function () {
    $this->actingAs($user = User::factory()->create());

    Content::factory()->create(['title' => 'Test Content']);
    Content::factory()->create(['title' => 'Another Content']);
    Content::factory()->create(['content_body' => 'Test Content Body']);

    $this->get('/contents?search=Test')
        ->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->component('content/content-list')
                ->has('contents.data', 2)
        );
});