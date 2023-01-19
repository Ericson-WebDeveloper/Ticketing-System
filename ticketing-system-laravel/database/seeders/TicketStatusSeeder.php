<?php

namespace Database\Seeders;

use App\Models\TicketStatus;
use Illuminate\Database\Seeder;

class TicketStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $status = array(
            ['status_name' => 'open'],
            ['status_name' => 'in-progress'],
            ['status_name' => 'closed'],
            ['status_name' => 'pending other'],
            ['status_name' => 'work in progress'],
            ['status_name' => 'assigned'],
            ['status_name' => 'resolved'],
            ['status_name' => 'pending customer']
        );

        foreach($status as $sts) {
            TicketStatus::create([
                'status_name' => $sts['status_name']
            ]);
        }
    }
}
