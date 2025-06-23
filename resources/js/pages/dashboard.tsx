import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface DashboardProps {
    galleryCount: number;
    experienceCount: number;
    clientCount: number;
    projectCount: number;
    opportunityCount: number;
    publicationCount: number;
    fieldCount: number;
}

const cardClass =
    'border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border p-4 hover:bg-gray-100 dark:hover:bg-black transition-colors cursor-pointer';

export default function Dashboard({
    galleryCount,
    experienceCount,
    clientCount,
    projectCount,
    opportunityCount,
    publicationCount,
    fieldCount,
}: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <Link href="/gallery" className={cardClass}>
                        <h2 className="text-lg font-semibold">Total Pictures in Gallery</h2>
                        <p className="text-4xl font-bold mt-2">{galleryCount}</p>
                    </Link>

                    <Link href="/experience" className={cardClass}>
                        <h2 className="text-lg font-semibold">Total Experience Articles</h2>
                        <p className="text-4xl font-bold mt-2">{experienceCount}</p>
                    </Link>

                    <Link href="/client" className={cardClass}>
                        <h2 className="text-lg font-semibold">Total Clients</h2>
                        <p className="text-4xl font-bold mt-2">{clientCount}</p>
                    </Link>

                    <Link href="/project" className={cardClass}>
                        <h2 className="text-lg font-semibold">Total Projects</h2>
                        <p className="text-4xl font-bold mt-2">{projectCount}</p>
                    </Link>

                    <Link href="/publication" className={cardClass}>
                        <h2 className="text-lg font-semibold">Total Published Journals</h2>
                        <p className="text-4xl font-bold mt-2">{publicationCount}</p>
                    </Link>

                    <Link href="/opportunity" className={cardClass}>
                        <h2 className="text-lg font-semibold">Total Opportunity News</h2>
                        <p className="text-4xl font-bold mt-2">{opportunityCount}</p>
                    </Link>

                    <Link href="/field" className={cardClass}>
                        <h2 className="text-lg font-semibold">Total Field of Work</h2>
                        <p className="text-4xl font-bold mt-2">{fieldCount}</p>
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}
