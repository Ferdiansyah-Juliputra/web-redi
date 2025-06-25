<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage; // 1. Pastikan Storage di-import

class Publication extends Model
{
    protected $fillable = [
        'title',
        'year',
        'doi',
        'file_path',
    ];

    // 2. Tambahkan properti $appends
    // Ini memaksa Laravel untuk selalu menambahkan 'file_url'
    // setiap kali model ini diubah menjadi array atau JSON.
    protected $appends = ['file_url'];

    // 3. Tambahkan accessor ini
    // Ini mendefinisikan bagaimana 'file_url' dibuat.
    public function getFileUrlAttribute(): ?string
    {
        if ($this->file_path) {
            // Mengubah path file menjadi URL yang bisa diakses publik
            return Storage::url($this->file_path);
        }
        
        // Kembalikan null jika tidak ada file, agar frontend tahu
        return null;
    }
}