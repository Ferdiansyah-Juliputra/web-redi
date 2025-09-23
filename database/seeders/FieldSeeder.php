<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Field;

class FieldSeeder extends Seeder
{
    public function run()
    {
        $fields = [
            'Economic Research',
            'Education Research',
            'Social Research',
            'Digital Finance Literacy',
            'Health Research',
        ];
        
        foreach ($fields as $name) {
            Field::create(['field' => $name]);
        }
    }
}
