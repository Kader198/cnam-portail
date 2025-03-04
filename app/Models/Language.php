<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Language extends Model
{
    protected $table = 'languages';
    protected $primaryKey = 'language_id';

    protected $fillable = [
        'language_code',
        'language_name',
        'native_name',
        'is_active',
        'is_default',
        'direction'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'is_default' => 'boolean'
    ];

    public function translations(): HasMany
    {
        return $this->hasMany(Translation::class, 'language_id', 'language_id');
    }
} 