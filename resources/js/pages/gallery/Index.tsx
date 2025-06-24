import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage, router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Gallery',
        href: '/gallery',
    },
];

interface GalleryItem {
    id: number;
    title: string;
    year: number;
    description: string;
    image_path: string | null;
    created_at: string;
    updated_at: string;
}

interface PageProps {
    galleries: GalleryItem[];
    [key: string]: unknown;
}

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

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-4 my-4">
                {galleries.length > 0 ? (
                    galleries.map((gallery) => (
                        <div key={gallery.id} className="border rounded p-4 relative">
                            {gallery.image_path && (
                                <img
                                    src={`/storage/${gallery.image_path}`}
                                    alt={gallery.title}
                                    className="w-full h-48 object-cover rounded mb-2"
                                />
                            )}
                            <h3 className="text-lg font-bold mb-1">
                                {gallery.title} ({gallery.year})
                            </h3>
                            <p className="text-sm text-gray-600 mb-3">{gallery.description}</p>

                            <div className="flex gap-2">
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
                    <p className="text-center col-span-full text-gray-500 dark:text-gray-400">
                        No gallery found.
                    </p>
                )}
            </div>
        </AppLayout>
    );
}
