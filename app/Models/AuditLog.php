<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AuditLog extends Model
{
    protected $table = 'audit_logs';
    protected $primaryKey = 'log_id';

    protected $fillable = [
        'user_id',
        'action',
        'entity_type',
        'entity_id',
        'timestamp',
        'ip_address',
        'additional_data'
    ];

    protected $casts = [
        'timestamp' => 'datetime',
        'additional_data' => 'array'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
} 