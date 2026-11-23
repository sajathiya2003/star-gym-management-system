<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCustomerRegisterTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void()
     */
  public function up()
{
    Schema::create('customer_register', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->string('email')->unique();
        $table->string('phone')->nullable();
        $table->integer('age')->nullable();
        $table->string('gender')->nullable();
        $table->string('password');
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
        Schema::dropIfExists('customer_register');
    }
}
