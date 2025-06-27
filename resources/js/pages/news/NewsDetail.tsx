// resources/js/pages/news/NewsDetailPage.tsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, CheckCircle, Instagram } from 'lucide-react';

interface NewsItem {
    id: number; title: string; description: string; category: string;
    effective_status: string; instagram_link: string | null;
    start_date: string | null; end_date: string | null; requirements: string[] | null;
}

export default function NewsDetailPage() {
    const [news, setNews] = useState<NewsItem | null>(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        axios.get(`/api/news/${id}`)
            .then(response => setNews(response.data))
            .catch(error => console.error("Gagal mengambil detail berita:", error))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div className="p-8 text-center">Loading...</div>;
    if (!news) return <div className="p-8 text-center text-red-500">News item not found.</div>;

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-8">
            <Link to="/news" className="inline-flex items-center text-indigo-600 hover:underline mb-8">
                <ArrowLeft size={18} className="mr-2" />
                Back to All News
            </Link>

            <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="flex justify-between items-start">
                    <span className={`text-sm font-bold uppercase tracking-wider ${news.category === 'Recruitment' ? 'text-indigo-600' : 'text-green-600'}`}>
                        {news.category}
                    </span>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${news.effective_status === 'OPEN' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {news.effective_status}
                    </span>
                </div>
                <h1 className="mt-4 text-4xl font-bold text-gray-900">{news.title}</h1>
                
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500 mt-2 border-b pb-6">
                    {news.start_date && <span>Opened: {new Date(news.start_date).toLocaleDateString()}</span>}
                    {news.end_date && <span>Closes: {new Date(news.end_date).toLocaleDateString()}</span>}
                </div>
                
                <div className="prose prose-lg max-w-none mt-6 text-gray-700">
                    <p>{news.description}</p>
                </div>

                {news.requirements && news.requirements.length > 0 && (
                    <div className="mt-8">
                        <h2 className="text-2xl font-semibold text-gray-800">Requirements</h2>
                        <ul className="mt-4 space-y-2">
                            {news.requirements.map((req, index) => (
                                <li key={index} className="flex items-start">
                                    <CheckCircle className="text-green-500 h-5 w-5 mt-1 mr-3 flex-shrink-0" />
                                    <span>{req}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {news.instagram_link && (
                    <div className="mt-10 pt-6 border-t">
                        <a href={news.instagram_link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-semibold rounded-lg shadow-md hover:opacity-90">
                            <Instagram className="mr-2" />
                            View on Instagram
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}