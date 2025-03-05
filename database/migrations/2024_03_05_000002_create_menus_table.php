<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('menus', function (Blueprint $table) {
            $table->id('menu_id');
            $table->string('menu_name');
            $table->string('menu_name_ar');
            $table->string('location');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('menu_items', function (Blueprint $table) {
            $table->id('menu_item_id');
            $table->foreignId('menu_id')->constrained('menus', 'menu_id')->onDelete('cascade');
            $table->string('title');
            $table->string('title_ar');
            $table->string('url');
            $table->string('url_ar');
            $table->integer('display_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('menu_items');
        Schema::dropIfExists('menus');
    }
}; 