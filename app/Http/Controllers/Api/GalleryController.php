<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

class GalleryController extends Controller
{
     public function index()
    {
        $galleries = Gallery::latest()->paginate(12);
        return response()->json($galleries);
    }
}
