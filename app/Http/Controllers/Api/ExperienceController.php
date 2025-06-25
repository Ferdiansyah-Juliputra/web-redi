<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Experience;
use Illuminate\Http\Request;

class ExperienceController extends Controller
{
    public function index()
    {
        $experiences = Experience::with(['field', 'provinces', 'clients'])->latest()->paginate(12);
        return response()->json($experiences);
    }
        public function show(Experience $experience)
    {
        // Muat relasi yang dibutuhkan untuk halaman detail
        $experience->load(['field', 'clients', 'provinces']);
        
        return response()->json($experience);
    }
}
