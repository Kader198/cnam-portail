<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Menu extends Model
{
    protected $table = 'menus';
    protected $primaryKey = 'menu_id';

    protected $fillable = [
        'menu_name',
        'menu_name_ar',
        'location',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean'
    ];

    public function items(): HasMany
    {
        return $this->hasMany(MenuItem::class, 'menu_id', 'menu_id');
    }
} 