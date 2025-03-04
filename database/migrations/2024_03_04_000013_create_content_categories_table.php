<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('content_categories', function (Blueprint $table) {
            $table->id('content_category_id');
            $table->foreignId('content_id')->constrained('content', 'content_id')->onDelete('cascade');
            $table->foreignId('category_id')->constrained('categories', 'category_id')->onDelete('cascade');
            $table->timestamps();
            
            $table->unique(['content_id', 'category_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('content_categories');
    }
}; 