<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class MenuItem extends Model
{
    protected $table = 'menu_items';
    protected $primaryKey = 'item_id';

    protected $fillable = [
        'menu_id',
        'item_title',
        'item_title_ar',
        'url',
        'parent_item_id',
        'display_order',
        'target',
        'icon',
        'css_class'
    ];

    public function menu(): BelongsTo
    {
        return $this->belongsTo(Menu::class, 'menu_id', 'menu_id');
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(MenuItem::class, 'parent_item_id', 'item_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(MenuItem::class, 'parent_item_id', 'item_id');
    }
} 