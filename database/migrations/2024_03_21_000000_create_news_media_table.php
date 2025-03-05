<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('news_media', function (Blueprint $table) {
            $table->id('news_media_id');
            $table->foreignId('news_id')->constrained('news', 'news_id')->onDelete('cascade');
            $table->foreignId('media_id')->constrained('media', 'media_id')->onDelete('cascade');
            $table->timestamps();
            
            $table->unique(['news_id', 'media_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('news_media');
    }
}; 