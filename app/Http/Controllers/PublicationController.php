<?php

namespace App\Http\Controllers;

use App\Models\Publication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PublicationController extends Controller
{
    public function index()
    {
        $publications = Publication::latest()->paginate(10);
        return Inertia::render('publication/Index', ['publications' => $publications]);
    }

    public function create()
    {
        return Inertia::render('publication/Create');
    }

    public function store(Request $request)
    {
        // 1. Validasi disesuaikan dengan nama field di form
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'year' => 'required|numeric',
            'doi' => 'nullable|string|max:255',
            'file' => 'nullable|file|mimes:pdf|max:2048', // Diubah menjadi 'file'
        ]);

        $path = null;
        if ($request->hasFile('file')) {
            $path = $request->file('file')->store('publications', 'public');
        }

        Publication::create([
            'title' => $validated['title'],
            'year' => $validated['year'],
            'doi' => $validated['doi'],
            'file_path' => $path, // Diubah menjadi 'file_path' sesuai model
        ]);

        return redirect()->route('admin.publication.index')->with('success', 'Publication added successfully!');
    }

    public function edit(Publication $publication)
    {
        return Inertia::render('publication/Edit', ['publication' => $publication]);
    }
    
    public function update(Request $request, Publication $publication)
    {
        // 2. Validasi juga disesuaikan
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'year' => 'required|numeric',
            'doi' => 'nullable|string|max:255',
            'file' => 'nullable|file|mimes:pdf|max:2048', // Diubah menjadi 'file'
        ]);

        // 3. Logika update yang lebih aman
        $publication->title = $validated['title'];
        $publication->year = $validated['year'];
        $publication->doi = $validated['doi'];

        if ($request->hasFile('file')) {
            if ($publication->file_path) {
                Storage::disk('public')->delete($publication->file_path);
            }
            $publication->file_path = $request->file('file')->store('publications', 'public');
        }
        
        $publication->save();

        return redirect()->route('admin.publication.index')->with('success', 'Publication updated successfully');
    }

    public function destroy(Publication $publication)
    {
        if ($publication->file_path) {
            Storage::disk('public')->delete($publication->file_path);
        }
        $publication->delete();

        return redirect()->route('admin.publication.index')->with('success', 'Publication deleted successfully!');
    }
}