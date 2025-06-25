<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ClientController extends Controller
{
    /**
     * Mengambil semua data klien, diurutkan berdasarkan nama, untuk halaman publik.
     */
    public function index()
    {
        // Ambil klien dan urutkan berdasarkan nama (A-Z)
        $clients = Client::orderBy('name', 'asc')->get()->map(function ($client) {
            // Kita gunakan accessor yang sudah ada di model Client Anda
            // untuk mendapatkan URL gambar yang lengkap.
            return $client;
        });

        return response()->json($clients);
    }
}