<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Faq extends Model
{
    use HasFactory;

    protected $primaryKey = 'faq_id';

    protected $fillable = [
        'question',
        'question_ar',
        'answer',
        'answer_ar',
        'category_id',
        'display_order',
        'is_published'
    ];

    protected $casts = [
        'is_published' => 'boolean'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'category_id');
    }
} 