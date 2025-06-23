<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Experience;
use App\Models\Field;
use App\Models\Province;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ExperienceController extends Controller
{
    public function index()
    {
        return Inertia::render('experience/Index', [
            'experiences' => Experience::with(['clients:id,name', 'field:id,field', 'provinces:id,name'])
                ->latest()
                ->get(),
            'clients' => Client::select('id', 'name')->get()->map(fn($c) => ['value' => $c->id, 'label' => $c->name]),
            'fields' => Field::select('id', 'field')->get()->map(fn($f) => ['value' => $f->id, 'label' => $f->field]),
            'provinces' => Province::select('id', 'name')->orderBy('name')->get()->map(fn($p) => ['value' => $p->id, 'label' => $p->name]),
        ]);
    }


    public function create()
    {
        return Inertia::render('experience/Create', [
            'clients' => Client::select('id', 'name')->get()->map(fn($c) => ['value' => $c->id, 'label' => $c->name]),
            'fields' => Field::select('id', 'field')->get()->map(fn($f) => ['value' => $f->id, 'label' => $f->field]),
            'provinces' => Province::select('id', 'name')->orderBy('name')->get()->map(fn($p) => ['value' => $p->id, 'label' => $p->name]),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'field_id' => 'required|exists:fields,id',
            'client_ids' => 'nullable|array',
            'client_ids.*' => 'exists:clients,id',
            'province_ids' => 'nullable|array',
            'province_ids.*' => 'exists:provinces,id',
            'image' => 'nullable|image|mimes:jpeg,png|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $validated['image_path'] = $request->file('image')->store('experiences', 'public');
        }

        $experience = Experience::create($validated);

        $experience->clients()->sync($request->input('client_ids', []));
        $experience->provinces()->sync($request->input('province_ids', []));

        return redirect()->route('experience.index')->with('message', [
            'type' => 'success',
            'text' => 'Experience added successfully!',
        ]);
    }

    public function edit(Experience $experience)
    {
        return Inertia::render('experience/Edit', [
            'experience' => $experience->load(['clients:id,name', 'field:id,field', 'provinces:id,name']),
            'clients' => Client::select('id', 'name')->get()->map(fn($c) => ['value' => $c->id, 'label' => $c->name]),
            'fields' => Field::select('id', 'field')->get()->map(fn($f) => ['value' => $f->id, 'label' => $f->field]),
            'provinces' => Province::select('id', 'name')->orderBy('name')->get()->map(fn($p) => ['value' => $p->id, 'label' => $p->name]),
        ]);
    }

    public function update(Request $request, Experience $experience)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'field_id' => 'required|exists:fields,id',
            'client_ids' => 'nullable|array',
            'client_ids.*' => 'exists:clients,id',
            'province_ids' => 'nullable|array',
            'province_ids.*' => 'exists:provinces,id',
            'image' => 'nullable|image|mimes:jpeg,png|max:2048',
        ]);

        if ($request->hasFile('image')) {
            if ($experience->image_path) {
                Storage::disk('public')->delete($experience->image_path);
            }
            $validated['image_path'] = $request->file('image')->store('experiences', 'public');
        }

        $experience->update($validated);
        $experience->clients()->sync($request->input('client_ids', []));
        $experience->provinces()->sync($request->input('province_ids', []));

        return redirect()->route('experience.index')->with('message', [
            'type' => 'success',
            'text' => 'Experience updated successfully!',
        ]);
    }

    public function destroy(Experience $experience)
    {
        if ($experience->image_path) {
            Storage::disk('public')->delete($experience->image_path);
        }

        $experience->clients()->detach();
        $experience->provinces()->detach();
        $experience->delete();

        return redirect()->route('experience.index')->with('message', [
            'type' => 'success',
            'text' => 'Experience deleted successfully!',
        ]);
    }
}
