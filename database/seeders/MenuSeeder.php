<?php

namespace Database\Seeders;

use App\Models\Menu;
use App\Models\MenuItem;
use Illuminate\Database\Seeder;

class MenuSeeder extends Seeder
{
    public function run(): void
    {
        // Main Navigation Menu
        $mainMenu = Menu::create([
            'menu_name' => 'Main Navigation',
            'menu_name_ar' => 'القائمة الرئيسية',
            'location' => 'header',
            'is_active' => true,
        ]);

        $mainMenuItems = [
            [
                'title' => 'Home',
                'title_ar' => 'الرئيسية',
                'url' => '/',
                'url_ar' => '/',
                'display_order' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'About Us',
                'title_ar' => 'من نحن',
                'url' => '/about',
                'url_ar' => '/about',
                'display_order' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'Services',
                'title_ar' => 'خدماتنا',
                'url' => '/services',
                'url_ar' => '/services',
                'display_order' => 3,
                'is_active' => true,
            ],
            [
                'title' => 'News',
                'title_ar' => 'الأخبار',
                'url' => '/news',
                'url_ar' => '/news',
                'display_order' => 4,
                'is_active' => true,
            ],
            [
                'title' => 'Contact',
                'title_ar' => 'اتصل بنا',
                'url' => '/contact',
                'url_ar' => '/contact',
                'display_order' => 5,
                'is_active' => true,
            ],
        ];

        foreach ($mainMenuItems as $item) {
            MenuItem::create([
                'menu_id' => $mainMenu->menu_id,
                ...$item
            ]);
        }

        // Footer Menu
        $footerMenu = Menu::create([
            'menu_name' => 'Footer Links',
            'menu_name_ar' => 'روابط التذييل',
            'location' => 'footer',
            'is_active' => true,
        ]);

        $footerMenuItems = [
            [
                'title' => 'Privacy Policy',
                'title_ar' => 'سياسة الخصوصية',
                'url' => '/privacy-policy',
                'url_ar' => '/privacy-policy',
                'display_order' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'Terms of Service',
                'title_ar' => 'شروط الاستخدام',
                'url' => '/terms',
                'url_ar' => '/terms',
                'display_order' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'FAQ',
                'title_ar' => 'الأسئلة الشائعة',
                'url' => '/faq',
                'url_ar' => '/faq',
                'display_order' => 3,
                'is_active' => true,
            ],
        ];

        foreach ($footerMenuItems as $item) {
            MenuItem::create([
                'menu_id' => $footerMenu->menu_id,
                ...$item
            ]);
        }
    }
} 