<?php

namespace Database\Seeders;

use App\Models\Language;
use Illuminate\Database\Seeder;

class LanguageSeeder extends Seeder
{
    public function run(): void
    {
        $languages = [
            [
                'language_code' => 'en',
                'language_name' => 'English',
                'native_name' => 'English',
                'is_active' => true,
                'is_default' => true,
                'direction' => 'LTR'
            ],
            [
                'language_code' => 'ar',
                'language_name' => 'Arabic',
                'native_name' => 'العربية',
                'is_active' => true,
                'is_default' => false,
                'direction' => 'RTL'
            ]
        ];

        foreach ($languages as $language) {
            Language::create($language);
        }
    }
} 