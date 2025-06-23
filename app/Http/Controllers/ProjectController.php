<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Field;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        return Inertia::render('project/Index', [
            'projects' => Project::with(['clients', 'field'])->latest()->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('project/Create', [
            'clients' => Client::select('id', 'name')->get(),
            'fields' => Field::select('id', 'field')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'year' => 'required|integer|min:2000|max:' . now()->year,
            'field_id' => 'required|exists:fields,id',
            'client_ids' => 'nullable|array',
            'client_ids.*' => 'exists:clients,id',
        ]);

        $project = Project::create([
            'name' => $validated['name'],
            'year' => $validated['year'],
            'field_id' => $validated['field_id'],
        ]);

        if (!empty($validated['client_ids'])) {
            $project->clients()->sync($validated['client_ids']);
        }

        return redirect()->route('project.index')->with('message', [
            'type' => 'success',
            'text' => 'Project added successfully!',
        ]);
    }

    public function edit(Project $project)
    {
        $project->load(['clients', 'field']);

        return Inertia::render('project/Edit', [
            'project' => $project,
            'clients' => Client::select('id', 'name')->get(),
            'fields' => Field::select('id', 'field')->get(),
        ]);
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'year' => 'required|integer|min:2000|max:' . now()->year,
            'field_id' => 'required|exists:fields,id',
            'client_ids' => 'nullable|array',
            'client_ids.*' => 'exists:clients,id',
        ]);

        $project->update([
            'name' => $validated['name'],
            'year' => $validated['year'],
            'field_id' => $validated['field_id'],
        ]);

        $project->clients()->sync($validated['client_ids'] ?? []);

        return redirect()->route('project.index')->with('message', [
            'type' => 'success',
            'text' => 'Project updated successfully!',
        ]);
    }

    public function destroy(Project $project)
    {
        $project->clients()->detach(); // penting: bersihkan pivot table
        $project->delete();

        return redirect()->route('project.index')->with('message', [
            'type' => 'success',
            'text' => 'Project deleted.',
        ]);
    }
}
