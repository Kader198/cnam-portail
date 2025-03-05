<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Glossary extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'glossaries';
    protected $primaryKey = 'glossary_id';

    protected $fillable = [
        'term',
        'term_ar',
        'definition',
        'definition_ar',
        'first_letter',
        'first_letter_ar',
        'display_order',
    ];

    protected $casts = [
        'display_order' => 'integer',
    ];
} 