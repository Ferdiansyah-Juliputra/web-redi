<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Experience;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class HomepageController extends Controller
{
    public function index()
    {
        // 1. Mengambil data Klien
        // Kita ambil semua klien dan transformasikan path gambarnya agar bisa diakses publik
        $clients = Client::latest()->get()->map(function ($client) {
            // Ini akan mengubah 'clients/logo.png' menjadi 'http://.../storage/clients/logo.png'
            $client->image_url = Storage::url($client->image_path); 
            return $client;
        });

        // 2. Mengambil data Experience untuk pratinjau (misal: 6 terbaru)
        $experiences = Experience::latest()->take(6)->get()->map(function ($experience) {
            $experience->image_url = Storage::url($experience->image_path); // Asumsi experience juga punya image_path
            return $experience;
        });

        // 3. Menghitung data Statistik
        $stats = [
            'projects' => Project::count(),
            'clients'  => Client::count(),
            'focuses'  => 4, // Ganti dengan logika Anda jika ada
        ];

        // 4. Mengirim semua data ke komponen React via Inertia
        return Inertia::render('homepage/HomePage', [
            'clients'     => $clients,
            'experiences' => $experiences,
            'stats'       => $stats,
        ]);
    }
}