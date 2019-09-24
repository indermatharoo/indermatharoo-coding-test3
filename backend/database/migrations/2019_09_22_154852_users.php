<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Users extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {

            $table->increments('id');
            
            $table->string('first_name');

            $table->string('last_name');

            $table->string('password');

            $table->string('email');

            $table->string('age');

            $table->string('api_key')->nullable();

            $table->text('address')->nullable();

            $table->enum('gender',['male','female','other']);

            $table->enum('blood_group',['a+','b+','ab+','o+','a-','b-','ab-','o-'])->nullable();

            $table->enum('services',['community-mental-health','residential-mental-health','housing-and-homelessness','sucide-prevention','intake-and-assesment','ndis-services','other'])->nullable();

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
        Schema::dropIfExists('users');
    }
}
