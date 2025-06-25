<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\Experience;
use App\Models\Project;
use App\Models\Field;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class HomepageDataController extends Controller
{
    /**
     * Controller ini hanya memiliki satu tugas: menyediakan semua data
     * yang dibutuhkan untuk halaman utama publik dalam format JSON.
     * Menggunakan __invoke adalah praktik terbaik untuk controller satu aksi.
     */
    public function __invoke()
    {
        // 1. Menghitung data Statistik
        $stats = [
            'projects' => Project::count(),
            'clients'  => Client::count(),
            'fields'  => Field::count(), // Ganti dengan logika Anda jika ada, misal: Field::count()
        ];

        // 2. Mengambil data Klien
        // Ambil semua klien, ubah path gambar menjadi URL lengkap
        $clients = Client::latest()->get()->map(function ($client) {
            $client->image_url = $client->image_path ? Storage::url($client->image_path) : null;
            return $client;
        });

        // 3. Mengambil data Experience untuk pratinjau (misal: 6 terbaru)
        $experiences = Experience::latest()->take(6)->get()->map(function ($experience) {
            // Asumsi model Experience juga punya 'image_path'
            $experience->image_url = $experience->image_path ? Storage::url($experience->image_path) : null;
            return $experience;
        });

        // 4. Mengembalikan semua data dalam satu respons JSON
        return response()->json([
            'stats'       => $stats,
            'clients'     => $clients,
            'experiences' => $experiences,
        ]);
    }
}