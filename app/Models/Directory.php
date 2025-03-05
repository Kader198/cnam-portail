<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Directory extends Model
{
    use HasFactory;

    protected $primaryKey = 'directory_id';

    protected $fillable = [
        'entity_name',
        'entity_name_ar',
        'description',
        'description_ar',
        'contact_person',
        'contact_person_ar',
        'phone',
        'email',
        'address',
        'address_ar',
        'department_id',
        'website',
        'hours',
        'hours_ar',
        'position',
        'position_ar'
    ];

    public function department()
    {
        return $this->belongsTo(Department::class, 'department_id', 'department_id');
    }
} 