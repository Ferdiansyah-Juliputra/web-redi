<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

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
    protected $appends = ['image_url'];

    // 3. Definisikan accessor untuk membuat image_url
    public function getImageUrlAttribute(): ?string
    {
        if ($this->image_path) {
            return Storage::url($this->image_path);
        }
        return null; // Kembalikan null jika tidak ada gambar
    }

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
