<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon; // 1. Jangan lupa import Carbon

class News extends Model
{
    use HasFactory;

    // 2. Tambahkan kolom baru ke $fillable
    protected $fillable = [
        'title',
        'description',
        'category',
        'status',
        'instagram_link',
        'requirements',
        'start_date', // <- Ditambahkan
        'end_date',   // <- Ditambahkan
    ];

    // 3. Beritahu Laravel cara menangani tipe data
    protected $casts = [
        'requirements' => 'array',
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    // 4. Beritahu Laravel untuk selalu menyertakan properti 'effective_status'
    protected $appends = ['effective_status'];

    // 5. Ini adalah "otak"-nya: Accessor untuk status dinamis
    public function getEffectiveStatusAttribute(): string
    {
        // Jika status secara manual sudah 'CLOSE', maka ia tetap CLOSE.
        if ($this->status === 'CLOSE') {
            return 'CLOSE';
        }
        
        // Jika ada tanggal selesai dan tanggal itu sudah lewat, maka statusnya menjadi CLOSE.
        if ($this->end_date && $this->end_date->isPast()) {
            return 'CLOSE';
        }

        // Jika tidak memenuhi kondisi di atas, maka statusnya OPEN.
        return 'OPEN';
    }
}