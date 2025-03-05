<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class News extends Model
{
    use HasFactory;

    protected $primaryKey = 'news_id';

    protected $fillable = [
        'title',
        'title_ar', 
        'content_body',
        'content_body_ar',
        'slug',
        'slug_ar',
        'featured_image',
        'meta_description',
        'meta_description_ar',
        'keywords',
        'keywords_ar',
        'language_code',
        'publication_date',
        'news_type',
        'featured',
        'is_published',
        'author_id'
    ];

    protected $casts = [
        'publication_date' => 'date',
        'featured' => 'boolean',
        'is_published' => 'boolean'
    ];

    public function media(): BelongsToMany
    {
        return $this->belongsToMany(Media::class, 'news_media', 'news_id', 'media_id')
            ->withTimestamps();
    }
} 