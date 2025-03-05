<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('news', function (Blueprint $table) {
            $table->id('news_id');
            $table->string('title');
            $table->string('title_ar');
            $table->text('content_body');
            $table->text('content_body_ar');
            $table->boolean('is_published')->default(false);
            $table->date('publication_date');
            $table->string('news_type')->default('general');
            $table->boolean('featured')->default(false);
            $table->foreignId('author_id')->constrained('users', 'id');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('news');
    }
}; 