<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SeoAnalytic extends Model
{
    protected $table = 'seo_analytics';
    protected $primaryKey = 'analytics_id';

    protected $fillable = [
        'page_url',
        'visitors',
        'unique_visitors',
        'bounce_rate',
        'avg_time_on_page',
        'record_date'
    ];

    protected $casts = [
        'visitors' => 'integer',
        'unique_visitors' => 'integer',
        'bounce_rate' => 'float',
        'avg_time_on_page' => 'integer',
        'record_date' => 'date'
    ];
} 