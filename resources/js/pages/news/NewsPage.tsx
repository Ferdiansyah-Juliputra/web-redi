// resources/js/pages/news/NewsPage.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useSearchParams } from 'react-router-dom'; // 1. Impor useSearchParams
import { ArrowLeft, ArrowRight, Briefcase, School } from 'lucide-react';

// ... (Interface dan komponen Pagination tidak berubah) ...
interface NewsItem { id: number; title: string; category: 'Recruitment' | 'Internship'; effective_status: 'OPEN' | 'CLOSE'; end_date: string | null; }
interface PaginatedData { current_page: number; data: NewsItem[]; last_page: number; next_page_url: string | null; prev_page_url: string | null; }
const Pagination = ({ data, onPageChange }: { data: PaginatedData, onPageChange: (page: number) => void }) => ( <div className="flex justify-center items-center space-x-4 mt-12"><button onClick={() => onPageChange(data.current_page - 1)} disabled={!data.prev_page_url} className="flex items-center px-4 py-2 bg-white rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"><ArrowLeft size={16} className="mr-2" /> Previous</button><span className="text-sm text-gray-600">Page {data.current_page} of {data.last_page}</span><button onClick={() => onPageChange(data.current_page + 1)} disabled={!data.next_page_url} className="flex items-center px-4 py-2 bg-white rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50">Next <ArrowRight size={16} className="ml-2" /></button></div> );
const NewsSkeleton = () => ( <div className="bg-white p-6 rounded-lg shadow-sm animate-pulse"><div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div><div className="h-6 bg-gray-300 rounded w-3/4"></div><div className="h-4 bg-gray-300 rounded w-1/2 mt-4"></div></div> );


export default function NewsPage() {
    const [newsData, setNewsData] = useState<PaginatedData | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    // 2. Gunakan useSearchParams untuk membaca parameter dari URL
    const [searchParams] = useSearchParams();

    // 3. useEffect sekarang akan berjalan setiap kali halaman atau filter kategori berubah
    useEffect(() => {
        const category = searchParams.get('category');
        let apiUrl = `/api/news?page=${currentPage}`;

        // Jika ada parameter kategori, tambahkan ke URL API
        if (category) {
            apiUrl += `&category=${category}`;
        }
        
        setLoading(true);
        axios.get(apiUrl)
            .then(response => {
                setNewsData(response.data);
                window.scrollTo(0, 0);
            })
            .catch(error => console.error("Gagal mengambil data berita:", error))
            .finally(() => setLoading(false));
    }, [currentPage, searchParams]); // Tambahkan searchParams sebagai dependensi

    const CategoryIcon = ({ category }: { category: string }) => {
        if (category === 'Recruitment') return <Briefcase className="text-indigo-500" size={24} />;
        if (category === 'Internship') return <School className="text-green-500" size={24} />;
        return null;
    };
    
    // Ambil nilai kategori dari URL untuk ditampilkan di judul
    const currentCategory = searchParams.get('category');

    return (
        <div className="p-4 sm:p-8 lg:p-12">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-indigo-800">News & Opportunities</h1>
                    {/* 4. Tampilkan sub-judul dinamis berdasarkan filter */}
                    <p className="mt-4 text-lg text-gray-600">
                        {currentCategory 
                            ? `Showing all open ${currentCategory.toLowerCase()} positions.`
                            : 'Join our team or grow with us through our programs.'
                        }
                    </p>
                </div>

                {loading ? (
                    <div className="space-y-4">{Array(5).fill(0).map((_, i) => <NewsSkeleton key={i} />)}</div>
                ) : newsData && newsData.data.length > 0 ? (
                    <>
                        <div className="space-y-4">
                            {newsData.data.map(item => (
                                <Link to={`/news/${item.id}`} key={item.id} className="block bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0"><CategoryIcon category={item.category} /></div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className={`text-sm font-semibold ${item.category === 'Recruitment' ? 'text-indigo-600' : 'text-green-600'}`}>{item.category}</p>
                                                    <h3 className="text-lg font-bold text-gray-900 mt-1">{item.title}</h3>
                                                </div>
                                                <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${item.effective_status === 'OPEN' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{item.effective_status}</span>
                                            </div>
                                            <p className="text-sm text-gray-500 mt-2">
                                                {item.end_date ? `Closes on: ${new Date(item.end_date).toLocaleDateString()}` : 'No deadline specified'}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <Pagination data={newsData} onPageChange={setCurrentPage} />
                    </>
                ) : (
                    <p className="text-center text-gray-500">No open opportunities found for this category.</p>
                )}
            </div>
        </div>
    );
}