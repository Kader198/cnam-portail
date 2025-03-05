<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    protected $table = 'categories';
    protected $primaryKey = 'category_id';

    protected $fillable = [
        'name',
        'name_ar',
        'description',
        'description_ar',
        'slug',
        'slug_ar'
    ];

    public function parent(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'parent_category_id', 'category_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(Category::class, 'parent_category_id', 'category_id');
    }

    public function contents(): BelongsToMany
    {
        return $this->belongsToMany(Content::class, 'content_categories', 'category_id', 'content_id')
            ->withTimestamps();
    }
} 