<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\Factories\Factory;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $faker = Factory::create();
        User::factory(50)
       ->create()
       ->each(function($u) {
           $u->detail()->create([
            'employee_no' =>  '###-###-####',
            'nickname' => 'sdasdas',
            'profile_img' => ''
           ]);
           $u->assignRole(1);
        });
        // ->each(function($u) {
            
        // });

        // $user = User::create([
        //     'name' => $this->faker->name(),
        //     'email' => $this->faker->unique()->safeEmail(),
        //     'email_verified_at' => now(),
        //     'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        //     'job_id' => 3
        // ]);

        // $user->detail()->create([
        //     // 'user_id' => $user->id,
        //     'employee_no' => $this->faker->numerify('###-###-####'),
        //     'nickname' => $this->faker->name(),
        //     'profile_img' => ''
        // ]);

        // $user->assignRole(1);
    }
}
