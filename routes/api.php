<?php

use App\Http\Controllers\Api\HomepageDataController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/homepage-data', HomepageDataController::class, 'getDataForApi');