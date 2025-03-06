<?php

namespace Database\Seeders;

use App\Models\Menu;
use App\Models\MenuItem;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MenuSeeder extends Seeder
{
    public function run(): void
    {
        // Disable foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=0');

        // Delete all existing menus and menu items
        MenuItem::truncate();
        Menu::truncate();

        // Re-enable foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=1');

        // Main Navigation Menu
        $mainMenu = Menu::create([
            'menu_name' => 'Main Navigation',
            'menu_name_ar' => 'القائمة الرئيسية',
            'location' => 'header',
            'is_active' => true,
        ]);

        $mainMenuItems = [
            [
                'title' => 'Accueil',
                'title_ar' => 'الرئيسية',
                'url' => '/',
                'url_ar' => '/',
                'display_order' => 1,
                'is_active' => true,
                'icon' => 'Home',
            ],
            [
                'title' => 'Assurés',
                'title_ar' => 'المؤمن لهم',
                'url' => '/assures',
                'url_ar' => '/assures',
                'display_order' => 2,
                'is_active' => true,
                'icon' => 'Users',
                'children' => [
                    [
                        'title' => 'Droits et obligations',
                        'title_ar' => 'الحقوق والواجبات',
                        'url' => '/assures/droits-obligations',
                        'url_ar' => '/assures/droits-obligations',
                        'display_order' => 1,
                        'is_active' => true,
                        'icon' => 'FileText',
                    ],
                    [
                        'title' => 'Procédures',
                        'title_ar' => 'الإجراءات',
                        'url' => '/assures/procedures',
                        'url_ar' => '/assures/procedures',
                        'display_order' => 2,
                        'is_active' => true,
                        'icon' => 'FileText',
                    ],
                    [
                        'title' => 'Remboursements',
                        'title_ar' => 'المبالغ المستردة',
                        'url' => '/assures/remboursements',
                        'url_ar' => '/assures/remboursements',
                        'display_order' => 3,
                        'is_active' => true,
                        'icon' => 'FileText',
                    ],
                ],
            ],
            [
                'title' => 'Prestataires',
                'title_ar' => 'مقدمي الخدمات',
                'url' => '/prestataires',
                'url_ar' => '/prestataires',
                'display_order' => 3,
                'is_active' => true,
                'children' => [
                    [
                        'title' => 'Convention',
                        'title_ar' => 'الاتفاقية',
                        'url' => '/prestataires/convention',
                        'url_ar' => '/prestataires/convention',
                        'display_order' => 1,
                        'is_active' => true,
                        'icon' => 'FileText',
                    ],
                    [
                        'title' => 'Facturation',
                        'title_ar' => 'الفواتير',
                        'url' => '/prestataires/facturation',
                        'url_ar' => '/prestataires/facturation',
                        'display_order' => 2,
                        'is_active' => true,
                        'icon' => 'FileText',
                    ],
                    [
                        'title' => 'Agrément',
                        'title_ar' => 'الترخيص',
                        'url' => '/prestataires/agrement',
                        'url_ar' => '/prestataires/agrement',
                        'display_order' => 3,
                        'is_active' => true,
                        'icon' => 'FileText',
                    ],
                ],
            ],
            [
                'title' => 'Employeurs',
                'title_ar' => 'أصحاب العمل',
                'url' => '/employeurs',
                'url_ar' => '/employeurs',
                'display_order' => 4,
                'is_active' => true,
                'children' => [
                    [
                        'title' => 'Affiliation',
                        'title_ar' => 'الانضمام',
                        'url' => '/employeurs/affiliation',
                        'url_ar' => '/employeurs/affiliation',
                        'display_order' => 1,
                        'is_active' => true,
                        'icon' => 'FileText',
                    ],
                    [
                        'title' => 'Cotisations',
                        'title_ar' => 'المساهمات',
                        'url' => '/employeurs/cotisations',
                        'url_ar' => '/employeurs/cotisations',
                        'display_order' => 2,
                        'is_active' => true,
                        'icon' => 'FileText',
                    ],
                    [
                        'title' => 'Déclarations',
                        'title_ar' => 'التصريحات',
                        'url' => '/employeurs/declarations',
                        'url_ar' => '/employeurs/declarations',
                        'display_order' => 3,
                        'is_active' => true,
                        'icon' => 'FileText',
                        ],
                ],
            ],
            [
                'title' => 'Actualités',
                'title_ar' => 'الأخبار',
                'url' => '/actualites',
                'url_ar' => '/actualites',
                'display_order' => 5,
                'is_active' => true,
                'icon' => 'FileText',
            ],
            [
                'title' => 'Documentation',
                'title_ar' => 'التوثيق',
                'url' => '/documentation',
                'url_ar' => '/documentation',
                'display_order' => 6,
                'is_active' => true,
                'icon' => 'FileText',
            ],
            [
                'title' => 'Avis et Annonces',
                'title_ar' => 'الإعلانات والإشعارات',
                'url' => '/avis-annonces',
                'url_ar' => '/avis-annonces',
                'display_order' => 7,
                'is_active' => true,
                'icon' => 'FileText',
            ],
            [
                'title' => 'Connexion',
                'title_ar' => 'تسجيل الدخول',
                'url' => '/login',
                'url_ar' => '/login',
                'display_order' => 8,
                'is_active' => true,
                'icon' => 'LogIn',
            ],
            [
                'title' => 'Inscription',
                'title_ar' => 'التسجيل',
                'url' => '/register',
                'url_ar' => '/register',
                'display_order' => 9,
                'is_active' => true,
                'icon' => 'UserPlus',
            ],
        ];

        foreach ($mainMenuItems as $item) {
            $children = $item['children'] ?? [];
            unset($item['children']);

            $menuItem = MenuItem::create([
                'menu_id' => $mainMenu->menu_id,
                ...$item
            ]);

            if (!empty($children)) {
                foreach ($children as $child) {
                    MenuItem::create([
                        'menu_id' => $mainMenu->menu_id,
                        'parent_id' => $menuItem->menu_item_id,
                        'title' => $child['title'],
                        'title_ar' => $child['title_ar'],
                        'url' => $child['url'],
                        'url_ar' => $child['url_ar'],
                        'display_order' => $child['display_order'],
                        'is_active' => $child['is_active'],
                        'icon' => $child['icon'],
                    ]);
                }
            }
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