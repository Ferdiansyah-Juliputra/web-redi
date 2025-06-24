import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react'; // Fungsi 'route' biasanya sudah tersedia secara global oleh Ziggy

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        // Ganti href manual dengan pemanggilan fungsi route()
        href: route('admin.dashboard'), 
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

                    {/* PERHATIKAN SEMUA PERUBAHAN 'href' DI BAWAH INI */}

                    <Link href={route('admin.gallery.index')} className={cardClass}>
                        <h2 className="text-lg font-semibold">Total Pictures in Gallery</h2>
                        <p className="text-4xl font-bold mt-2">{galleryCount}</p>
                    </Link>

                    <Link href={route('admin.experience.index')} className={cardClass}>
                        <h2 className="text-lg font-semibold">Total Experience Articles</h2>
                        <p className="text-4xl font-bold mt-2">{experienceCount}</p>
                    </Link>

                    <Link href={route('admin.client.index')} className={cardClass}>
                        <h2 className="text-lg font-semibold">Total Clients</h2>
                        <p className="text-4xl font-bold mt-2">{clientCount}</p>
                    </Link>

                    <Link href={route('admin.project.index')} className={cardClass}>
                        <h2 className="text-lg font-semibold">Total Projects</h2>
                        <p className="text-4xl font-bold mt-2">{projectCount}</p>
                    </Link>

                    <Link href={route('admin.publication.index')} className={cardClass}>
                        <h2 className="text-lg font-semibold">Total Published Journals</h2>
                        <p className="text-4xl font-bold mt-2">{publicationCount}</p>
                    </Link>

                    <Link href={route('admin.opportunity.index')} className={cardClass}>
                        <h2 className="text-lg font-semibold">Total Opportunity News</h2>
                        <p className="text-4xl font-bold mt-2">{opportunityCount}</p>
                    </Link>

                    <Link href={route('admin.field.index')} className={cardClass}>
                        <h2 className="text-lg font-semibold">Total Field of Work</h2>
                        <p className="text-4xl font-bold mt-2">{fieldCount}</p>
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}