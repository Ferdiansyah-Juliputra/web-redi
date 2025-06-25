// resources/js/pages/experiences/ExperienceDetailPage.tsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Folder, Users, MapPin, ArrowLeft } from 'lucide-react';

// Tipe data yang sama dengan di halaman daftar
interface Field { id: number; name: string; }
interface Client { id: number; name: string; }
interface Province { id: number; name: string; }
interface ExperienceItem {
    id: number;
    title: string;
    description: string;
    image_url: string | null;
    field: Field | null;
    clients: Client[];
    provinces: Province[];
}

export default function ExperienceDetailPage() {
    const [experience, setExperience] = useState<ExperienceItem | null>(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams<{ id: string }>(); // Hook untuk mengambil ID dari URL

    useEffect(() => {
        axios.get(`/api/experiences/${id}`)
            .then(response => {
                setExperience(response.data);
            })
            .catch(error => console.error("Gagal mengambil detail experience:", error))
            .finally(() => setLoading(false));
    }, [id]); // Jalankan setiap kali ID di URL berubah

    if (loading) {
        return <div className="p-8 text-center">Loading experience details...</div>;
    }

    if (!experience) {
        return <div className="p-8 text-center text-red-500">Experience not found.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-8">
            <Link to="/experiences" className="inline-flex items-center text-indigo-600 hover:underline mb-8">
                <ArrowLeft size={18} className="mr-2" />
                Back to All Experiences
            </Link>
            
            <img src={experience.image_url || 'https://via.placeholder.com/1200x600'} alt={experience.title} className="w-full h-auto max-h-[500px] object-cover rounded-xl shadow-lg" />
            
            <h1 className="mt-8 text-4xl font-bold text-gray-900">{experience.title}</h1>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500 mt-4 border-b pb-4 mb-6">
                {experience.field && <div className="flex items-center"><Folder size={14} className="mr-1.5" /> {experience.field.name}</div>}
                {experience.clients.length > 0 && <div className="flex items-center"><Users size={14} className="mr-1.5" /> {experience.clients.map(c => c.name).join(', ')}</div>}
                {experience.provinces.length > 0 && <div className="flex items-center"><MapPin size={14} className="mr-1.5" /> {experience.provinces.map(p => p.name).join(', ')}</div>}
            </div>

            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                {/* Gunakan dangerouslySetInnerHTML jika deskripsi Anda berisi HTML */}
                <p>{experience.description}</p>
            </div>
        </div>
    );
}