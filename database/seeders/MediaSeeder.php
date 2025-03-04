<?php

namespace Database\Seeders;

use App\Models\Media;
use App\Models\User;
use Illuminate\Database\Seeder;

class MediaSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all();

        if ($users->isEmpty()) {
            $this->command->error('No users found. Please run UserSeeder first.');
            return;
        }

        $mediaFiles = [
            [
                'file_name' => 'welcome-image.jpg',
                'file_path' => 'images/welcome-image.jpg',
                'media_type' => 'image',
                'alt_text' => 'Welcome to our platform',
                'alt_text_ar' => 'مرحباً بكم في منصتنا',
                'title' => 'Welcome Image',
                'title_ar' => 'صورة الترحيب',
                'description' => 'Welcome banner image for the platform',
                'description_ar' => 'صورة الترحيب للمنصة',
                'file_size' => 1024000
            ],
            [
                'file_name' => 'tech-trends.jpg',
                'file_path' => 'images/tech-trends.jpg',
                'media_type' => 'image',
                'alt_text' => 'Technology trends illustration',
                'alt_text_ar' => 'صورة توضيحية لاتجاهات التكنولوجيا',
                'title' => 'Tech Trends',
                'title_ar' => 'اتجاهات التكنولوجيا',
                'description' => 'Illustration showing technology trends',
                'description_ar' => 'صورة توضيحية لاتجاهات التكنولوجيا',
                'file_size' => 2048000
            ],
            [
                'file_name' => 'conference-2024.jpg',
                'file_path' => 'images/conference-2024.jpg',
                'media_type' => 'image',
                'alt_text' => 'Annual Conference 2024',
                'alt_text_ar' => 'المؤتمر السنوي 2024',
                'title' => 'Conference 2024',
                'title_ar' => 'المؤتمر 2024',
                'description' => 'Conference event banner',
                'description_ar' => 'لافتة المؤتمر',
                'file_size' => 3072000
            ],
            [
                'file_name' => 'services-overview.jpg',
                'file_path' => 'images/services-overview.jpg',
                'media_type' => 'image',
                'alt_text' => 'Services overview illustration',
                'alt_text_ar' => 'صورة توضيحية لنظرة عامة على الخدمات',
                'title' => 'Services Overview',
                'title_ar' => 'نظرة عامة على الخدمات',
                'description' => 'Illustration showing our services',
                'description_ar' => 'صورة توضيحية لخدماتنا',
                'file_size' => 4096000
            ]
        ];

        foreach ($mediaFiles as $mediaData) {
            $mediaData['uploaded_by'] = $users->random()->id;
            $mediaData['upload_date'] = now();

            Media::create($mediaData);
        }
    }
} 