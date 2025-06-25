// resources/js/pages/projects/ProjectPage.tsx

import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar, Building, Filter, X } from 'lucide-react';

// Definisikan tipe data
interface Client { id: number; name: string; }
interface Project { id: number; name: string; year: number; clients: Client[]; }
interface PaginatedData { current_page: number; data: Project[]; last_page: number; next_page_url: string | null; prev_page_url: string | null; }

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

// Skeleton baru untuk tampilan daftar (tidak berubah)
const ListSkeleton = () => (
    <div className="mt-8 space-y-8">{Array(3).fill(0).map((_, i) => (<div key={i}><div className="h-8 w-24 bg-gray-300 rounded-md animate-pulse mb-4"></div><div className="space-y-4">{Array(3).fill(0).map((_, j) => (<div key={j} className="h-16 bg-white rounded-lg animate-pulse p-4"></div>))}</div></div>))}</div>
);


export default function ProjectPage() {
    const [projectData, setProjectData] = useState<PaginatedData | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    
    // State untuk filter
    const [filterOptions, setFilterOptions] = useState<{ years: number[], clients: Client[] }>({ years: [], clients: [] });
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedClient, setSelectedClient] = useState('');

    const [searchParams, setSearchParams] = useSearchParams();

    // Effect untuk mengambil opsi filter (tahun & klien) saat komponen dimuat
    useEffect(() => {
        axios.get('/api/projects/filters')
            .then(response => setFilterOptions(response.data))
            .catch(error => console.error("Gagal mengambil data filter:", error));

        // Set filter awal dari URL jika ada
        setSelectedYear(searchParams.get('year') || '');
        setSelectedClient(searchParams.get('client_id') || '');
    }, []);

    // Effect untuk mengambil data proyek berdasarkan filter dan halaman
    useEffect(() => {
        setLoading(true);
        const params = new URLSearchParams({ page: currentPage.toString() });
        if (selectedYear) params.append('year', selectedYear);
        if (selectedClient) params.append('client_id', selectedClient);

        axios.get(`/api/projects?${params.toString()}`)
            .then(response => {
                setProjectData(response.data.projects);
                // Update URL tanpa me-refresh halaman
                setSearchParams(params, { replace: true });
            })
            .catch(error => console.error("Gagal mengambil data proyek:", error))
            .finally(() => setLoading(false));
    }, [currentPage, selectedYear, selectedClient]);

    const handleFilterChange = () => setCurrentPage(1);

    const clearFilters = () => {
        setSelectedYear('');
        setSelectedClient('');
        setCurrentPage(1);
    };

    const groupedProjects = useMemo(() => {
        if (!projectData?.data) return {};
        return projectData.data.reduce((acc, project) => {
            const year = project.year;
            if (!acc[year]) acc[year] = [];
            acc[year].push(project);
            return acc;
        }, {} as Record<number, Project[]>);
    }, [projectData]);

    const sortedYears = Object.keys(groupedProjects).sort((a, b) => parseInt(b) - parseInt(a));

    return (
        <div className="p-4 sm:p-8 lg:p-12">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-indigo-900">Our Projects</h1>
                    <p className="mt-4 text-lg text-gray-600">Explore the portfolio of work we are proud of.</p>
                </div>
                
                {/* Filter Bar */}
                <div className="p-4 bg-white border border-indigo-900 rounded-lg shadow-sm mb-8 flex flex-col sm:flex-row gap-4 items-center">
                    <Filter className="text-indigo-900 hidden sm:block" />
                    <select value={selectedYear} onChange={e => { setSelectedYear(e.target.value); handleFilterChange(); }} className="w-full sm:w-auto px-4 py-2 border border-indigo-900 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                        <option value="">All Years</option>
                        {filterOptions.years.map(year => <option key={year} value={year}>{year}</option>)}
                    </select>
                    <select value={selectedClient} onChange={e => { setSelectedClient(e.target.value); handleFilterChange(); }} className="w-full sm:w-auto px-4 py-2 border border-indigo-900 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                        <option value="">All Clients</option>
                        {filterOptions.clients.map(client => <option key={client.id} value={client.id}>{client.name}</option>)}
                    </select>
                    <button onClick={clearFilters} className="font-semibold w-full sm:w-auto ml-auto px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-indigo-900 hover:text-white transition duration-200 flex items-center justify-center gap-2">
                        <X size={16} /> Clear
                    </button>
                </div>

                {loading ? <ListSkeleton /> : projectData && sortedYears.length > 0 ? (
                    <>
                        <div className="space-y-12">
                            {sortedYears.map(year => (
                                <section key={year}>
                                    <div className="flex items-center space-x-3"><Calendar className="text-indigo-900" /><h2 className="text-2xl font-bold text-gray-800">{year}</h2></div>
                                    <ul className="mt-4 border-l-2 border-indigo-200 ml-3 space-y-4">
                                        {groupedProjects[parseInt(year)].map(project => (
                                            <li key={project.id} className="pl-6 relative">
                                                <div className="absolute -left-[7px] top-1 h-3 w-3 bg-white border-2 border-indigo-900 rounded-full"></div>
                                                {/* Judul Proyek Sekarang Non-Clickable */}
                                                <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                                                <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1"><Building size={14} /><span>{project.clients.map(c => c.name).join(', ')}</span></div>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            ))}
                        </div>
                        <Pagination data={projectData} onPageChange={setCurrentPage} />
                    </>
                ) : (
                    <p className="text-center text-gray-500 mt-10">No projects found matching your criteria.</p>
                )}
            </div>
        </div>
    );
}