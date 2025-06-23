<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use App\Models\Experience;
use App\Models\Client;
use App\Models\Opportunity;
use App\Models\Project;
use App\Models\Publication;
use App\Models\Field;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $galleryCount = Gallery::count();
        $experienceCount = Experience::count();
        $clientCount = Client::count();
        $opportunityCount = Opportunity::count();
        $projectCount = Project::count();
        $publicationCount = Publication::count();
        $fieldCount = Field::count();

        return Inertia::render('dashboard', [
            'galleryCount' => $galleryCount,
            'experienceCount' => $experienceCount,
            'clientCount' => $clientCount,
            'opportunityCount' => $opportunityCount,
            'projectCount' => $projectCount,
            'publicationCount' => $publicationCount,
            'fieldCount' => $fieldCount,
        ]);
        
    }
}
