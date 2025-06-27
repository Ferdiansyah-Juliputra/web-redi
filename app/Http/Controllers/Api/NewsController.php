<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    /**
     * Mengambil daftar semua berita dengan paginasi untuk halaman publik.
     */
    public function index(Request $request)
    {
        // 1. Mulai query builder
        $query = News::query();

        // 2. Cek jika ada permintaan untuk filter berdasarkan kategori
        if ($request->filled('category')) {
            // Validasi untuk keamanan
            $request->validate([
                'category' => 'in:Recruitment,Internship'
            ]);
            // Tambahkan kondisi 'where' untuk memfilter
            $query->where('category', $request->input('category'));
        }

        // Ambil semua berita yang sesuai filter, lalu kita proses statusnya
        $allNews = $query->latest()->get();

        // Filter di sisi collection untuk hanya mengambil yang statusnya 'OPEN'
        $openNews = $allNews->filter(function ($news) {
            return $news->effective_status === 'OPEN';
        });

        // Lakukan paginasi secara manual pada hasil filter
        $paginatedNews = new \Illuminate\Pagination\LengthAwarePaginator(
            $openNews->forPage(request()->page, 9),
            $openNews->count(),
            9,
            request()->page,
            ['path' => request()->url(), 'query' => $request->query()]
        );

        return response()->json($paginatedNews);
    }


    /**
     * Mengambil data untuk satu berita spesifik.
     */
    public function show(News $news)
    {
        // Cukup kembalikan model yang ditemukan.
        // Accessor 'effective_status' akan otomatis ditambahkan.
        return response()->json($news);
    }
}