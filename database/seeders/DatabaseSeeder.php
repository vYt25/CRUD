<?php

namespace Database\Seeders;

use App\Models\Setting;
use App\Models\Shift;
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
        Setting::insert([
            "name" => "time_in",
            "before" => 5,
            "after" => 15
        ]);
        Setting::insert([
            "name" => "time_out",
            "before" => 15,
            "after" => 20
        ]);
        Shift::insert([
            'shift_id' => 'A',
            'shift_start' => '09:00:00',
            'shift_end' => '17:00:00'
        ]);
        Shift::insert([
            'shift_id' => 'B',
            'shift_start' => '10:00:00',
            'shift_end' => '18:00:00'
        ]);
        Shift::insert([
            'shift_id' => 'C',
            'shift_start' => '11:00:00',
            'shift_end' => '19:00:00'
        ]);
    }
}
