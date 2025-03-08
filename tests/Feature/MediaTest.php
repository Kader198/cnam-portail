<?php

use App\Models\User;
use App\Models\Media;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('guests are redirected to the login page when accessing media', function () {
    $this->get('/media')->assertRedirect('/login');
});

test('authenticated users can view media list', function () {
    $this->actingAs($user = User::factory()->create());
    $media = Media::factory(3)->create();

    $this->get('/media')
        ->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->component('media/media-list')
                ->has('media.data', 3)
        );
});

test('authenticated users can upload media', function () {
    $this->actingAs($user = User::factory()->create());
    Storage::fake('public');

    $file = UploadedFile::fake()->image('test.jpg');
    $mediaData = [
        'title' => 'Test Media',
        'title_ar' => 'وسائط الاختبار',
        'description' => 'Test Media Description',
        'description_ar' => 'وصف وسائط الاختبار',
        'type' => 'image',
        'file' => $file
    ];

    $this->post('/media', $mediaData)
        ->assertRedirect('/media')
        ->assertSessionHas('message', 'Media uploaded successfully');

    $this->assertDatabaseHas('media', [
        'title' => 'Test Media',
        'title_ar' => 'وسائط الاختبار',
        'slug' => Str::slug('Test Media'),
        'slug_ar' => Str::slug('وسائط الاختبار'),
        'type' => 'image'
    ]);

    Storage::disk('public')->assertExists('media/test.jpg');
});

test('authenticated users can update media details', function () {
    $this->actingAs($user = User::factory()->create());
    $media = Media::factory()->create();

    $updateData = [
        'title' => 'Updated Media',
        'title_ar' => 'وسائط محدثة',
        'description' => 'Updated Media Description',
        'description_ar' => 'وصف وسائط محدثة',
        'type' => 'image'
    ];

    $this->put("/media/{$media->media_id}", $updateData)
        ->assertRedirect('/media')
        ->assertSessionHas('message', 'Media updated successfully');

    $this->assertDatabaseHas('media', [
        'media_id' => $media->media_id,
        'title' => 'Updated Media',
        'title_ar' => 'وسائط محدثة',
        'slug' => Str::slug('Updated Media'),
        'slug_ar' => Str::slug('وسائط محدثة')
    ]);
});

test('authenticated users can delete media', function () {
    $this->actingAs($user = User::factory()->create());
    $media = Media::factory()->create();

    $this->delete("/media/{$media->media_id}")
        ->assertRedirect('/media')
        ->assertSessionHas('message', 'Media deleted successfully');

    $this->assertDatabaseMissing('media', [
        'media_id' => $media->media_id
    ]);
});

test('media can be filtered by type', function () {
    $this->actingAs($user = User::factory()->create());

    // Create media with different types
    Media::factory()->create(['type' => 'image']);
    Media::factory()->create(['type' => 'video']);
    Media::factory()->create(['type' => 'image']);

    $this->get('/media?type=image')
        ->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->component('media/media-list')
                ->has('media.data', 2)
        );
});

test('media can be searched by title or description', function () {
    $this->actingAs($user = User::factory()->create());

    Media::factory()->create(['title' => 'Test Media']);
    Media::factory()->create(['title' => 'Another Media']);
    Media::factory()->create(['description' => 'Test Description']);

    $this->get('/media?search=Test')
        ->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->component('media/media-list')
                ->has('media.data', 2)
        );
});

test('media upload requires all fields', function () {
    $this->actingAs($user = User::factory()->create());

    $this->post('/media', [])
        ->assertSessionHasErrors([
            'title',
            'title_ar',
            'description',
            'description_ar',
            'type',
            'file'
        ]);
});

test('media file must be valid', function () {
    $this->actingAs($user = User::factory()->create());
    Storage::fake('public');

    $invalidFile = UploadedFile::fake()->create('test.txt', 100);
    $mediaData = [
        'title' => 'Test Media',
        'title_ar' => 'وسائط الاختبار',
        'description' => 'Test Description',
        'description_ar' => 'وصف الاختبار',
        'type' => 'image',
        'file' => $invalidFile
    ];

    $this->post('/media', $mediaData)
        ->assertSessionHasErrors('file');
});