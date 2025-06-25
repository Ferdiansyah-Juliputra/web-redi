<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Publication;
use Illuminate\Http\Request;

class PublicationController extends Controller
{
    /**
     * Mengambil daftar semua publikasi dengan paginasi.
     */
    public function index()
    {
        $publications = Publication::latest()->paginate(15);
        return response()->json($publications);
    }

    /**
     * TAMBAHKAN METHOD BARU INI
     * Mengambil data untuk satu publikasi spesifik.
     */
    public function show(Publication $publication)
    {
        // Cukup kembalikan model yang ditemukan.
        // Accessor 'file_url' akan otomatis ditambahkan.
        return response()->json($publication);
    }
}