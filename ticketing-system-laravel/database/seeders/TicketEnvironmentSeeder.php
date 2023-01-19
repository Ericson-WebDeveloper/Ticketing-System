<?php

namespace Database\Seeders;

use App\Models\TicketEnvironment;
use Illuminate\Database\Seeder;

class TicketEnvironmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $envs = array(
            ['environment_name' => 'UAT'],
            ['environment_name' => 'DEVELOPMENT'],
            ['environment_name' => 'PRODUCTION']
        );

        foreach($envs as $env) {
            TicketEnvironment::create([
                'environment_name' => $env['environment_name']
            ]);
        }
    }
}
