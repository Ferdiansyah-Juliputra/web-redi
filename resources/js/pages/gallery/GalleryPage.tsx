// resources/js/pages/gallery/GalleryPage.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Maximize, X, ArrowLeft, ArrowRight } from 'lucide-react';

// 1. Definisikan tipe data untuk item galeri dan objek paginasi dari Laravel
interface GalleryItem {
    id: number;
    title: string;
    year: number;
    description: string;
    image_url: string | null;
}

interface PaginatedData {
    current_page: number;
    data: GalleryItem[];
    last_page: number;
    next_page_url: string | null;
    prev_page_url: string | null;
}

// Komponen kecil untuk tombol paginasi, agar kode lebih rapi
const Pagination = ({ data, onPageChange }: { data: PaginatedData, onPageChange: (page: number) => void }) => {
    return (
        <div className="flex justify-center items-center space-x-4 mt-12">
            <button
                onClick={() => onPageChange(data.current_page - 1)}
                disabled={!data.prev_page_url}
                className="flex items-center px-4 py-2 bg-white rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <ArrowLeft size={16} className="mr-2" />
                Previous
            </button>
            <span className="text-sm text-gray-600">
                Page {data.current_page} of {data.last_page}
            </span>
            <button
                onClick={() => onPageChange(data.current_page + 1)}
                disabled={!data.next_page_url}
                className="flex items-center px-4 py-2 bg-white rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Next
                <ArrowRight size={16} className="ml-2" />
            </button>
        </div>
    );
};


// Komponen Skeleton untuk efek loading
const GallerySkeleton = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gray-300 h-56 animate-pulse"></div>
        <div className="p-4">
            <div className="bg-gray-300 h-6 w-3/4 rounded animate-pulse"></div>
            <div className="bg-gray-300 h-4 w-1/4 mt-2 rounded animate-pulse"></div>
        </div>
    </div>
);

export default function GalleryPage() {
    // 2. State sekarang menyimpan seluruh objek paginasi
    const [galleryData, setGalleryData] = useState<PaginatedData | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
    // State untuk melacak halaman saat ini
    const [currentPage, setCurrentPage] = useState(1);

    // 3. useEffect sekarang akan berjalan setiap kali 'currentPage' berubah
    useEffect(() => {
        setLoading(true);
        // Ambil data untuk halaman yang spesifik menggunakan query parameter
        axios.get(`/api/galleries?page=${currentPage}`)
            .then(response => {
                setGalleryData(response.data);
                window.scrollTo(0, 0); // Scroll ke atas setiap pindah halaman
            })
            .catch(error => {
                console.error("Gagal mengambil data galeri:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [currentPage]); 

    return (
        <div className="p-4 sm:p-8 lg:p-12">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-indigo-900">Our Gallery</h1>
                    <p className="mt-4 text-lg text-gray-600">
                        A collection of our memorable moments and impactful events.
                    </p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Array(12).fill(0).map((_, i) => <GallerySkeleton key={i} />)}
                    </div>
                ) : galleryData && galleryData.data.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* 4. Map melalui 'galleryData.data' bukan 'galleries' */}
                            {galleryData.data.map(item => (
                                <div key={item.id} className="group bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
                                    <div className="relative">
                                        <img src={item.image_url || 'https://via.placeholder.com/400x300'} alt={item.title} className="h-56 w-full object-cover" />
                                        <div className="absolute inset-0 bg-transparent group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                                            <button onClick={() => setSelectedImage(item)} className="p-3 bg-white rounded-full text-gray-800 opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
                                                <Maximize size={24} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.year}</p>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-1">{item.title}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {/* 5. Tampilkan komponen Pagination */}
                        <Pagination data={galleryData} onPageChange={setCurrentPage} />
                    </>
                ) : (
                    <p className="text-center text-gray-500 dark:text-gray-300">No gallery items found.</p>
                )}
            </div>

            {/* Modal untuk menampilkan gambar lebih besar (kode tidak berubah) */}
            {selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-20 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
                    <div className="relative bg-white dark:bg-gray-900 rounded-lg max-w-4xl max-h-[90vh] w-full flex flex-col" onClick={e => e.stopPropagation()}>
                        <img src={selectedImage.image_url || ''} alt={selectedImage.title} className="w-full h-auto object-contain flex-1 p-2" />
                        <div className="p-4 border-t dark:border-gray-700">
                            <h2 className="text-xl font-bold dark:text-white">{selectedImage.title}</h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{selectedImage.year}</p>
                            <p className="text-base text-gray-700 dark:text-gray-300 mt-2">{selectedImage.description}</p>
                        </div>
                        <button onClick={() => setSelectedImage(null)} className="absolute top-2 right-2 p-2 bg-gray-800/50 text-white rounded-full hover:bg-gray-800/80">
                            <X size={24} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}