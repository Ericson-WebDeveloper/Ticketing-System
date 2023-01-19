<?php

namespace Database\Seeders;

use App\Models\Job;
use Illuminate\Database\Seeder;

class JobSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $names = ['Super Admin', 'Admin', 'Programmer', 'Q.A', 'Project Manager', 'AWS Administartor', 'Database Admin'];
        collect($names)->each(function($name) {
            Job::factory()->create(['name' => $name]);
        });
    }
}
