<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Media extends Model
{
    protected $table = 'media';
    protected $primaryKey = 'media_id';

    protected $fillable = [
        'file_name',
        'file_path',
        'media_type',
        'uploaded_by',
        'upload_date',
        'alt_text',
        'alt_text_ar',
        'title',
        'title_ar',
        'description',
        'description_ar',
        'file_size'
    ];

    protected $casts = [
        'upload_date' => 'datetime',
        'file_size' => 'integer'
    ];

    public function uploader(): BelongsTo
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }

    public function contents(): BelongsToMany
    {
        return $this->belongsToMany(Content::class, 'content_media', 'media_id', 'content_id')
            ->withTimestamps();
    }
} 