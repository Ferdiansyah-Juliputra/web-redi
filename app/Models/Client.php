<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Client extends Model
{
    protected $fillable = [
        'name',
        'image_path'
    ];
    protected $appends = ['image_url'];
        public function getImageUrlAttribute(): ?string
    {
        if ($this->image_path) {
            // Mengubah 'clients/logo.png' menjadi URL lengkap
            return Storage::url($this->image_path);
        }
        
        // Kembalikan null jika tidak ada gambar, agar kita bisa tangani di frontend
        return null;
    }

    public function projects()
    {
        return $this->belongsToMany(Project::class, 'client_project');
    }
    public function experiences()
    {
        return $this->belongsToMany(Experience::class, 'experience_client');
    }
};
