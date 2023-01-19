<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        // $this->call(JobSeeder::class);
        // $this->call(RoleSeeder::class);
        // $this->call(TicketTypeSeeder::class);
        // $this->call(TicketStatusSeeder::class);
        // $this->call(TicketEnvironmentSeeder::class);
        $this->call(AdminSeeder::class);
    }
}
