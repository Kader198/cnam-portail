<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id('category_id');
            $table->string('name', 100);
            $table->string('name_ar', 100);
            $table->text('description')->nullable();
            $table->text('description_ar')->nullable();
            $table->foreignId('parent_category_id')->nullable()->constrained('categories', 'category_id')->onDelete('set null');
            $table->string('slug', 100)->unique();
            $table->string('slug_ar', 100)->unique();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
}; 