<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    public function run(): void
    {
        $permissions = [
            [
                'permission_name' => 'manage_users',
                'description' => 'Can manage users and their roles',
                'description_ar' => 'إمكانية إدارة المستخدمين وأدوارهم'
            ],
            [
                'permission_name' => 'manage_roles',
                'description' => 'Can manage roles and permissions',
                'description_ar' => 'إمكانية إدارة الأدوار والصلاحيات'
            ],
            [
                'permission_name' => 'manage_content',
                'description' => 'Can manage all content',
                'description_ar' => 'إمكانية إدارة جميع المحتويات'
            ],
            [
                'permission_name' => 'manage_categories',
                'description' => 'Can manage content categories',
                'description_ar' => 'إمكانية إدارة فئات المحتوى'
            ],
            [
                'permission_name' => 'manage_media',
                'description' => 'Can manage media files',
                'description_ar' => 'إمكانية إدارة ملفات الوسائط'
            ],
            [
                'permission_name' => 'manage_settings',
                'description' => 'Can manage system settings',
                'description_ar' => 'إمكانية إدارة إعدادات النظام'
            ],
            [
                'permission_name' => 'view_analytics',
                'description' => 'Can view system analytics',
                'description_ar' => 'إمكانية عرض إحصائيات النظام'
            ],
            [
                'permission_name' => 'manage_translations',
                'description' => 'Can manage content translations',
                'description_ar' => 'إمكانية إدارة ترجمات المحتوى'
            ]
        ];

        foreach ($permissions as $permission) {
            Permission::create($permission);
        }
    }
} 