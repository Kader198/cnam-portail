<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('glossaries', function (Blueprint $table) {
            $table->id('glossary_id');
            $table->string('term');
            $table->string('term_ar');
            $table->text('definition');
            $table->text('definition_ar');
            $table->string('first_letter');
            $table->string('first_letter_ar');
            $table->integer('display_order')->default(0);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('glossaries');
    }
}; 