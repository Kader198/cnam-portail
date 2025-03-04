<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('content_media', function (Blueprint $table) {
            $table->id('content_media_id');
            $table->foreignId('content_id')->constrained('content', 'content_id')->onDelete('cascade');
            $table->foreignId('media_id')->constrained('media', 'media_id')->onDelete('cascade');
            $table->timestamps();
            
            $table->unique(['content_id', 'media_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('content_media');
    }
}; 