<?php

use App\Models\User;
use App\Models\FAQ;
use App\Models\Category;
use Illuminate\Support\Str;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('guests are redirected to the login page when accessing FAQs', function () {
    $this->get('/faqs')->assertRedirect('/login');
});

test('authenticated users can view FAQs list', function () {
    $this->actingAs($user = User::factory()->create());
    $faqs = FAQ::factory(3)->create();

    $this->get('/faqs')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('faq/faq-list')
            ->has('faqs.data', 3)
        );
});

test('authenticated users can create FAQs', function () {
    $this->actingAs($user = User::factory()->create());
    
    $faqData = [
        'question' => 'Test Question',
        'question_ar' => 'سؤال الاختبار',
        'answer' => 'Test Answer',
        'answer_ar' => 'إجابة الاختبار',
        'display_order' => 1,
        'is_published' => true
    ];

    $this->post('/faqs', $faqData)
        ->assertRedirect('/faqs')
        ->assertSessionHas('message', 'FAQ created successfully');

    $this->assertDatabaseHas('faqs', [
        'question' => 'Test Question',
        'question_ar' => 'سؤال الاختبار',
        'slug' => Str::slug('Test Question'),
        'slug_ar' => Str::slug('سؤال الاختبار')
    ]);
});

test('authenticated users can update FAQs', function () {
    $this->actingAs($user = User::factory()->create());
    $faq = FAQ::factory()->create();

    $updateData = [
        'question' => 'Updated Question',
        'question_ar' => 'سؤال محدث',
        'answer' => 'Updated Answer',
        'answer_ar' => 'إجابة محدثة',
        'display_order' => 2,
        'is_published' => true
    ];

    $this->put("/faqs/{$faq->faq_id}", $updateData)
        ->assertRedirect('/faqs')
        ->assertSessionHas('message', 'FAQ updated successfully');

    $this->assertDatabaseHas('faqs', [
        'faq_id' => $faq->faq_id,
        'question' => 'Updated Question',
        'question_ar' => 'سؤال محدث',
        'slug' => Str::slug('Updated Question'),
        'slug_ar' => Str::slug('سؤال محدث')
    ]);
});

test('authenticated users can delete FAQs', function () {
    $this->actingAs($user = User::factory()->create());
    $faq = FAQ::factory()->create();

    $this->delete("/faqs/{$faq->faq_id}")
        ->assertRedirect('/faqs')
        ->assertSessionHas('message', 'FAQ deleted successfully');

    $this->assertDatabaseMissing('faqs', [
        'faq_id' => $faq->faq_id
    ]);
});

test('FAQs can be filtered by status', function () {
    $this->actingAs($user = User::factory()->create());
    
    // Create FAQs with different statuses
    FAQ::factory()->create(['is_published' => true]);
    FAQ::factory()->create(['is_published' => false]);
    FAQ::factory()->create(['is_published' => true]);

    $this->get('/faqs?status=published')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('faq/faq-list')
            ->has('faqs.data', 2)
        );
});

test('FAQs can be searched by question or answer', function () {
    $this->actingAs($user = User::factory()->create());
    
    FAQ::factory()->create(['question' => 'Test Question']);
    FAQ::factory()->create(['question' => 'Another Question']);
    FAQ::factory()->create(['answer' => 'Test Answer']);

    $this->get('/faqs?search=Test')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('faq/faq-list')
            ->has('faqs.data', 2)
        );
});

test('FAQ creation requires all fields', function () {
    $this->actingAs($user = User::factory()->create());
    
    $this->post('/faqs', [])
        ->assertSessionHasErrors([
            'question', 'question_ar', 'answer', 'answer_ar',
            'display_order', 'is_published'
        ]);
});

test('FAQ question must be unique', function () {
    $this->actingAs($user = User::factory()->create());
    
    // Create first FAQ
    FAQ::factory()->create(['question' => 'Test Question']);
    
    // Try to create another FAQ with the same question
    $this->post('/faqs', [
        'question' => 'Test Question',
        'question_ar' => 'سؤال الاختبار',
        'answer' => 'Test Answer',
        'answer_ar' => 'إجابة الاختبار',
        'display_order' => 1,
        'is_published' => true
    ])->assertSessionHasErrors('question');
});

test('FAQs can be filtered by category', function () {
    $this->actingAs($user = User::factory()->create());

    $category1 = Category::factory()->create();
    $category2 = Category::factory()->create();

    // Create FAQs in different categories
    FAQ::factory()->create(['category_id' => $category1->category_id]);
    FAQ::factory()->create(['category_id' => $category2->category_id]);
    FAQ::factory()->create(['category_id' => $category1->category_id]);

    $this->get("/faqs?category_id={$category1->category_id}")
        ->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->component('faq/faq-list')
                ->has('faqs.data', 2)
        );
});