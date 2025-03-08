<?php

use App\Models\User;
use App\Models\News;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('guests are redirected to the login page when accessing news', function () {
    $this->get('/news')->assertRedirect('/login');
});

test('authenticated users can view news list', function () {
    $this->actingAs($user = User::factory()->create());
    $news = News::factory(3)->create();

    $this->get('/news')
        ->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->component('news/news-list')
                ->has('news.data', 3)
        );
});

test('authenticated users can create news articles', function () {
    $this->actingAs($user = User::factory()->create());
    Storage::fake('public');

    $file = UploadedFile::fake()->image('test.jpg');
    $newsData = [
        'title' => 'Test News',
        'title_ar' => 'أخبار الاختبار',
        'content' => 'Test News Content',
        'content_ar' => 'محتوى أخبار الاختبار',
        'summary' => 'Test News Summary',
        'summary_ar' => 'ملخص أخبار الاختبار',
        'featured_image' => $file,
        'is_published' => true,
        'publish_date' => now()->format('Y-m-d'),
        'meta_description' => 'Test Meta Description',
        'meta_description_ar' => 'وصف ميتا الاختبار',
        'keywords' => 'test,news',
        'keywords_ar' => 'اختبار,أخبار'
    ];

    $this->post('/news', $newsData)
        ->assertRedirect('/news')
        ->assertSessionHas('message', 'News article created successfully');

    $this->assertDatabaseHas('news', [
        'title' => 'Test News',
        'title_ar' => 'أخبار الاختبار',
        'slug' => Str::slug('Test News'),
        'slug_ar' => Str::slug('أخبار الاختبار')
    ]);

    Storage::disk('public')->assertExists('news/test.jpg');
});

test('authenticated users can update news articles', function () {
    $this->actingAs($user = User::factory()->create());
    $news = News::factory()->create();

    $updateData = [
        'title' => 'Updated News',
        'title_ar' => 'أخبار محدثة',
        'content' => 'Updated News Content',
        'content_ar' => 'محتوى أخبار محدث',
        'summary' => 'Updated News Summary',
        'summary_ar' => 'ملخص أخبار محدث',
        'is_published' => true,
        'publish_date' => now()->format('Y-m-d'),
        'meta_description' => 'Updated Meta Description',
        'meta_description_ar' => 'وصف ميتا محدث',
        'keywords' => 'updated,news',
        'keywords_ar' => 'محدث,أخبار'
    ];

    $this->put("/news/{$news->news_id}", $updateData)
        ->assertRedirect('/news')
        ->assertSessionHas('message', 'News article updated successfully');

    $this->assertDatabaseHas('news', [
        'news_id' => $news->news_id,
        'title' => 'Updated News',
        'title_ar' => 'أخبار محدثة',
        'slug' => Str::slug('Updated News'),
        'slug_ar' => Str::slug('أخبار محدثة')
    ]);
});

test('authenticated users can delete news articles', function () {
    $this->actingAs($user = User::factory()->create());
    $news = News::factory()->create();

    $this->delete("/news/{$news->news_id}")
        ->assertRedirect('/news')
        ->assertSessionHas('message', 'News article deleted successfully');

    $this->assertDatabaseMissing('news', [
        'news_id' => $news->news_id
    ]);
});

test('news can be filtered by status', function () {
    $this->actingAs($user = User::factory()->create());

    // Create news articles with different statuses
    News::factory()->create(['is_published' => true]);
    News::factory()->create(['is_published' => false]);
    News::factory()->create(['is_published' => true]);

    $this->get('/news?status=published')
        ->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->component('news/news-list')
                ->has('news.data', 2)
        );
});

test('news can be searched by title or content', function () {
    $this->actingAs($user = User::factory()->create());

    News::factory()->create(['title' => 'Test News']);
    News::factory()->create(['title' => 'Another News']);
    News::factory()->create(['content' => 'Test Content']);

    $this->get('/news?search=Test')
        ->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->component('news/news-list')
                ->has('news.data', 2)
        );
});

test('news creation requires all fields', function () {
    $this->actingAs($user = User::factory()->create());

    $this->post('/news', [])
        ->assertSessionHasErrors([
            'title',
            'title_ar',
            'content',
            'content_ar',
            'summary',
            'summary_ar',
            'is_published',
            'publish_date',
            'meta_description',
            'meta_description_ar',
            'keywords',
            'keywords_ar'
        ]);
});

test('news title must be unique', function () {
    $this->actingAs($user = User::factory()->create());

    // Create first news article
    News::factory()->create(['title' => 'Test News']);

    // Try to create another article with the same title
    $this->post('/news', [
        'title' => 'Test News',
        'title_ar' => 'أخبار الاختبار',
        'content' => 'Test Content',
        'content_ar' => 'محتوى الاختبار',
        'summary' => 'Test Summary',
        'summary_ar' => 'ملخص الاختبار',
        'is_published' => true,
        'publish_date' => now()->format('Y-m-d'),
        'meta_description' => 'Test Description',
        'meta_description_ar' => 'وصف الاختبار',
        'keywords' => 'test,news',
        'keywords_ar' => 'اختبار,أخبار'
    ])->assertSessionHasErrors('title');
});