<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name' => 'News',
                'name_ar' => 'الأخبار',
                'description' => 'Latest news and updates',
                'description_ar' => 'آخر الأخبار والتحديثات',
                'slug' => 'news',
                'slug_ar' => 'al-akhbar'
            ],
            [
                'name' => 'Events',
                'name_ar' => 'الفعاليات',
                'description' => 'Upcoming and past events',
                'description_ar' => 'الفعاليات القادمة والسابقة',
                'slug' => 'events',
                'slug_ar' => 'al-faaliyat'
            ],
            [
                'name' => 'Services',
                'name_ar' => 'الخدمات',
                'description' => 'Available services and resources',
                'description_ar' => 'الخدمات والموارد المتاحة',
                'slug' => 'services',
                'slug_ar' => 'al-khidmat'
            ],
            [
                'name' => 'About Us',
                'name_ar' => 'من نحن',
                'description' => 'Information about the organization',
                'description_ar' => 'معلومات عن المؤسسة',
                'slug' => 'about-us',
                'slug_ar' => 'man-nahnu'
            ],
            [
                'name' => 'Contact',
                'name_ar' => 'اتصل بنا',
                'description' => 'Contact information and forms',
                'description_ar' => 'معلومات الاتصال والنماذج',
                'slug' => 'contact',
                'slug_ar' => 'it-sal-bina'
            ]
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
} 