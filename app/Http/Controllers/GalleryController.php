<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Gallery;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class GalleryController extends Controller
{
    public function index()
    {
        $galleries = Gallery::latest()->get();

        return Inertia::render('gallery/Index', [
            'galleries' => $galleries,
        ]);
    }

    public function create()
    {
        return Inertia::render('gallery/Create');
    }

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

        return redirect()->route('gallery.index')->with('success', 'Gallery created successfully.');
    }

    public function edit(Gallery $gallery)
    {
        return Inertia::render('gallery/Edit', [ // <-- sesuaikan nama file react-nya
            'gallery' => $gallery,
        ]);
    }

    public function update(Request $request, Gallery $gallery)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'year' => 'required|numeric',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,jpg,png|max:2048',
        ]);

        // Update image kalau ada file baru
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

        return redirect()->route('gallery.index')->with('success', 'Gallery updated successfully.');
    }

    public function destroy(Gallery $gallery)
    {
        if ($gallery->image_path) {
            Storage::disk('public')->delete($gallery->image_path);
        }

        $gallery->delete();

        return redirect()->route('gallery.index')->with('success', 'Gallery deleted successfully.');
    }
}
