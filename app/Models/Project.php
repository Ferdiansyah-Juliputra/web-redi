<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'name',
        'year',
        'field_id',
    ];
    public function clients()
    {
        return $this->belongsToMany(Client::class, 'client_project');
    }

    public function field()
    {
        return $this->belongsTo(Field::class);
    }
}
