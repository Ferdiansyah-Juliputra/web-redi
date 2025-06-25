// resources/js/pages/experiences/ExperiencePage.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Folder, Users } from 'lucide-react';

// 1. Definisikan tipe data yang lebih lengkap sesuai model
interface Field { id: number; name: string; }
interface Client { id: number; name: string; }
interface Province { id: number; name: string; }

interface ExperienceItem {
    id: number;
    title: string;
    description: string; // Menggunakan 'description' bukan 'short_description'
    image_url: string | null;
    field: Field | null; // Relasi ke Field
    clients: Client[]; // Relasi ke Client (bisa banyak)
    provinces: Province[]; // Relasi ke Province
}

interface PaginatedData {
    current_page: number;
    data: ExperienceItem[];
    last_page: number;
    next_page_url: string | null;
    prev_page_url: string | null;
}

// Komponen Pagination (tidak berubah)
const Pagination = ({ data, onPageChange }: { data: PaginatedData, onPageChange: (page: number) => void }) => (
    <div className="flex justify-center items-center space-x-4 mt-12">
        <button onClick={() => onPageChange(data.current_page - 1)} disabled={!data.prev_page_url} className="flex items-center px-4 py-2 bg-white rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50">
            <ArrowLeft size={16} className="mr-2" /> Previous
        </button>
        <span className="text-sm text-gray-600">Page {data.current_page} of {data.last_page}</span>
        <button onClick={() => onPageChange(data.current_page + 1)} disabled={!data.next_page_url} className="flex items-center px-4 py-2 bg-white rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50">
            Next <ArrowRight size={16} className="ml-2" />
        </button>
    </div>
);

// Komponen Skeleton (tidak berubah)
const ExperienceSkeleton = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="bg-gray-300 dark:bg-gray-700 h-48 animate-pulse"></div>
        <div className="p-6">
            <div className="bg-gray-300 dark:bg-gray-700 h-4 w-1/4 rounded animate-pulse mb-2"></div>
            <div className="bg-gray-300 dark:bg-gray-700 h-6 w-3/4 rounded animate-pulse"></div>
            <div className="bg-gray-300 dark:bg-gray-700 h-4 w-full mt-4 rounded animate-pulse"></div>
            <div className="bg-gray-300 dark:bg-gray-700 h-4 w-5/6 mt-2 rounded animate-pulse"></div>
        </div>
    </div>
);

export default function ExperiencePage() {
    const [experienceData, setExperienceData] = useState<PaginatedData | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setLoading(true);
        axios.get(`/api/experiences?page=${currentPage}`)
            .then(response => {
                setExperienceData(response.data);
                window.scrollTo(0, 0);
            })
            .catch(error => console.error("Gagal mengambil data experience:", error))
            .finally(() => setLoading(false));
    }, [currentPage]);

    return (
        <div className="p-4 sm:p-8 lg:p-12">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-indigo-900 dark:text-indigo-400">Our Experiences</h1>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                        Sharing our knowledge and insights from years of research and practice.
                    </p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Array(9).fill(0).map((_, i) => <ExperienceSkeleton key={i} />)}
                    </div>
                ) : experienceData && experienceData.data.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {experienceData.data.map(item => (
                                <Link to={`/experiences/${item.id}`} key={item.id} className="group flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
                                    <div className="h-48 w-full overflow-hidden">
                                        <img src={item.image_url || 'https://via.placeholder.com/400x250'} alt={item.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        {/* 2. Tampilkan Field */}
                                        {item.field && (
                                            <div className="flex items-center text-xs text-indigo-900 font-semibold mb-2">
                                                <Folder size={14} className="mr-1.5" />
                                                <span>{item.field.name}</span>
                                            </div>
                                        )}
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-900 transition-colors">{item.title}</h3>
                                        {/* 3. Tampilkan Clients */}
                                        {item.clients.length > 0 && (
                                            <div className="flex items-center text-xs text-gray-500 mt-2">
                                                <Users size={14} className="mr-1.5" />
                                                <span>{item.clients.map(c => c.name).join(', ')}</span>
                                            </div>
                                        )}
                                        {/* 4. Gunakan 'description' dan 'line-clamp' */}
                                        <p className="text-gray-600 dark:text-gray-400 mt-3 text-sm leading-relaxed flex-grow line-clamp-3">
                                            {item.description}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <Pagination data={experienceData} onPageChange={setCurrentPage} />
                    </>
                ) : (
                    <p className="text-center text-gray-500">No experiences found.</p>
                )}
            </div>
        </div>
    );
}