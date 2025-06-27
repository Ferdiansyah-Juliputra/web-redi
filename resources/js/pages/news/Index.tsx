// resources/js/pages/news/Index.tsx

import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Trash2, FilePenLine, PlusCircle } from 'lucide-react';

// Definisikan tipe data untuk satu item berita
interface NewsItem {
    id: number;
    title: string;
    category: 'Recruitment' | 'Internship';
    effective_status: 'OPEN' | 'CLOSE';
    end_date: string;
}

// Definisikan tipe data untuk link paginasi
interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

// Definisikan tipe data untuk props
interface NewsIndexProps {
    news: {
        data: NewsItem[];
        links: PaginationLink[];
    };
    success?: string;
}

// Komponen Pagination
const Pagination = ({ links }: { links: PaginationLink[] }) => (
    <div className="mt-6 flex justify-center">
        <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            {links.map((link, index) => (
                <Link
                    key={index}
                    href={link.url || '#'}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-medium border
                        ${link.active ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'}
                        ${index === 0 ? 'rounded-l-md' : ''}
                        ${index === links.length - 1 ? 'rounded-r-md' : ''}
                        ${!link.url ? 'bg-gray-100 cursor-not-allowed text-gray-400' : ''}
                    `}
                    as="button"
                    disabled={!link.url}
                />
            ))}
        </nav>
    </div>
);


export default function NewsIndex({ news, success }: NewsIndexProps) {
    return (
        // Komponen layout sudah dihapus dari sini
        <>
            <Head title="News Management" />
            <div className="p-4 sm:p-6 lg:p-8">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">News & Opportunities</h1>
                    <Link href={route('admin.news.create')} className="inline-flex items-center px-4 py-2 bg-indigo-500 text-white rounded-md text-sm font-medium hover:bg-indigo-700">
                        <PlusCircle size={18} className="mr-2" /> Add News
                    </Link>
                </div>

                {success && <div className="mb-4 bg-green-100 border-green-400 text-green-700 px-4 py-3 rounded-lg">{success}</div>}
                
                <div className="bg-white rounded-lg shadow overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">End Date</th>
                                <th className="relative px-6 py-3"></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {news.data.length > 0 ? (
                                news.data.map((item) => (
                                    <tr key={item.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.title}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                item.effective_status === 'OPEN' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                                {item.effective_status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.end_date ? new Date(item.end_date).toLocaleDateString() : 'N/A'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end space-x-4">
                                                <Link href={route('admin.news.edit', item.id)} className="text-indigo-600 hover:text-indigo-900"><FilePenLine size={18} /></Link>
                                                <Link href={route('admin.news.destroy', item.id)} method="delete" as="button" className="text-red-600 hover:text-red-900"><Trash2 size={18} /></Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan={5} className="px-6 py-4 text-center text-gray-500">No news items found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {news.data.length > 0 && <Pagination links={news.links} />}
            </div>
        </>
    );
}

