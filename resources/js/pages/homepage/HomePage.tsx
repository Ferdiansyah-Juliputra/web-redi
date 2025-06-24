// resources/js/Pages/Homepage/HomePage.tsx

import React from 'react';
import { Head } from '@inertiajs/react';

// Definisikan bentuk 'props' yang akan kita terima dari Laravel Controller
interface Client {
  id: number;
  name: string;
  image_url: string; // Kita akan menggunakan image_url yang sudah diolah oleh Controller
}

interface Experience {
  id: number;
  title: string;
  short_description: string;
  image_url: string;
}

interface Stats {
  projects: number;
  clients: number;
  focuses: number;
}

interface HomePageProps {
  clients: Client[];
  experiences: Experience[];
  stats: Stats;
}

// Terima props langsung di argumen fungsi
export default function HomePage({ clients, experiences, stats }: HomePageProps) {
  return (
    <>
      <Head title="Regional Economic Development Institute" />
      <div className="bg-gray-50 p-4 sm:p-8 font-sans">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

          {/* ======================================================= */}
          {/* BAGIAN KIRI (KONTEN UTAMA) - Sekarang menggunakan data dari props */}
          {/* ======================================================= */}
          <main className="lg:col-span-2">
            <section className="bg-indigo-900 text-white p-8 sm:p-10 rounded-xl shadow-2xl">
              <h1 className="text-5xl font-bold">redi</h1>
              <h2 className="text-4xl sm:text-5xl font-light mt-2">Smart, Excellent, Trusted.</h2>
              <div className="mt-10 flex flex-wrap gap-8 sm:gap-12">
                <div>
                  <p className="text-4xl font-bold">{stats.projects}</p>
                  <p className="text-sm opacity-80">Projects</p>
                </div>
                <div>
                  <p className="text-4xl font-bold">{stats.clients}</p>
                  <p className="text-sm opacity-80">Clients</p>
                </div>
                <div>
                  <p className="text-4xl font-bold">{stats.focuses}</p>
                  <p className="text-sm opacity-80">Research Focuses</p>
                </div>
              </div>
            </section>

            {/* Bagian Chart bisa Anda biarkan statis untuk saat ini */}
            <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2 bg-white p-4 sm:p-6 rounded-xl shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-4">Projects</h3>
                  <div className="bg-gray-200 h-48 rounded-md flex items-center justify-center text-gray-400">Chart Placeholder</div>
              </div>
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm flex items-center justify-center">
                  <div className="bg-gray-200 h-48 w-48 rounded-full flex items-center justify-center text-gray-400">Pie Chart</div>
              </div>
            </section>

            {/* Bagian Our Clients - menggunakan data 'clients' dari props */}
            <section className="mt-12 text-center">
              <h2 className="text-3xl font-bold text-gray-800">Our Clients</h2>
              <div className="mt-8 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-8 items-center">
                {clients.map(client => (
                  <div key={client.id} className="flex flex-col items-center group">
                    <img 
                      src={client.image_url} 
                      alt={client.name} 
                      className="h-20 w-20 object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                    />
                  </div>
                ))}
              </div>
            </section>
          </main>

          {/* ======================================================= */}
          {/* BAGIAN KANAN (SIDEBAR EXPERIENCE) - menggunakan data dari props */}
          {/* ======================================================= */}
          <aside>
            <div className="space-y-6">
              {experiences.map(exp => (
                <div key={exp.id} className="bg-white rounded-xl shadow overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <img className="h-40 w-full object-cover" src={exp.image_url} alt={exp.title} />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">{exp.title}</h3>
                    <p className="mt-1 text-sm text-gray-600">{exp.short_description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <a href="#" className="text-indigo-600 hover:text-indigo-800 font-semibold">
                See All →
              </a>
            </div>
          </aside>

        </div>
      </div>
    </>
  );
}