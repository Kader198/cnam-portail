<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('news', function (Blueprint $table) {
            // Add missing fields
            $table->string('slug')->after('content_body_ar');
            $table->string('slug_ar')->after('slug');
            $table->string('featured_image')->nullable()->after('slug_ar');
            $table->text('meta_description')->nullable()->after('featured_image');
            $table->text('meta_description_ar')->nullable()->after('meta_description');
            $table->string('keywords')->nullable()->after('meta_description_ar');
            $table->string('keywords_ar')->nullable()->after('keywords');
            $table->string('language_code')->default('en')->after('keywords_ar');
        });

        // Drop content_id column if it exists
        if (Schema::hasColumn('news', 'content_id')) {
            Schema::table('news', function (Blueprint $table) {
                $table->dropColumn('content_id');
            });
        }
    }

    public function down(): void
    {
        Schema::table('news', function (Blueprint $table) {
            // Add back content_id
            $table->foreignId('content_id')->after('news_id')->constrained('content', 'content_id');
            
            // Remove the added fields
            $table->dropColumn([
                'slug',
                'slug_ar',
                'featured_image',
                'meta_description',
                'meta_description_ar',
                'keywords',
                'keywords_ar',
                'language_code'
            ]);
        });
    }
}; 