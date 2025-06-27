// resources/js/pages/news/Create.tsx

import React from 'react';
import { Head, Link } from '@inertiajs/react';
import NewsForm from './NewsForm';

export default function NewsCreate() {
    return (
        // Komponen layout sudah dihapus dari sini
        <>
            <Head title="Add New News" />
            <div className="p-4 sm:p-6 lg:p-8 bg-gray-100 min-h-screen">
                <div className="max-w-2xl mx-auto">
                    <div className="mb-6">
                         <Link href={route('admin.news.index')} className="text-sm text-indigo-600 hover:underline">&larr; Back to News List</Link>
                        <h1 className="text-2xl font-bold text-gray-800 mt-2">Add New News Item</h1>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <NewsForm />
                    </div>
                </div>
            </div>
        </>
    );
}

// Baris NewsCreate.layout = ... sudah dihapus