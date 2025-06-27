// resources/js/components/HomepageSkeleton.tsx
import React from 'react';

// Komponen kecil untuk membuat kotak abu-abu, agar tidak berulang
const SkeletonBox = ({ className = '' }: { className?: string }) => (
    <div className={`bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse ${className}`} />
);

export default function HomepageSkeleton() {
    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">

            {/* Kolom Kiri (Konten Utama) - Skeleton */}
            <main className="flex-1 overflow-y-auto p-4 sm:p-8 no-scrollbar">
                <div className="max-w-6xl mx-auto">
                    {/* Hero Section Skeleton */}
                    <section className="bg-gray-300 dark:bg-gray-800 p-8 sm:p-10 rounded-xl shadow-2xl animate-pulse">
                        <SkeletonBox className="h-20 w-3/4" />
                        <SkeletonBox className="h-12 w-1/2 mt-12" />
                        <div className="mt-10 flex flex-wrap gap-8 sm:gap-12">
                            <SkeletonBox className="h-16 w-24" />
                            <SkeletonBox className="h-16 w-24" />
                            <SkeletonBox className="h-16 w-24" />
                        </div>
                    </section>

                    {/* Chart Section Skeleton */}
                    <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm">
                            <SkeletonBox className="h-8 w-1/3 mb-4" />
                            <SkeletonBox className="h-48 w-full" />
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center justify-center gap-4 h-full">
                            <SkeletonBox className="h-8 w-1/2" />
                            <div className="bg-gray-200 dark:bg-gray-700 h-48 w-48 rounded-full animate-pulse" />
                        </div>
                    </section>

                    {/* Clients Section Skeleton */}
                    <section className="mt-12 text-center">
                        <SkeletonBox className="h-10 w-1/4 mx-auto" />
                        <div className="mt-8 grid grid-cols-3 sm:grid-cols-5 gap-8 items-center">
                            {Array(5).fill(0).map((_, i) => (
                                <div key={i} className="bg-gray-200 dark:bg-gray-700 h-20 w-20 rounded-full animate-pulse mx-auto" />
                            ))}
                        </div>
                    </section>
                </div>
            </main>

            {/* Kolom Kanan (Sidebar) - Skeleton */}
            <aside className="hidden lg:block w-1/3 xl:w-1/4 border-l border-gray-200 p-8 overflow-y-auto">
                <div className="space-y-6">
                    {Array(3).fill(0).map((_, i) => (
                        <div key={i} className="bg-white rounded-xl shadow overflow-hidden">
                            <SkeletonBox className="h-40 w-full" />
                            <div className="p-4">
                                <SkeletonBox className="h-6 w-3/4" />
                                <SkeletonBox className="h-4 w-full mt-2" />
                                <SkeletonBox className="h-4 w-2/3 mt-1" />
                            </div>
                        </div>
                    ))}
                </div>
            </aside>
        </div>
    );
}