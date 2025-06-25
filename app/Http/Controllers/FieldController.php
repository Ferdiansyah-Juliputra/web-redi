<?php

namespace App\Http\Controllers;

use App\Models\Field;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class FieldController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $fields = Field::latest()->get();

        return Inertia::render('field/Index', [
            'fields' => $fields,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('field/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'field' => 'required|string|max:255',
        ]);

        Field::create($validated);
        return redirect()->route('admin.field.index')->with('message', [
            'type' => 'success',
            'text' => 'Field added successfully!',
        ]);
    }

    public function edit(Field $field)
    {
        return Inertia::render('field/Edit', [
            'field' => $field,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Field $field)
    {
        $validated = $request->validate([
            'field' => 'required|string|max:255',
        ]);

        $field->update($validated);

        return redirect()->route('admin.field.index')->with('message', [
            'type' => 'success',
            'text' => 'Field updated successfully!',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Field $field)
    {
        $field->delete();

        return redirect()->route('field.index')->with('message', [
            'type' => 'success',
            'text' => 'Field deleted successfully!',
        ]);
    }
}
