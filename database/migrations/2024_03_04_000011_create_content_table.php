<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('content', function (Blueprint $table) {
            $table->id('content_id');
            $table->string('title', 255);
            $table->string('title_ar', 255);
            $table->text('content_body');
            $table->text('content_body_ar');
            $table->string('content_type', 50);
            $table->foreignId('author_id')->constrained('users')->onDelete('cascade');
            $table->boolean('is_published')->default(false);
            $table->string('slug', 255)->unique();
            $table->string('slug_ar', 255)->unique();
            $table->string('featured_image', 255)->nullable();
            $table->text('meta_description')->nullable();
            $table->text('meta_description_ar')->nullable();
            $table->string('keywords', 255)->nullable();
            $table->string('keywords_ar', 255)->nullable();
            $table->string('language_code', 10)->default('en');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('content');
    }
}; 