<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    protected $fillable = [
        'title',
        'description',
        'image_path',
        'client_id',
        'field_id',
        'province_id',
    ];

    public function clients()
    {
        return $this->belongsToMany(Client::class, 'experience_client');
    }
    
    public function field()
    {
        return $this->belongsTo(Field::class);
    }

    public function provinces()
    {
        return $this->belongsToMany(Province::class);
    }
}
