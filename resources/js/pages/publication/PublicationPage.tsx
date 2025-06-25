// resources/js/pages/publications/PublicationPage.tsx

import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar, Link as LinkIcon, Download } from 'lucide-react';

// Definisikan tipe data
interface PublicationItem {
    id: number;
    title: string;
    year: number;
    doi: string | null;
    file_url: string | null;
}
interface PaginatedData {
    current_page: number;
    data: PublicationItem[];
    last_page: number;
    next_page_url: string | null;
    prev_page_url: string | null;
}

// Komponen Pagination
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

// Skeleton untuk loading
const ListSkeleton = () => (
    <div className="mt-8 space-y-8">{Array(3).fill(0).map((_, i) => (<div key={i}><div className="h-8 w-24 bg-gray-300 rounded-md animate-pulse mb-4"></div><div className="space-y-4">{Array(3).fill(0).map((_, j) => (<div key={j} className="h-20 bg-white rounded-lg animate-pulse p-4"></div>))}</div></div>))}</div>
);

export default function PublicationPage() {
    const [publicationData, setPublicationData] = useState<PaginatedData | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setLoading(true);
        axios.get(`/api/publications?page=${currentPage}`)
            .then(response => {
                setPublicationData(response.data);
                window.scrollTo(0, 0);
            })
            .catch(error => console.error("Gagal mengambil data publikasi:", error))
            .finally(() => setLoading(false));
    }, [currentPage]);

    const groupedPublications = useMemo(() => {
        if (!publicationData?.data) return {};
        return publicationData.data.reduce((acc, pub) => {
            const year = pub.year;
            if (!acc[year]) acc[year] = [];
            acc[year].push(pub);
            return acc;
        }, {} as Record<number, PublicationItem[]>);
    }, [publicationData]);

    const sortedYears = Object.keys(groupedPublications).sort((a, b) => parseInt(b) - parseInt(a));

    return (
        <div className="p-4 sm:p-8 lg:p-12">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-indigo-800">Our Publications</h1>
                    <p className="mt-4 text-lg text-gray-600">A collection of our published research and studies.</p>
                </div>
                
                {loading ? <ListSkeleton /> : publicationData && sortedYears.length > 0 ? (
                    <>
                        <div className="space-y-12">
                            {sortedYears.map(year => (
                                <section key={year}>
                                    <div className="flex items-center space-x-3"><Calendar className="text-indigo-600" /><h2 className="text-2xl font-bold text-gray-800">{year}</h2></div>
                                    <ul className="mt-4 space-y-4">
                                        {groupedPublications[parseInt(year)].map(pub => (
                                            // =======================================================
                                            // SETIAP ITEM SEKARANG ADALAH LINK
                                            // =======================================================
                                            <li key={pub.id}>
                                                <Link 
                                                    to={`/publications/${pub.id}`}
                                                    className="block bg-white p-6 rounded-lg shadow-sm hover:bg-indigo-50 hover:shadow-md transition-all duration-200"
                                                >
                                                    <h3 className="text-lg font-semibold text-gray-900">{pub.title}</h3>
                                                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-3">
                                                        {pub.doi && (
                                                            <span className="inline-flex items-center text-sm text-indigo-600">
                                                                <LinkIcon size={14} className="mr-1.5" /> View DOI
                                                            </span>
                                                        )}
                                                        {pub.file_url && (
                                                            <span className="inline-flex items-center text-sm text-green-600">
                                                                <Download size={14} className="mr-1.5" /> PDF Available
                                                            </span>
                                                        )}
                                                    </div>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            ))}
                        </div>
                        <Pagination data={publicationData} onPageChange={setCurrentPage} />
                    </>
                ) : (
                    <p className="text-center text-gray-500 mt-10">No publications found.</p>
                )}
            </div>
        </div>
    );
}