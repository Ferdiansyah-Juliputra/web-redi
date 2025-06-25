// resources/js/components/MainContent.tsx

import React from 'react';
import Logo from '../../assets/logo transparan 1.png';

// Komponen ini menerima props yang dibutuhkan dari HomePage
interface MainContentProps {
    stats: { projects: number; clients: number; fields: number };
    clients: { id: number; name: string; image_url: string }[];
}

export default function MainContent({ stats, clients }: MainContentProps) {
    return (
        <main className="flex-1 lg:overflow-y-auto p-4 sm:p-8 no-scrollbar">
            <div className="max-w-6xl mx-auto">
                <section className="bg-indigo-900 text-white sm:p-10 p-8 rounded-xl shadow-2xl">
                    <div className='bg-white rounded-lg p-3 w-fit flex items-center space-x-4'>
                        <img src={Logo} alt="Logo" className="h-12 w-auto object-contain" />
                        <h1 className='text-indigo-900 font-semibold text-2xl md:text-3xl'>Regional Economic Development Institute</h1>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-light mt-12">Smart, Excellent, Trusted.</h2>
                    <div className="mt-10 flex flex-wrap gap-8 sm:gap-12">
                        <div><p className="text-4xl font-bold">{stats.projects}</p><p className="text-sm opacity-80">Projects</p></div>
                        <div><p className="text-4xl font-bold">{stats.clients}</p><p className="text-sm opacity-80">Clients</p></div>
                        <div><p className="text-4xl font-bold">{stats.fields}</p><p className="text-sm opacity-80">Research Focuses</p></div>
                    </div>
                </section>

                <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                    <div className="md:col-span-2 bg-white p-4 rounded-xl shadow-sm"><h3 className="font-bold text-gray-800 mb-4">Projects</h3><div className="bg-gray-200 h-48 rounded-md flex items-center justify-center text-gray-400">Chart Placeholder</div></div>
                    <div className="bg-white p-2 rounded-xl shadow-sm flex flex-col items-center justify-center gap-4 h-full"><h3 className="font-bold text-gray-800 text-lg">Field</h3><div className="bg-gray-200 w-full max-w-60 aspect-square rounded-full flex items-center justify-center text-gray-400">Pie Chart</div></div>
                </section>

                <section className="mt-12 text-center"><h2 className="text-3xl font-bold text-gray-800">Our Clients</h2><div className="mt-8 grid grid-cols-3 sm:grid-cols-5 gap-8 items-center">{clients.map(client => (<div key={client.id} className="flex flex-col items-center group"><img src={client.image_url} alt={client.name} className="h-20 w-20 object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"/></div>))}</div></section>
                
                <section className="mt-12 text-center"><h2 className="text-3xl font-bold text-gray-800">Our Vision</h2><div className="mt-4 max-w-3xl mx-auto"><p className="text-lg text-gray-600 leading-relaxed">Our vision is to become the most smart, excellent, and trusted research institution in Indonesia and beyond.</p></div></section>
                
                <section className="mt-8 text-center pb-12"><h2 className="text-3xl font-bold text-gray-800">Our Mission</h2><div className="mt-4 max-w-3xl mx-auto space-y-4"><h3 className="text-xl font-semibold text-gray-900 leading-relaxed">Smart</h3><p className="text-lg text-gray-600 leading-relaxed">REDI adopts good practices in data collection activities, adopts the latest technology, and applies a code of ethics during the project implementation.</p><h3 className="text-xl font-semibold text-gray-900 leading-relaxed">Excellent</h3><p className="text-lg text-gray-600 leading-relaxed">Through experienced team and data management, and therefore REDI produces excellent data on client requests.</p><h3 className="text-xl font-semibold text-gray-900 leading-relaxed">Trusted</h3><p className="text-lg text-gray-600 leading-relaxed">By applying clear procedure, REDI collects Accurate, Correct, and Consistent (ACC) data.</p></div></section>
            </div>
        </main>
    );
}