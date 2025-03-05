<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            LanguageSeeder::class,
            RoleSeeder::class,
            PermissionSeeder::class,
            CategorySeeder::class,
            SettingSeeder::class,
            UserSeeder::class,
            MediaSeeder::class,
            ContentSeeder::class,
            NewsSeeder::class,
            MenuSeeder::class,
            GlossarySeeder::class,
            
        ]);
    }
}
