// resources/js/components/ImageWithSkeleton.tsx

import React, { useState } from 'react';

interface ImageWithSkeletonProps {
    src: string;
    alt: string;
    className?: string; // Untuk menerima kelas dari luar (seperti rounded-xl)
}

export default function ImageWithSkeleton({ src, alt, className }: ImageWithSkeletonProps) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="relative w-full h-full">
            {/* Skeleton akan selalu ada, tapi disembunyikan jika gambar sudah dimuat */}
            {isLoading && (
                <div className={`absolute inset-0 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse ${className}`} />
            )}
            
            {/* Gambar asli, tidak terlihat sampai selesai dimuat */}
            <img 
                src={src} 
                alt={alt}
                // Terapkan kelas dari props, dan tambahkan kelas untuk transisi
                className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'} ${className}`}
                // Saat gambar selesai dimuat, set isLoading menjadi false
                onLoad={() => setIsLoading(false)}
            />
        </div>
    );
}