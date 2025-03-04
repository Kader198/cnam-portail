<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('content_versions', function (Blueprint $table) {
            $table->id('version_id');
            $table->foreignId('content_id')->constrained('content', 'content_id')->onDelete('cascade');
            $table->text('content_body');
            $table->text('content_body_ar');
            $table->string('title', 255);
            $table->string('title_ar', 255);
            $table->foreignId('author_id')->constrained('users')->onDelete('cascade');
            $table->string('change_summary', 255);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('content_versions');
    }
}; 