<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('news', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->enum('category', ['Recruitment', 'Internship']);
            $table->enum('status', ['OPEN', 'CLOSE'])->default('OPEN');
            $table->string('instagram_link')->nullable();
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->json('requirements')->nullable();
            $table->timestamps();
        });
    }

    // ... (method down tidak berubah)
};