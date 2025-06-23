<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Field extends Model
{

    protected $table = 'fields';
    protected $fillable = [
        'field',
    ];

    public function projects() {
        return $this->hasMany(Project::class);
    }
    public function experiences() {
        return $this->hasMany(Experience::class);
    }
}
