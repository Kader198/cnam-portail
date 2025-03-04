<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Content extends Model
{
    protected $table = 'content';
    protected $primaryKey = 'content_id';

    protected $fillable = [
        'title',
        'title_ar',
        'content_body',
        'content_body_ar',
        'content_type',
        'author_id',
        'is_published',
        'slug',
        'slug_ar',
        'featured_image',
        'meta_description',
        'meta_description_ar',
        'keywords',
        'keywords_ar',
        'language_code'
    ];

    protected $casts = [
        'is_published' => 'boolean'
    ];

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'content_categories', 'content_id', 'category_id')
            ->withTimestamps();
    }

    public function media(): BelongsToMany
    {
        return $this->belongsToMany(Media::class, 'content_media', 'content_id', 'media_id')
            ->withTimestamps();
    }

    public function versions(): HasMany
    {
        return $this->hasMany(ContentVersion::class, 'content_id', 'content_id');
    }
} 