<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('resumes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('file_name');
            $table->string('original_name');
            $table->string('file_path');
            $table->unsignedInteger('file_size');
            $table->string('mime_type');
            $table->unsignedTinyInteger('overall_score')->nullable();
            $table->unsignedTinyInteger('ats_score')->nullable();
            $table->unsignedTinyInteger('keyword_score')->nullable();
            $table->unsignedTinyInteger('formatting_score')->nullable();
            $table->unsignedTinyInteger('content_score')->nullable();
            $table->json('keywords_found')->nullable();
            $table->json('keywords_missing')->nullable();
            $table->json('suggestions')->nullable();
            $table->longText('parsed_content')->nullable();
            $table->enum('status', ['pending', 'analyzing', 'completed', 'failed'])->default('pending');
            $table->timestamp('analyzed_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('resumes');
    }
};
