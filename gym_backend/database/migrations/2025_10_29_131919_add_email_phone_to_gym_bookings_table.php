<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddEmailPhoneToGymBookingsTable extends Migration
{
    public function up()
    {
        Schema::table('gym_bookings', function (Blueprint $table) {
            $table->string('email')->after('name')->nullable();
            $table->string('phone')->after('email')->nullable();
        });
    }

    public function down()
    {
        Schema::table('gym_bookings', function (Blueprint $table) {
            $table->dropColumn(['email', 'phone']);
        });
    }
}
