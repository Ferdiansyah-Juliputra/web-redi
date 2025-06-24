<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $clients = Client::latest()->get();
        return Inertia::render('client/Index', [
            'clients' => $clients,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('client/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $validated['image_path'] = $request->file('image')->store('clients', 'public');
        }

        Client::create($validated);

        return redirect()->route('admin.client.index')->with('message', [
            'type'=>'success',
            'text'=>'Client added successfully!',
        ]);
    }

    public function edit(Client $client)
    {
        return Inertia::render('client/Edit', [
            'client' => $client,
        ]);
    }
    
    public function update(Request $request, Client $client)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,svg|max:2048',
        ]);

        if ($request->hasFile('image')) {
            if ($client->image_path) {
                storage::disk('public')->delete($client->image_path);
            }
            $validated['image_path'] = $request->file('image')->store('clients', 'public');
        }

        $client->update($validated);

        return redirect()->route('admin.client.index')->with('message', [
            'type'=>'success',
            'text'=>'Client updated succesfully',
        ]);
    }

    public function destroy(Client $client)
    {
        if ($client->image_path) {
            storage::disk('public')->delete($client->image_path);
        }
        $client->delete();

        return redirect()->route('admin.client.index')->with('message', [
            'type'=>'success',
            'text'=>'Client deleted successfully!',
        ]);
    }
}
