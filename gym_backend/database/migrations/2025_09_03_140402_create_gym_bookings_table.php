<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGymBookingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('gym_bookings', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email'); // ✅ New field for customer's email
            $table->string('phone'); // ✅ New field for customer's phone number
            $table->integer('age');
            $table->string('gender');
            $table->string('fitness_level');
            $table->json('goals');
            $table->text('medical_history')->nullable();
            $table->string('trainer_preference')->nullable();
            $table->string('workout_time');
            $table->string('membership_plan');
            $table->string('payment_amount'); // store 2000-10000 amount
            $table->string('payment_method'); // credit, debit, UPI, etc
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('gym_bookings');
    }
}
