<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $table = 'settings';
    protected $primaryKey = 'setting_id';

    protected $fillable = [
        'setting_key',
        'setting_value',
        'setting_value_ar',
        'setting_group',
        'is_system',
        'is_translatable'
    ];

    protected $casts = [
        'is_system' => 'boolean',
        'is_translatable' => 'boolean'
    ];
} 