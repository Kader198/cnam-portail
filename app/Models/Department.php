<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use HasFactory;

    protected $primaryKey = 'department_id';

    protected $fillable = [
        'name',
        'name_ar',
        'description',
        'description_ar',
        'parent_department_id'
    ];

    public function parent()
    {
        return $this->belongsTo(Department::class, 'parent_department_id', 'department_id');
    }

    public function children()
    {
        return $this->hasMany(Department::class, 'parent_department_id', 'department_id');
    }

    public function directories()
    {
        return $this->hasMany(Directory::class, 'department_id', 'department_id');
    }
} 