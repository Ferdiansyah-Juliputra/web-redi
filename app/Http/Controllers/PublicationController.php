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
        $publication = Publication::latest()->get();
        return Inertia::render('publication/Index', [
            'publications' => $publication,
        ]);
    }

    public function create()
    {
        return Inertia::render('publication/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'year' => 'required|integer',
            'doi' => 'nullable|string|max:255',
            'file' => 'nullable|file|mimes:pdf|max:5120', // Max 5MB
        ]);

        if ($request->hasFile('file')) {
            $validated['file_path'] = $request->file('file')->store('publications', 'public');
        }

        Publication::create($validated);

        return redirect()->route('admin.publication.index')->with('message', [
            'type' => 'success',
            'text' => 'Publication added successfully!',
        ]);
    }

    public function edit(Publication $publication)
    {
        return Inertia::render('publication/Edit', [
            'publication' => $publication,
        ]);
    }

    public function update(Request $request, Publication $publication)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'year' => 'required|integer',
            'doi' => 'nullable|string|max:255',
            'file' => 'nullable|file|mimes:pdf|max:5120',
        ]);

        if ($request->hasFile('file')) {
            if ($publication->file_path) {
                Storage::disk('public')->delete($publication->file_path);
            }
            $validated['file_path'] = $request->file('file')->store('publications', 'public');
        }

        $publication->update($validated);

        return redirect()->route('admin.publication.index')->with('message', [
            'type' => 'success',
            'text' => 'Publication updated successfully!',
        ]);
    }

    public function destroy(Publication $publication)
    {
        if ($publication->file_path) {
            Storage::disk('public')->delete($publication->file_path);
        }

        $publication->delete();

        return redirect()->route('admin.publication.index')->with('message', [
            'type' => 'success',
            'text' => 'Publication deleted.',
        ]);
    }
}
