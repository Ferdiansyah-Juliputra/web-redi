<?php

// Saran: Kelompokkan use statement agar lebih rapi
use App\Http\Controllers\{
    DashboardController,
    ExperienceController,
    GalleryController,
    ClientController,
    ProjectController,
    PublicationController,
    FieldController,
    OpportunityController
};
use App\Http\Controllers\HomepageController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// RUTE SPESIFIK DITARUH DI ATAS
Route::get('/admin', function() {
    return Inertia::render('welcome');
})->name('admin');

// GRUP RUTE ADMIN PANEL
Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('gallery', GalleryController::class);
    Route::resource('experience', ExperienceController::class);
    Route::resource('client', ClientController::class);
    Route::resource('project', ProjectController::class);
    Route::resource('publication', PublicationController::class);
    Route::resource('field', FieldController::class);
    Route::resource('opportunity', OpportunityController::class);
});

// FILE RUTE UNTUK LOGIN, DLL.
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

// RUTE CATCH-ALL UNTUK APLIKASI PUBLIK (HARUS DI PALING BAWAH)
Route::get('/{any}', function () {
    return view('public');
})->where('any', '.*');