<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    /**
     * Mengambil daftar proyek dengan paginasi dan filter opsional.
     */
    public function index(Request $request)
    {
        $query = Project::query();

        // Filter berdasarkan client_id jika ada
        if ($request->filled('client_id')) {
            $clientId = $request->input('client_id');
            $query->whereHas('clients', function ($q) use ($clientId) {
                $q->where('client_id', $clientId);
            });
        }

        // Filter berdasarkan tahun jika ada
        if ($request->filled('year')) {
            $query->where('year', $request->input('year'));
        }

        // Ambil data dengan paginasi dan relasi klien
        $projects = $query->with('clients:id,name')->latest()->paginate(9);

        return response()->json([
            'projects' => $projects,
        ]);
    }

    /**
     * Menyediakan data untuk mengisi dropdown filter.
     */
    public function getFilterOptions()
    {
        // Ambil semua tahun unik dari proyek, urutkan dari terbaru
        $years = Project::select('year')->distinct()->orderBy('year', 'desc')->pluck('year');

        // Ambil semua klien, urutkan berdasarkan nama
        $clients = Client::orderBy('name', 'asc')->get(['id', 'name']);

        return response()->json([
            'years' => $years,
            'clients' => $clients,
        ]);
    }
}