<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ContentVersion extends Model
{
    protected $table = 'content_versions';
    protected $primaryKey = 'version_id';

    protected $fillable = [
        'content_id',
        'content_body',
        'content_body_ar',
        'title',
        'title_ar',
        'author_id',
        'change_summary'
    ];

    public function content(): BelongsTo
    {
        return $this->belongsTo(Content::class, 'content_id', 'content_id');
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id');
    }
} 