<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Gallery;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class GalleryController extends Controller
{
    /**
     * Menampilkan daftar galeri dengan paginasi.
     */
    public function index()
    {
        // UBAH BARIS INI: Ganti get() dengan paginate()
        // Ini akan secara otomatis membatasi data menjadi 12 per halaman
        // dan mengirimkan semua data paginasi ke komponen Inertia.
        $galleries = Gallery::latest()->paginate(12);

        return Inertia::render('gallery/Index', [
            'galleries' => $galleries,
        ]);
    }

    /**
     * Menampilkan form untuk membuat galeri baru.
     */
    public function create()
    {
        return Inertia::render('gallery/Create');
    }

    /**
     * Menyimpan galeri baru ke database.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'year' => 'required|numeric',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,jpg,png|max:2048',
        ]);

        $path = null;
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('gallery', 'public');
        }

        $gallery = Gallery::create([
            'title' => $validated['title'],
            'year' => $validated['year'],
            'description' => $validated['description'],
            'image_path' => $path,
        ]);

        Log::info('Album berhasil ditambahkan:', $gallery->toArray());

        return redirect()->route('admin.gallery.index')->with('success', 'Gallery created successfully.');
    }

    /**
     * Menampilkan form untuk mengedit galeri.
     */
    public function edit(Gallery $gallery)
    {
        return Inertia::render('gallery/Edit', [
            'gallery' => $gallery,
        ]);
    }

    /**
     * Memperbarui galeri yang ada di database.
     */
    public function update(Request $request, Gallery $gallery)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'year' => 'required|numeric',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,jpg,png|max:2048',
        ]);

        if ($request->hasFile('image')) {
            if ($gallery->image_path) {
                Storage::disk('public')->delete($gallery->image_path);
            }
            $gallery->image_path = $request->file('image')->store('gallery', 'public');
        }

        $gallery->update([
            'title' => $validated['title'],
            'year' => $validated['year'],
            'description' => $validated['description'],
            'image_path' => $gallery->image_path,
        ]);

        return redirect()->route('admin.gallery.index')->with('success', 'Gallery updated successfully.');
    }

    /**
     * Menghapus galeri dari database.
     */
    public function destroy(Gallery $gallery)
    {
        if ($gallery->image_path) {
            Storage::disk('public')->delete($gallery->image_path);
        }

        $gallery->delete();

        return redirect()->route('admin.gallery.index')->with('success', 'Gallery deleted successfully.');
    }
}