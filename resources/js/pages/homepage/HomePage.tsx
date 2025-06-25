// resources/js/pages/homepage/HomePage.tsx

import React from 'react';
import MainContent from '../../components/public/MainContent';
import ExperienceSidebar from '../../components/public/ExperienceSidebar';

// 1. Definisikan tipe data yang lebih lengkap, termasuk untuk chart
interface Client { id: number; name: string; image_url: string; }
interface Experience { id: number; title: string; short_description: string; image_url: string; }
interface Stats { projects: number; clients: number; fields: number; }
interface ProjectByYear { year: number; count: number; }
interface ProjectByField { field: string; value: number; }

interface HomePageProps {
    clients: Client[];
    experiences: Experience[];
    stats: Stats;
    projectsByYear: ProjectByYear[];   // <- Tambahkan ini
    projectsByField: ProjectByField[]; // <- Tambahkan ini
}

export default function HomePage({ clients, experiences, stats, projectsByYear, projectsByField }: HomePageProps) {
  return (
    // Layout 2 kolom yang merakit komponen
    <div className="flex h-[calc(100vh-5rem)]">
        {/* 2. Teruskan props baru ke MainContent */}
        <MainContent 
            stats={stats} 
            clients={clients} 
            projectsByYear={projectsByYear} 
            projectsByField={projectsByField} 
        />
        <ExperienceSidebar experiences={experiences} />
    </div>
  );
}