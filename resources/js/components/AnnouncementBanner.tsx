// resources/js/components/AnnouncementBanner.tsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Megaphone, X } from 'lucide-react';

// Tipe data untuk satu posisi
interface Position {
    id: number;
    title: string;
}

// Tipe props untuk komponen ini
interface AnnouncementBannerProps {
    positions: Position[];
}

export default function AnnouncementBanner({ positions }: AnnouncementBannerProps) {
    const [isVisible, setIsVisible] = useState(true);

    // Jika tidak ada posisi terbuka atau banner sudah ditutup, jangan render apa-apa
    if (!isVisible || positions.length === 0) {
        return null;
    }

    // Gabungkan judul posisi menjadi satu kalimat yang bisa dibaca
    const positionText = positions.map(p => p.title).join(' & ');

    return (
        <div className="bg-indigo-50 dark:bg-indigo-900/50 p-4 rounded-lg flex items-center justify-between space-x-4 mb-8">
            <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                    <Megaphone className="h-6 w-6 text-indigo-600 dark:text-indigo-300" />
                </div>
                <div>
                    <p className="text-sm font-medium text-indigo-800 dark:text-indigo-200">
                        <span>We're hiring! Now opening: {positionText}.</span>
                        <Link to="/news" className="ml-2 font-bold underline whitespace-nowrap">
                            Apply now &rarr;
                        </Link>
                    </p>
                </div>
            </div>
            <button
                type="button"
                onClick={() => setIsVisible(false)}
                className="flex p-2 rounded-md hover:bg-indigo-200/50 dark:hover:bg-indigo-800/50 focus:outline-none"
            >
                <span className="sr-only">Dismiss</span>
                <X className="h-5 w-5 text-indigo-800 dark:text-indigo-200" aria-hidden="true" />
            </button>
        </div>
    );
}