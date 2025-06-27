<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NewsController extends Controller
{
    /**
     * Menampilkan daftar berita dengan paginasi.
     * Tidak perlu diubah, karena model News sudah otomatis menambahkan 'effective_status'.
     */
    public function index()
    {
        $news = News::latest()->paginate(10);
        return Inertia::render('news/Index', [
            'news' => $news
        ]);
    }

    /**
     * Menampilkan form untuk membuat berita baru.
     */
    public function create()
    {
        return Inertia::render('news/Create');
    }

    /**
     * Menyimpan berita baru ke database.
     */
    public function store(Request $request)
    {
        // 1. TAMBAHKAN VALIDASI UNTUK KOLOM TANGGAL
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|in:Recruitment,Internship',
            'status' => 'required|in:OPEN,CLOSE',
            'instagram_link' => 'nullable|url',
            'requirements' => 'nullable|array',
            'requirements.*' => 'nullable|string',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date', // Pastikan tanggal akhir tidak sebelum tanggal mulai
        ]);

        // Hapus requirements yang kosong
        if (isset($validated['requirements'])) {
            $validated['requirements'] = array_filter($validated['requirements']);
        }

        News::create($validated);

        return redirect()->route('admin.news.index')->with('success', 'News item created successfully.');
    }

    /**
     * Menampilkan form untuk mengedit berita.
     */
    public function edit(News $news)
    {
        return Inertia::render('news/Edit', [
            'news' => $news
        ]);
    }

    /**
     * Memperbarui berita yang ada di database.
     */
    public function update(Request $request, News $news)
    {
        // 2. TAMBAHKAN VALIDASI UNTUK KOLOM TANGGAL DI SINI JUGA
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|in:Recruitment,Internship',
            'status' => 'required|in:OPEN,CLOSE',
            'instagram_link' => 'nullable|url',
            'requirements' => 'nullable|array',
            'requirements.*' => 'nullable|string',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ]);
        
        if (isset($validated['requirements'])) {
            $validated['requirements'] = array_filter($validated['requirements']);
        }

        $news->update($validated);

        return redirect()->route('admin.news.index')->with('success', 'News item updated successfully.');
    }

    /**
     * Menghapus berita dari database.
     */
    public function destroy(News $news)
    {
        $news->delete();
        return redirect()->route('admin.news.index')->with('success', 'News item deleted successfully.');
    }
}