<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage; // <-- 1. Import Storage

class Gallery extends Model
{
    protected $fillable = [
        'title',
        'year',
        'description',
        'image_path'
    ];
    
    // 2. Tambahkan properti $appends
    // Ini memberitahu Laravel untuk selalu menyertakan 'image_url' saat model ini diubah ke array/JSON
    protected $appends = ['image_url'];

    // 3. Definisikan accessor untuk membuat image_url
    public function getImageUrlAttribute(): ?string
    {
        if ($this->image_path) {
            return Storage::url($this->image_path);
        }
        return null; // Kembalikan null jika tidak ada gambar
    }

    // Relasi Anda tetap sama

}