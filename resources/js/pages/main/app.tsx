import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../homepage/HomePage';
import HomepageSkeleton from '../../components/HomepageSkeleton';
import PublicLayout from '../../layouts/PublicLayout';
import AboutUsPage from '../about/AboutUsPage';
import GalleryPage from '../gallery/GalleryPage';
import ClientPage from '../client/ClientPage'; 
import ProjectPage from '../project/ProjectPage';// Layout baru dengan sidebar

// =======================================================
// Komponen Wrapper untuk HomePage
// Tugasnya HANYA mengambil data untuk halaman utama.
// =======================================================
function HomePageWrapper() {
    const [pageProps, setPageProps] = useState({
        clients: [],
        experiences: [],
        stats: { projects: 0, clients: 0, fields: 0 },
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('/api/homepage-data'); 
                if (response.data) {
                    setPageProps(response.data);
                }
            } catch (error) {
                console.error("Gagal mengambil data halaman utama:", error);
            } finally {
                setTimeout(() => setLoading(false), 500);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        // Saat loading, kita tampilkan skeleton di dalam layout utama
        // agar sidebar tetap terlihat.
        return <HomepageSkeleton />;
    }

    // Setelah data ada, render HomePage dengan datanya
    return <HomePage {...pageProps} />;
}


// =======================================================
// Komponen Aplikasi Utama
// Tugasnya HANYA mengatur routing dan layout.
// =======================================================
function PublicApp() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Semua rute di dalam sini akan secara otomatis 
                  dibungkus oleh PublicLayout (yang berisi sidebar).
                */}
                <Route element={<PublicLayout />}>
                
                    {/* Rute untuk halaman utama */}
                    <Route path="/" element={<HomePageWrapper />} />

                    {/* Contoh rute untuk halaman lain di masa depan */}
                    <Route path="/about" element= {<AboutUsPage />} />
                    <Route path="/gallery" element={<GalleryPage />} />
                    <Route path="/clients" element={<ClientPage />} />
                    <Route path="/projects" element={<ProjectPage />} />
                    {/* ...dan seterusnya... */}

                </Route>
            </Routes>
        </BrowserRouter>
    );
}


// Render aplikasi utama ke dalam HTML
const container = document.getElementById('public-root');
if (container) {
    const root = createRoot(container);
    root.render(<PublicApp />);
}