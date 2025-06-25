import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage, router } from '@inertiajs/react';

// 1. Perbarui tipe data breadcrumb agar href bisa menggunakan route()
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Gallery',
        href: route('admin.gallery.index'),
    },
];

// 2. Definisikan tipe data untuk item galeri dan link paginasi
interface GalleryItem {
    id: number;
    title: string;
    year: number;
    description: string;
    image_url: string | null; // Gunakan image_url dari accessor model
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

// 3. Perbarui PageProps untuk mencerminkan objek Paginator dari Laravel
interface PageProps {
    galleries: {
        data: GalleryItem[];
        links: PaginationLink[];
    };
    [key: string]: unknown;
}

// Komponen kecil untuk render tombol-tombol paginasi
const Pagination = ({ links }: { links: PaginationLink[] }) => (
    <div className="mt-6 flex justify-center">
        <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            {links.map((link, index) => (
                <Link
                    key={index}
                    href={link.url || '#'}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-medium border
                        ${link.active ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'}
                        ${!link.url ? 'bg-gray-100 cursor-not-allowed text-gray-400' : ''}
                    `}
                    as="button"
                    disabled={!link.url}
                />
            ))}
        </nav>
    </div>
);


export default function Index() {
    const { galleries } = usePage<PageProps>().props;

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this item?')) {
            router.delete(route('admin.gallery.destroy', id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gallery" />
            <div className="mx-4 my-4 flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Gallery</h1>
                <Link href={route('admin.gallery.create')}>
                    <Button>Add to Gallery</Button>
                </Link>
            </div>

            <div className="mx-4 my-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {/* 4. Pastikan kita map melalui 'galleries.data' */}
                    {galleries.data.length > 0 ? (
                        galleries.data.map((gallery) => (
                            <div key={gallery.id} className="border rounded p-4 relative flex flex-col">
                                {gallery.image_url && (
                                    <img
                                        src={gallery.image_url} // Gunakan image_url
                                        alt={gallery.title}
                                        className="w-full h-48 object-cover rounded mb-2"
                                    />
                                )}
                                <div className="flex-grow">
                                    <h3 className="text-lg font-bold mb-1">
                                        {gallery.title} ({gallery.year})
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-3">{gallery.description}</p>
                                </div>
                                <div className="flex gap-2 mt-auto">
                                    <Link href={route('admin.gallery.edit', gallery.id)}>
                                        <Button variant="secondary">Edit</Button>
                                    </Link>
                                    <Button
                                        variant="destructive"
                                        onClick={() => handleDelete(gallery.id)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center col-span-full text-gray-500">
                            No gallery found.
                        </p>
                    )}
                </div>

                {/* 5. Tampilkan komponen Pagination di bawah grid */}
                {galleries.data.length > 0 && <Pagination links={galleries.links} />}
            </div>
        </AppLayout>
    );
}