<?php

use App\Http\Controllers\Api\HomepageDataController;
use App\Http\Controllers\Api\GalleryController;
use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\ExperienceController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\PublicationController;
use App\Http\Controllers\Api\NewsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/homepage-data', HomepageDataController::class, 'getDataForApi');
Route::get('/galleries', [GalleryController::class, 'index']);
Route::get('/clients', [ClientController::class, 'index']);
Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/filters', [ProjectController::class, 'getFilterOptions']);
Route::get('/experiences', [ExperienceController::class, 'index']);
Route::get('/experiences/{experience}', [ExperienceController::class, 'show']);
Route::get('/publications', [PublicationController::class, 'index']);
Route::get('/publications/{publication}', [PublicationController::class, 'show']);
Route::get('/news', [NewsController::class, 'index']);
Route::get('/news/{news}', [NewsController::class, 'show']);