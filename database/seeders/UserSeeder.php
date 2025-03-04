<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $roles = Role::all();

        if ($roles->isEmpty()) {
            $this->command->error('No roles found. Please run RoleSeeder first.');
            return;
        }

        // Create admin user
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
        ]);

        // Assign admin role to admin user
        $adminRole = $roles->where('role_name', 'Super Admin')->first();
        if ($adminRole) {
            $admin->roles()->attach($adminRole->role_id, ['assigned_at' => now()]);
        }

        // Create editor user
        $editor = User::create([
            'name' => 'Editor User',
            'email' => 'editor@example.com',
            'password' => Hash::make('password'),
        ]);

        // Assign editor role to editor user
        $editorRole = $roles->where('role_name', 'Editor')->first();
        if ($editorRole) {
            $editor->roles()->attach($editorRole->role_id, ['assigned_at' => now()]);
        }

        // Create regular user
        $user = User::create([
            'name' => 'Regular User',
            'email' => 'user@example.com',
            'password' => Hash::make('password'),
        ]);

        // Assign user role to regular user
        $userRole = $roles->where('role_name', 'User')->first();
        if ($userRole) {
            $user->roles()->attach($userRole->role_id, ['assigned_at' => now()]);
        }

        // Create additional random users
        $additionalUsers = 5;
        for ($i = 0; $i < $additionalUsers; $i++) {
            $randomUser = User::create([
                'name' => 'User ' . ($i + 1),
                'email' => 'user' . ($i + 1) . '@example.com',
                'password' => Hash::make('password'),
            ]);

            // Randomly assign a role
            $randomRole = $roles->random();
            $randomUser->roles()->attach($randomRole->role_id, ['assigned_at' => now()]);
        }
    }
} 