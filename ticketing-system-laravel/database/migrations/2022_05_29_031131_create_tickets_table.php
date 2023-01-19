<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTicketsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users'); // created_by
            $table->string('ticket_name');
            $table->string('control_no');
            $table->string('description');
            $table->longText('root_cause')->nullable();
            $table->longText('solution')->nullable();
            $table->longText('remarks')->nullable();
            $table->unsignedBigInteger('programmer_id')->nullable();
            $table->unsignedBigInteger('qa_id')->nullable();
            $table->unsignedBigInteger('owner_id')->nullable();
            // $table->unsignedBigInteger('created_id')->nullable();
            $table->timestamps();

            $table->foreign('programmer_id')->references('id')->on('users');
            $table->foreign('qa_id')->references('id')->on('users');
            $table->foreign('owner_id')->references('id')->on('users');
            // $table->foreign('created_id')->references('id')->on('users');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tickets');
    }
}
