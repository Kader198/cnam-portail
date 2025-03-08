<?php

use App\Models\User;
use App\Models\Glossary;
use Illuminate\Support\Str;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('guests are redirected to the login page when accessing glossary', function () {
    $this->get('/glossary')->assertRedirect('/login');
});

test('authenticated users can view glossary list', function () {
    $this->actingAs($user = User::factory()->create());
    $glossary = Glossary::factory(3)->create();

    $this->get('/glossary')
        ->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->component('glossary/glossary-list')
                ->has('glossary.data', 3)
        );
});

test('authenticated users can create glossary terms', function () {
    $this->actingAs($user = User::factory()->create());

    $glossaryData = [
        'term' => 'Test Term',
        'term_ar' => 'مصطلح الاختبار',
        'definition' => 'Test Definition',
        'definition_ar' => 'تعريف الاختبار',
        'display_order' => 1
    ];

    $this->post('/glossary', $glossaryData)
        ->assertRedirect('/glossary')
        ->assertSessionHas('message', 'Glossary term created successfully');

    $this->assertDatabaseHas('glossary', [
        'term' => 'Test Term',
        'term_ar' => 'مصطلح الاختبار',
        'slug' => Str::slug('Test Term'),
        'slug_ar' => Str::slug('مصطلح الاختبار')
    ]);
});

test('authenticated users can update glossary terms', function () {
    $this->actingAs($user = User::factory()->create());
    $glossary = Glossary::factory()->create();

    $updateData = [
        'term' => 'Updated Term',
        'term_ar' => 'مصطلح محدث',
        'definition' => 'Updated Definition',
        'definition_ar' => 'تعريف محدث',
        'display_order' => 2
    ];

    $this->put("/glossary/{$glossary->glossary_id}", $updateData)
        ->assertRedirect('/glossary')
        ->assertSessionHas('message', 'Glossary term updated successfully');

    $this->assertDatabaseHas('glossary', [
        'glossary_id' => $glossary->glossary_id,
        'term' => 'Updated Term',
        'term_ar' => 'مصطلح محدث',
        'slug' => Str::slug('Updated Term'),
        'slug_ar' => Str::slug('مصطلح محدث')
    ]);
});

test('authenticated users can delete glossary terms', function () {
    $this->actingAs($user = User::factory()->create());
    $glossary = Glossary::factory()->create();

    $this->delete("/glossary/{$glossary->glossary_id}")
        ->assertRedirect('/glossary')
        ->assertSessionHas('message', 'Glossary term deleted successfully');

    $this->assertDatabaseMissing('glossary', [
        'glossary_id' => $glossary->glossary_id
    ]);
});

test('glossary can be filtered by first letter', function () {
    $this->actingAs($user = User::factory()->create());

    // Create glossary terms with different first letters
    Glossary::factory()->create(['term' => 'Apple']);
    Glossary::factory()->create(['term' => 'Banana']);
    Glossary::factory()->create(['term' => 'Apple']);

    $this->get('/glossary?first_letter=A')
        ->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->component('glossary/glossary-list')
                ->has('glossary.data', 2)
        );
});

test('glossary can be filtered by Arabic first letter', function () {
    $this->actingAs($user = User::factory()->create());

    // Create glossary terms with different Arabic first letters
    Glossary::factory()->create(['term_ar' => 'تفاح']);
    Glossary::factory()->create(['term_ar' => 'موز']);
    Glossary::factory()->create(['term_ar' => 'تفاح']);

    $this->get('/glossary?first_letter_ar=ت')
        ->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->component('glossary/glossary-list')
                ->has('glossary.data', 2)
        );
});

test('glossary creation requires all fields', function () {
    $this->actingAs($user = User::factory()->create());

    $this->post('/glossary', [])
        ->assertSessionHasErrors(['term', 'term_ar', 'definition', 'definition_ar', 'display_order']);
});

test('glossary term must be unique', function () {
    $this->actingAs($user = User::factory()->create());

    // Create first term
    Glossary::factory()->create(['term' => 'Test Term']);

    // Try to create another term with the same name
    $this->post('/glossary', [
        'term' => 'Test Term',
        'term_ar' => 'مصطلح الاختبار',
        'definition' => 'Test Definition',
        'definition_ar' => 'تعريف الاختبار',
        'display_order' => 1
    ])->assertSessionHasErrors('term');
});