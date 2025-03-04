<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $roles = [
            [
                'role_name' => 'Super Admin',
                'role_name_ar' => 'مدير النظام',
                'description' => 'Full system access with all permissions',
                'description_ar' => 'صلاحيات كاملة للنظام',
                'permission_level' => 100
            ],
            [
                'role_name' => 'Admin',
                'role_name_ar' => 'مدير',
                'description' => 'Administrative access with most permissions',
                'description_ar' => 'صلاحيات إدارية واسعة',
                'permission_level' => 80
            ],
            [
                'role_name' => 'Editor',
                'role_name_ar' => 'محرر',
                'description' => 'Content editing and management permissions',
                'description_ar' => 'صلاحيات تحرير وإدارة المحتوى',
                'permission_level' => 60
            ],
            [
                'role_name' => 'User',
                'role_name_ar' => 'مستخدم',
                'description' => 'Basic user permissions',
                'description_ar' => 'صلاحيات المستخدم الأساسية',
                'permission_level' => 20
            ]
        ];

        foreach ($roles as $role) {
            Role::create($role);
        }
    }
} 