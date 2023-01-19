<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = array(
            ['name' => 'User', 'guard' => 'web'],
            ['name' => 'Admin', 'guard' => 'web'],
            ['name' => 'Super Admin', 'guard' => 'web']
        );

        foreach($roles as $role) {
            Role::create([
                'name' => $role['name'],
                'guard_name' => $role['guard'],
            ]);
        }
    }
}
