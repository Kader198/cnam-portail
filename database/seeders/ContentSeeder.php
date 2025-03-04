<?php

namespace Database\Seeders;

use App\Models\Content;
use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ContentSeeder extends Seeder
{
    public function run(): void
    {
        $categories = Category::all();
        $users = User::all();

        if ($users->isEmpty()) {
            $this->command->error('No users found. Please run UserSeeder first.');
            return;
        }

        $contentTypes = ['article', 'news', 'event', 'page'];
        $languages = ['en', 'ar'];

        $contents = [
            [
                'title' => 'Welcome to Our Platform',
                'title_ar' => 'مرحباً بكم في منصتنا',
                'content_body' => 'Welcome to our comprehensive platform. We are dedicated to providing the best experience for our users.',
                'content_body_ar' => 'مرحباً بكم في منصتنا الشاملة. نحن ملتزمون بتقديم أفضل تجربة لمستخدمينا.',
                'content_type' => 'page',
                'is_published' => true,
                'meta_description' => 'Welcome page of our platform',
                'meta_description_ar' => 'صفحة الترحيب في منصتنا',
                'keywords' => 'welcome, platform, introduction',
                'keywords_ar' => 'ترحيب، منصة، مقدمة',
                'featured_image' => 'welcome-image.jpg',
                'language_code' => 'en',
                'categories' => ['About Us']
            ],
            [
                'title' => 'Latest Technology Trends',
                'title_ar' => 'أحدث اتجاهات التكنولوجيا',
                'content_body' => 'Explore the latest trends in technology and innovation that are shaping our future.',
                'content_body_ar' => 'اكتشف أحدث اتجاهات التكنولوجيا والابتكار التي تشكل مستقبلنا.',
                'content_type' => 'article',
                'is_published' => true,
                'meta_description' => 'Latest technology trends and innovations',
                'meta_description_ar' => 'أحدث اتجاهات التكنولوجيا والابتكارات',
                'keywords' => 'technology, trends, innovation',
                'keywords_ar' => 'تكنولوجيا، اتجاهات، ابتكار',
                'featured_image' => 'tech-trends.jpg',
                'language_code' => 'en',
                'categories' => ['News']
            ],
            [
                'title' => 'Annual Conference 2024',
                'title_ar' => 'المؤتمر السنوي 2024',
                'content_body' => 'Join us for our annual conference where industry experts will share their insights.',
                'content_body_ar' => 'انضم إلينا في مؤتمرنا السنوي حيث يشارك خبراء الصناعة رؤاهم.',
                'content_type' => 'event',
                'is_published' => true,
                'meta_description' => 'Annual conference event details',
                'meta_description_ar' => 'تفاصيل المؤتمر السنوي',
                'keywords' => 'conference, annual, event',
                'keywords_ar' => 'مؤتمر، سنوي، فعالية',
                'featured_image' => 'conference-2024.jpg',
                'language_code' => 'en',
                'categories' => ['Events']
            ],
            [
                'title' => 'Our Services Overview',
                'title_ar' => 'نظرة عامة على خدماتنا',
                'content_body' => 'Discover our comprehensive range of services designed to meet your needs.',
                'content_body_ar' => 'اكتشف مجموعتنا الشاملة من الخدمات المصممة لتلبية احتياجاتك.',
                'content_type' => 'page',
                'is_published' => true,
                'meta_description' => 'Overview of our services',
                'meta_description_ar' => 'نظرة عامة على خدماتنا',
                'keywords' => 'services, overview, solutions',
                'keywords_ar' => 'خدمات، نظرة عامة، حلول',
                'featured_image' => 'services-overview.jpg',
                'language_code' => 'en',
                'categories' => ['Services']
            ]
        ];

        foreach ($contents as $contentData) {
            $categories = $contentData['categories'];
            unset($contentData['categories']);

            $contentData['slug'] = Str::slug($contentData['title']);
            $contentData['slug_ar'] = Str::slug($contentData['title_ar']);
            $contentData['author_id'] = $users->random()->id;

            $content = Content::create($contentData);

            // Attach categories
            foreach ($categories as $categoryName) {
                $category = Category::where('name', $categoryName)->first();
                if ($category) {
                    $content->categories()->attach($category->category_id);
                }
            }
        }
    }
} 