// resources/js/pages/publications/PublicationDetailPage.tsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Download, Link as LinkIcon, ArrowLeft } from 'lucide-react';

interface PublicationItem {
    id: number;
    title: string;
    year: number;
    doi: string | null;
    file_url: string | null;
}

export default function PublicationDetailPage() {
    const [publication, setPublication] = useState<PublicationItem | null>(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams<{ id: string }>(); // Hook untuk mengambil ID dari URL

    useEffect(() => {
        axios.get(`/api/publications/${id}`)
            .then(response => {
                setPublication(response.data);
            })
            .catch(error => console.error("Gagal mengambil detail publikasi:", error))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return <div className="p-8 text-center">Loading publication...</div>;
    }

    if (!publication) {
        return <div className="p-8 text-center text-red-500">Publication not found.</div>;
    }

    return (
        <div className="max-w-5xl mx-auto p-4 sm:p-8">
            <Link to="/publications" className="inline-flex items-center text-indigo-600 hover:underline mb-8">
                <ArrowLeft size={18} className="mr-2" />
                Back to All Publications
            </Link>

            <div className="bg-white p-8 rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold text-gray-900">{publication.title}</h1>
                <p className="text-gray-500 mt-2">Published in {publication.year}</p>
                
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 my-6">
                    {publication.doi && (
                        <a href={publication.doi} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-medium text-indigo-600 hover:underline">
                            <LinkIcon size={14} className="mr-1.5" /> View DOI
                        </a>
                    )}
                    {publication.file_url && (
                        <a href={publication.file_url} download className="inline-flex items-center text-sm font-medium text-green-600 hover:underline">
                            <Download size={14} className="mr-1.5" /> Download File
                        </a>
                    )}
                </div>

                {/* Bagian Preview PDF */}
                {publication.file_url ? (
                    <div className="mt-6 border rounded-lg overflow-hidden">
                        <embed 
                            src={publication.file_url} 
                            type="application/pdf" 
                            width="100%" 
                            // Gunakan aspect-ratio untuk tinggi yang responsif
                            className="aspect-[4/5] sm:aspect-video"
                        />
                    </div>
                ) : (
                    <div className="mt-6 p-8 text-center bg-gray-100 rounded-lg">
                        <p className="text-gray-500">File preview is not available for this publication.</p>
                    </div>
                )}
            </div>
        </div>
    );
}