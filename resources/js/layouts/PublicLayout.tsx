// resources/js/layouts/PublicLayout.tsx

import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import CollapsibleSidebar from '../components/public/CollapsibleSidebar';

export default function PublicLayout() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-950">
            {/* Sidebar sekarang dikontrol oleh state dari layout ini */}
            <CollapsibleSidebar 
                isMobileOpen={isMobileMenuOpen} 
                setIsMobileOpen={setIsMobileMenuOpen} 
            />

            {/* Konten Utama */}
            <div className="flex-1 flex flex-col">
                {/* Header khusus untuk Mobile */}
                <header className="lg:hidden flex items-center justify-between h-20 px-4 bg-white/80 backdrop-blur-sm border-b z-30">
                    {/* Tombol hamburger ini akan membuka sidebar */}
                    <button onClick={() => setIsMobileMenuOpen(true)}>
                        <Menu size={24} />
                    </button>
                    {/* Placeholder agar judul di tengah */}
                    <div className="w-6"></div> 
                </header>

                {/* Konten halaman dengan scroll internal */}
                <main className="flex-1 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}