// Import Dependencies
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
import ProjectPage from '../project/ProjectPage';
import ExperiencePage from '../experience/ExperiencePage';
import ExperienceDetailPage from '../experience/ExperienceDetailPage';
import PublicationPage from '../publication/PublicationPage';
import PublicationDetailPage from '../publication/PublicationPreview';
import NewsPage from '../news/NewsPage';
import NewsDetailPage from '../news/NewsDetail';

// Main Wrapper
function HomePageWrapper() {
    const [pageProps, setPageProps] = useState({
        clients: [],
        experiences: [],
        stats: { projects: 0, clients: 0, fields: 0 },
        projectsByYear: [],
        projectsByField: [],
        publications:[],
        openPositions:[],
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

        return <HomepageSkeleton />;
    }

    return <HomePage {...pageProps} />;
}


// Main App
function PublicApp() {
    return (
        <BrowserRouter>
            <Routes>

                <Route element={<PublicLayout />}>
                    {/* Routes */}
                    <Route path="/" element={<HomePageWrapper />} />
                    <Route path="/about" element= {<AboutUsPage />} />
                    <Route path="/gallery" element={<GalleryPage />} />
                    <Route path="/clients" element={<ClientPage />} />
                    <Route path="/projects" element={<ProjectPage />} />
                    <Route path="/experiences" element={<ExperiencePage />} />
                    <Route path="/experiences/:id" element={<ExperienceDetailPage />} />
                    <Route path="/publications" element={<PublicationPage />} />
                    <Route path="/publications/:id" element={<PublicationDetailPage />} />
                    <Route path="/news" element={<NewsPage />} />
                    <Route path="/news/:id" element={<NewsDetailPage />} />
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