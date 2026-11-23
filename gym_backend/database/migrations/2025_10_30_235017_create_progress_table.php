<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('progress', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('customer_id'); // <-- Add this
            $table->float('current_weight');
            $table->float('target_weight');
            $table->float('height');
            $table->string('fitness_goal');
            $table->string('activity_level');
            $table->json('weekly_workouts'); // Store array as JSON
            $table->string('diet_preference')->nullable();
            $table->text('medical_conditions')->nullable();
            $table->timestamps();

            // Foreign key constraint
            $table->foreign('customer_id')
                  ->references('id')->on('customer_registers')
                  ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('progress');
    }
};
