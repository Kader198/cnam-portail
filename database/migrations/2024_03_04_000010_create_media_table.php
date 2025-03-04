<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('media', function (Blueprint $table) {
            $table->id('media_id');
            $table->string('file_name', 255);
            $table->string('file_path', 255);
            $table->string('media_type', 50);
            $table->foreignId('uploaded_by')->constrained('users')->onDelete('cascade');
            $table->timestamp('upload_date');
            $table->string('alt_text', 255)->nullable();
            $table->string('alt_text_ar', 255)->nullable();
            $table->string('title', 255)->nullable();
            $table->string('title_ar', 255)->nullable();
            $table->text('description')->nullable();
            $table->text('description_ar')->nullable();
            $table->unsignedBigInteger('file_size');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('media');
    }
}; 