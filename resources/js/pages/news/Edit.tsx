// resources/js/pages/news/Edit.tsx

import React from 'react';
import { Head, Link } from '@inertiajs/react';
import NewsForm from './NewsForm';

// Definisikan tipe data untuk prop 'news'
interface NewsData {
    id: number;
    title: string;
    description: string;
    category: 'Recruitment' | 'Internship';
    status: 'OPEN' | 'CLOSE';
    instagram_link: string;
    start_date: string;
    end_date: string;
    requirements: string[];
}

export default function NewsEdit({ news }: { news: NewsData }) {
    return (
        // Komponen layout sudah dihapus dari sini
        <>
            <Head title={`Edit: ${news.title}`} />
             <div className="p-4 sm:p-6 lg:p-8 bg-gray-100 min-h-screen">
                <div className="max-w-2xl mx-auto">
                    <div className="mb-6">
                         <Link href={route('admin.news.index')} className="text-sm text-indigo-600 hover:underline">&larr; Back to News List</Link>
                        <h1 className="text-2xl font-bold text-gray-800 mt-2">Edit News Item</h1>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <NewsForm news={news} />
                    </div>
                </div>
            </div>
        </>
    );
}

// Baris NewsEdit.layout = ... sudah dihapus