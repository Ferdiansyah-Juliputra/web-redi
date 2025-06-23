<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $fillable = [
        'name',
        'image_path'
    ];
    public function projects()
    {
        return $this->belongsToMany(Project::class, 'client_project');
    }
    public function experiences()
    {
        return $this->belongsToMany(Experience::class, 'experience_client');
    }
};
