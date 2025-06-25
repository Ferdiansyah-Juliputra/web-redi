<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Experience;
use App\Models\Project;
use App\Models\Field;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class HomepageController extends Controller
{
    /**
     * Menampilkan halaman utama untuk admin panel (jika diperlukan)
     * atau untuk disajikan sebagai halaman publik dengan Inertia.
     */
    public function index()
    {
        // 1. Mengambil data Klien
        $clients = Client::latest()->get()->map(function ($client) {
            $client->image_url = $client->image_path ? Storage::url($client->image_path) : null;
            return $client;
        });

        // 2. Mengambil data Experience
        $experiences = Experience::latest()->take(6)->get()->map(function ($experience) {
            $experience->image_url = $experience->image_path ? Storage::url($experience->image_path) : null;
            return $experience;
        });

        // 3. Menghitung data Statistik
        $stats = [
            'projects' => Project::count(),
            'clients'  => Client::count(),
            'fields'  => Field::count(),
        ];

        // 4. Mengirim semua data ke komponen React via Inertia
        return Inertia::render('homepage/HomePage', [
            'clients'     => $clients,
            'experiences' => $experiences,
            'stats'       => $stats,
        ]);
    }

    /**
     * Menyediakan data mentah dalam format JSON untuk aplikasi publik.
     */
    public function getDataForApi()
    {
        // =======================================================
        // KITA SALIN LOGIKA PENGAMBILAN DATA DARI FUNGSI index() KE SINI
        // =======================================================

        // 1. Mengambil data Klien
        $clients = Client::latest()->get()->map(function ($client) {
            $client->image_url = $client->image_path ? Storage::url($client->image_path) : null;
            return $client;
        });

        // 2. Mengambil data Experience
        $experiences = Experience::latest()->take(6)->get()->map(function ($experience) {
            $experience->image_url = $experience->image_path ? Storage::url($experience->image_path) : null;
            return $experience;
        });

        // 3. Menghitung data Statistik
        $stats = [
            'projects' => Project::count(),
            'clients'  => Client::count(),
            'fields'  => Field::count(),
        ];

        // 4. Setelah semua "bahan" siap, baru kita bisa sajikan sebagai JSON
        return response()->json([
            'stats'       => $stats,
            'clients'     => $clients,
            'experiences' => $experiences,
        ]);
    }
    public function about()
    {
        // Tugasnya hanya me-render komponen React 'About/Index.tsx'
        // Kita tidak perlu mengirim data apa pun untuk saat ini.
        return Inertia::render('about/AboutUsPage');
    }
}