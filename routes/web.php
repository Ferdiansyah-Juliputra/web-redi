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
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('gallery', GalleryController::class);
    Route::resource('experience', ExperienceController::class);
    Route::resource('client', ClientController::class);
    Route::resource('project', ProjectController::class);
    Route::resource('publication', PublicationController::class);
    Route::resource('field', FieldController::class);
    Route::resource('opportunity', OpportunityController::class);
});

// File rute tambahan
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';