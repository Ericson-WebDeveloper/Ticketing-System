<?php

namespace Database\Seeders;

use App\Models\TicketType;
use Illuminate\Database\Seeder;

class TicketTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = array(
            ['type_name' => 'INCIDENT'],
            ['type_name' => 'ACRF'],
            ['type_name' => 'REQUEST'],
            ['type_name' => 'MAINTENANCE'],
            ['type_name' => 'SMA'],
            ['type_name' => 'Other']
        );

        foreach($roles as $role) {
            TicketType::create([
                'type_name' => $role['type_name']
            ]);
        }
    }
}
