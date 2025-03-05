<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ContentMedia extends Model
{
    protected $table = 'content_media';
    protected $primaryKey = 'content_media_id';

    protected $fillable = [
        'content_id',
        'media_id'
    ];

    public function content(): BelongsTo
    {
        return $this->belongsTo(Content::class, 'content_id', 'content_id');
    }

    public function media(): BelongsTo
    {
        return $this->belongsTo(Media::class, 'media_id', 'media_id');
    }
} 