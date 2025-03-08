<?php

use App\Models\User;
use App\Models\SeoAnalytic;
use Illuminate\Support\Str;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('guests are redirected to the login page when accessing SEO analytics', function () {
    $this->get('/seo-analytics')->assertRedirect('/login');
});

test('authenticated users can view SEO analytics list', function () {
    $this->actingAs($user = User::factory()->create());
    $analytics = SeoAnalytic::factory(3)->create();

    $this->get('/seo-analytics')
        ->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->component('seo/seo-analytic-list')
                ->has('analytics.data', 3)
        );
});

test('authenticated users can create SEO analytics records', function () {
    $this->actingAs($user = User::factory()->create());

    $analyticsData = [
        'page_url' => 'https://example.com/test',
        'page_title' => 'Test Page',
        'page_title_ar' => 'صفحة الاختبار',
        'meta_description' => 'Test Meta Description',
        'meta_description_ar' => 'وصف ميتا الاختبار',
        'keywords' => 'test,seo,analytics',
        'keywords_ar' => 'اختبار,تحسين محركات البحث,تحليلات',
        'visitors' => 100,
        'unique_visitors' => 80,
        'bounce_rate' => 20.5,
        'avg_time_on_page' => 120,
        'record_date' => now()->format('Y-m-d')
    ];

    $this->post('/seo-analytics', $analyticsData)
        ->assertRedirect('/seo-analytics')
        ->assertSessionHas('message', 'SEO analytics record created successfully');

    $this->assertDatabaseHas('seo_analytics', [
        'page_url' => 'https://example.com/test',
        'page_title' => 'Test Page',
        'page_title_ar' => 'صفحة الاختبار',
        'slug' => Str::slug('Test Page'),
        'slug_ar' => Str::slug('صفحة الاختبار')
    ]);
});

test('authenticated users can update SEO analytics records', function () {
    $this->actingAs($user = User::factory()->create());
    $analytic = SeoAnalytic::factory()->create();

    $updateData = [
        'page_url' => 'https://example.com/updated',
        'page_title' => 'Updated Page',
        'page_title_ar' => 'صفحة محدثة',
        'meta_description' => 'Updated Meta Description',
        'meta_description_ar' => 'وصف ميتا محدث',
        'keywords' => 'updated,seo,analytics',
        'keywords_ar' => 'محدث,تحسين محركات البحث,تحليلات',
        'visitors' => 200,
        'unique_visitors' => 160,
        'bounce_rate' => 15.5,
        'avg_time_on_page' => 180,
        'record_date' => now()->format('Y-m-d')
    ];

    $this->put("/seo-analytics/{$analytic->seo_analytic_id}", $updateData)
        ->assertRedirect('/seo-analytics')
        ->assertSessionHas('message', 'SEO analytics record updated successfully');

    $this->assertDatabaseHas('seo_analytics', [
        'seo_analytic_id' => $analytic->seo_analytic_id,
        'page_url' => 'https://example.com/updated',
        'page_title' => 'Updated Page',
        'page_title_ar' => 'صفحة محدثة',
        'slug' => Str::slug('Updated Page'),
        'slug_ar' => Str::slug('صفحة محدثة')
    ]);
});

test('authenticated users can delete SEO analytics records', function () {
    $this->actingAs($user = User::factory()->create());
    $analytic = SeoAnalytic::factory()->create();

    $this->delete("/seo-analytics/{$analytic->seo_analytic_id}")
        ->assertRedirect('/seo-analytics')
        ->assertSessionHas('message', 'SEO analytics record deleted successfully');

    $this->assertDatabaseMissing('seo_analytics', [
        'seo_analytic_id' => $analytic->seo_analytic_id
    ]);
});

test('SEO analytics can be filtered by date range', function () {
    $this->actingAs($user = User::factory()->create());

    // Create analytics records with different dates
    SeoAnalytic::factory()->create(['record_date' => now()->subDays(2)]);
    SeoAnalytic::factory()->create(['record_date' => now()->subDays(1)]);
    SeoAnalytic::factory()->create(['record_date' => now()]);

    $startDate = now()->subDays(2)->format('Y-m-d');
    $endDate = now()->subDays(1)->format('Y-m-d');

    $this->get("/seo-analytics?start_date={$startDate}&end_date={$endDate}")
        ->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->component('seo/seo-analytic-list')
                ->has('analytics.data', 2)
        );
});

test('SEO analytics can be searched by page URL', function () {
    $this->actingAs($user = User::factory()->create());

    SeoAnalytic::factory()->create(['page_url' => 'https://example.com/test']);
    SeoAnalytic::factory()->create(['page_url' => 'https://example.com/another']);
    SeoAnalytic::factory()->create(['page_url' => 'https://example.com/test-page']);

    $this->get('/seo-analytics?search=test')
        ->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->component('seo/seo-analytic-list')
                ->has('analytics.data', 2)
        );
});

test('SEO analytics creation requires all fields', function () {
    $this->actingAs($user = User::factory()->create());

    $this->post('/seo-analytics', [])
        ->assertSessionHasErrors([
            'page_url',
            'visitors',
            'unique_visitors',
            'bounce_rate',
            'avg_time_on_page',
            'record_date'
        ]);
});

test('SEO analytics page URL must be unique for the same date', function () {
    $this->actingAs($user = User::factory()->create());

    // Create first analytics record
    SeoAnalytic::create([
        'page_url' => 'https://example.com/test',
        'page_title' => 'Test Page',
        'page_title_ar' => 'صفحة الاختبار',
        'meta_description' => 'Test Description',
        'meta_description_ar' => 'وصف الاختبار',
        'keywords' => 'test,seo',
        'keywords_ar' => 'اختبار,تحسين محركات البحث',
        'visitors' => 100,
        'unique_visitors' => 80,
        'bounce_rate' => 20.5,
        'avg_time_on_page' => 120,
        'record_date' => now()->format('Y-m-d')
    ]);

    // Try to create another record with the same URL and date
    $this->post('/seo-analytics', [
        'page_url' => 'https://example.com/test',
        'page_title' => 'Test Page',
        'page_title_ar' => 'صفحة الاختبار',
        'meta_description' => 'Test Description',
        'meta_description_ar' => 'وصف الاختبار',
        'keywords' => 'test,seo',
        'keywords_ar' => 'اختبار,تحسين محركات البحث',
        'visitors' => 100,
        'unique_visitors' => 80,
        'bounce_rate' => 20.5,
        'avg_time_on_page' => 120,
        'record_date' => now()->format('Y-m-d')
    ])->assertSessionHasErrors('page_url');
});