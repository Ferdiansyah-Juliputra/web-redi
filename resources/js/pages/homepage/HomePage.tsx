// resources/js/pages/Homepage/HomePage.tsx

import React from 'react';
import MainContent from '../../components/public/MainContent';
import ExperienceSidebar from '../../components/public/ExperienceSidebar';

// Definisikan 'props' yang akan diterima
interface Client { id: number; name: string; image_url: string; }
interface Experience { id: number; title: string; short_description: string; image_url: string; }
interface Stats { projects: number; clients: number; fields: number; }
interface HomePageProps { clients: Client[]; experiences: Experience[]; stats: Stats; }

export default function HomePage({ clients, experiences, stats }: HomePageProps) {
  return (
    // Layout 2 kolom yang merakit komponen
    <div className="flex h-screen w-full">
        <MainContent stats={stats} clients={clients} />
        <ExperienceSidebar experiences={experiences} />
    </div>
  );
}