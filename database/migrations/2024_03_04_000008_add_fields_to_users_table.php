<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('username', 50)->unique()->after('id');
            $table->string('first_name', 100)->after('password');
            $table->string('first_name_ar', 100)->after('first_name');
            $table->string('last_name', 100)->after('first_name_ar');
            $table->string('last_name_ar', 100)->after('last_name');
            $table->string('profile_image', 255)->nullable()->after('last_name_ar');
            $table->string('phone_number', 20)->nullable()->after('profile_image');
            $table->string('preferred_language', 10)->default('en')->after('phone_number');
            $table->boolean('is_active')->default(true)->after('preferred_language');
            $table->timestamp('last_login')->nullable()->after('is_active');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'username',
                'first_name',
                'first_name_ar',
                'last_name',
                'last_name_ar',
                'profile_image',
                'phone_number',
                'preferred_language',
                'is_active',
                'last_login'
            ]);
        });
    }
}; 