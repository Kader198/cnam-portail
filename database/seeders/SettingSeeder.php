<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            [
                'setting_key' => 'site_name',
                'setting_value' => 'CNAM Portal',
                'setting_value_ar' => 'بوابة CNAM',
                'setting_group' => 'general',
                'is_system' => true,
                'is_translatable' => true
            ],
            [
                'setting_key' => 'site_description',
                'setting_value' => 'Official portal of CNAM',
                'setting_value_ar' => 'البوابة الرسمية لـ CNAM',
                'setting_group' => 'general',
                'is_system' => true,
                'is_translatable' => true
            ],
            [
                'setting_key' => 'contact_email',
                'setting_value' => 'contact@cnam.gov.ma',
                'setting_value_ar' => 'contact@cnam.gov.ma',
                'setting_group' => 'contact',
                'is_system' => true,
                'is_translatable' => false
            ],
            [
                'setting_key' => 'contact_phone',
                'setting_value' => '+212 123-456-789',
                'setting_value_ar' => '+212 123-456-789',
                'setting_group' => 'contact',
                'is_system' => true,
                'is_translatable' => false
            ],
            [
                'setting_key' => 'address',
                'setting_value' => '123 Main Street, City, Country',
                'setting_value_ar' => '123 الشارع الرئيسي، المدينة، البلد',
                'setting_group' => 'contact',
                'is_system' => true,
                'is_translatable' => true
            ],
            [
                'setting_key' => 'social_facebook',
                'setting_value' => 'https://facebook.com/cnam',
                'setting_value_ar' => 'https://facebook.com/cnam',
                'setting_group' => 'social',
                'is_system' => true,
                'is_translatable' => false
            ],
            [
                'setting_key' => 'social_twitter',
                'setting_value' => 'https://twitter.com/cnam',
                'setting_value_ar' => 'https://twitter.com/cnam',
                'setting_group' => 'social',
                'is_system' => true,
                'is_translatable' => false
            ],
            [
                'setting_key' => 'maintenance_mode',
                'setting_value' => 'false',
                'setting_value_ar' => 'false',
                'setting_group' => 'system',
                'is_system' => true,
                'is_translatable' => false
            ]
        ];

        foreach ($settings as $setting) {
            Setting::create($setting);
        }
    }
} 