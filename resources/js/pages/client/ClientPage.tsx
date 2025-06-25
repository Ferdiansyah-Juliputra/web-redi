// resources/js/pages/client/ClientPage.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Gunakan Link dari React Router

// Definisikan 'bentuk' data klien
interface Client {
    id: number;
    name: string;
    image_url: string | null;
}

// Komponen Skeleton untuk efek loading
const ClientSkeleton = () => (
    <div className="flex items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm h-32 animate-pulse">
        <div className="w-full h-12 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
    </div>
);

export default function ClientPage() {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/clients')
            .then(response => {
                setClients(response.data);
            })
            .catch(error => {
                console.error("Gagal mengambil data klien:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div className="p-4 sm:p-8 lg:p-12">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-indigo-900 dark:text-indigo-400">Our Clients</h1>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                        We are proud to collaborate with leading organizations across various sectors. 
                    </p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {Array(10).fill(0).map((_, i) => <ClientSkeleton key={i} />)}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {clients.map(client => (
                            // Setiap kartu adalah link ke halaman proyek yang difilter
                        <Link
                            to={`/projects?client_id=${client.id}`}
                            key={client.id}
                            className="group block dark:bg-gray-800 rounded-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 p-4"
                        >
                            {/* Div internal untuk mengatur layout gambar dan teks */}
                            <div className="flex flex-col items-center justify-between h-full">
                                {/* Area untuk Gambar */}
                                <div className="flex-grow flex items-center justify-center">
                                    <img
                                        src={client.image_url || 'https://via.placeholder.com/150x80?text=No+Logo'}
                                        alt={client.name}
                                        className="max-h-16 w-full object-contain group-hover:opacity-100 transition-all duration-300"
                                    />
                                </div>

                                {/* Area untuk Nama Klien */}
                                <p className="mt-4 w-full text-center text-sm font-semibold text-gray-700 dark:text-gray-300 min-h-[2.5rem]">
                                    {client.name}
                                </p>
                            </div>
                        </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}