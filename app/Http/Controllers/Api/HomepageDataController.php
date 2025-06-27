<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\Experience;
use App\Models\Project;
use App\Models\Field;
use App\Models\News; // 1. Jangan lupa import model News
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

        // Data Klien (tidak berubah)
        $clients = Client::latest()->limit(10)->get();

        // Data Experience untuk sidebar pratinjau
        $experiences = Experience::latest()->take(6)->get();

        // Data Chart (tidak berubah)
        $projectsByYear = Project::select('year', DB::raw('count(*) as count'))
            ->groupBy('year')
            ->orderBy('year', 'asc')
            ->get();
            
        $projectsByField = Field::withCount('projects')
            ->get()
            ->map(function ($field) {
                return ['name' => $field->field, 'value' => $field->projects_count];
            })
            ->filter(function ($field) {
                return $field['value'] > 0;
            });

        // =======================================================
        // DATA BARU UNTUK BANNER IKLAN
        // =======================================================
        // Ambil semua berita, model accessor akan menghitung 'effective_status'
        $allNews = News::latest()->get();

        // Filter di sisi collection untuk hanya mengambil yang statusnya 'OPEN'
        $openPositions = $allNews->filter(function ($news) {
            return $news->effective_status === 'OPEN';
        })->take(2); // Ambil 2 teratas untuk ditampilkan di banner


        // =======================================================
        // Mengembalikan semua data, termasuk data iklan
        // =======================================================
        return response()->json([
            'stats'           => $stats,
            'clients'         => $clients,
            'experiences'     => $experiences, // Pastikan ini juga dikirim untuk sidebar
            'projectsByYear'  => $projectsByYear,
            'projectsByField' => $projectsByField->values(),
            'openPositions'   => $openPositions->values(), // <-- Kirim data iklan
        ]);
    }
}