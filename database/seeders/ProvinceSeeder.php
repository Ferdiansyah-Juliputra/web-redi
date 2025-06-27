<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Province;

class ProvinceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $provinces = [
            'Aceh',
            'Bali',
            'Banten',
            'Bengkulu',
            'Special Region of Yogyakarta',
            'Special Capital Region of Jakarta',
            'Gorontalo',
            'Jambi',
            'West Java',
            'Central Java',
            'East Java',
            'West Kalimantan',
            'South Kalimantan',
            'Central Kalimantan',
            'East Kalimantan',
            'North Kalimantan',
            'Bangka Belitung Islands',
            'Riau Islands',
            'Lampung',
            'Maluku',
            'North Maluku',
            'West Nusa Tenggara',
            'East Nusa Tenggara',
            'Papua',
            'West Papua',
            'Southwest Papua',
            'Highland Papua',
            'South Papua',
            'Central Papua',
            'Riau',
            'West Sulawesi',
            'South Sulawesi',
            'Central Sulawesi',
            'Southeast Sulawesi',
            'North Sulawesi',
            'West Sumatra',
            'South Sumatra',
            'North Sumatra'
        ];

        foreach ($provinces as $name) {
            Province::create(['name' => $name]);
        }
    }
}
