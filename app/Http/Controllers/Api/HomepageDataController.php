<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\Experience;
use App\Models\Project;
use App\Models\Field;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class HomepageDataController extends Controller
{
    public function __invoke()
    {
        // Data Statistik (tidak berubah)
        $stats = [
            'projects' => Project::count(),
            'clients'  => Client::count(),
            'fields'  => Field::count(),
        ];

        // Data Klien dan Experience (tidak berubah)
        $clients = Client::latest()->limit(10)->get();
        $experiences = Experience::latest()->with('clients:id,name')->take(6)->get();

        // =======================================================
        // PERBAIKAN ADA DI BAGIAN INI
        // =======================================================
        // Data untuk Line Chart: Jumlah proyek per tahun
        $projectsByYear = Project::select(
                'year', // Langsung pilih kolom 'year'
                DB::raw('count(*) as count')
            )
            ->groupBy('year')
            ->orderBy('year', 'asc')
            ->get();
            
        // Data untuk Pie Chart: Jumlah proyek per bidang (field)
        $projectsByField = Field::withCount('projects')
            ->get()
            ->map(function ($field) {
                return [
                    'field' => $field->field,
                    'value' => $field->projects_count,
                ];
            })
            ->filter(function ($field) {
                return $field['value'] > 0;
            });

        return response()->json([
            'stats'           => $stats,
            'clients'         => $clients,
            'experiences'     => $experiences,
            'projectsByYear'  => $projectsByYear,
            'projectsByField' => $projectsByField->values(),
        ]);
    }
}