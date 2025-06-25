import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { PageProps as InertiaPageProps } from '@inertiajs/core';
import { Trash2, FilePenLine } from 'lucide-react'; // Impor ikon untuk konsistensi

// 1. Definisikan tipe data yang lebih akurat
interface Publication {
    id: number;
    title: string;
    year: number;
    doi: string; // Diubah dari doi_link untuk konsistensi
    file_url: string | null; // Gunakan file_url dari accessor
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

// 2. Perbarui PageProps untuk mencerminkan objek Paginator
interface PageProps extends InertiaPageProps {
    publications: {
        data: Publication[];
        links: PaginationLink[];
    };
    success?: string;
}

// Komponen untuk tombol-tombol paginasi
const Pagination = ({ links }: { links: PaginationLink[] }) => (
    <div className="mt-6 flex justify-center">
        <nav className="inline-flex rounded-md shadow-sm -space-x-px">
            {links.map((link, index) => (
                <Link
                    key={index}
                    href={link.url || '#'}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-medium border
                        ${link.active ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'}
                        ${!link.url ? 'bg-gray-100 cursor-not-allowed' : ''}
                    `}
                    as="button"
                    disabled={!link.url}
                />
            ))}
        </nav>
    </div>
);

export default function Index() {
    // 3. Ambil data paginasi dari props
    const { publications, success } = usePage<PageProps>().props;

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this publication?')) {
            router.delete(route('admin.publication.destroy', id));
        }
    };

    return (
        <AppLayout>
            <Head title="Publications" />
            <div className="flex justify-between items-center my-4 px-4">
                <h1 className="text-2xl font-bold">Publications</h1>
                <Link href={route('admin.publication.create')}>
                    <Button>Add Publication</Button>
                </Link>
            </div>

            {success && (
                <div className="mx-4 mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg" role="alert">
                    {success}
                </div>
            )}

            <div className="px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {/* 4. Pastikan kita map melalui 'publications.data' */}
                    {publications.data.length > 0 ? (
                        publications.data.map((item) => (
                            <div key={item.id} className="p-4 border rounded bg-background shadow-sm flex flex-col">
                                <div className="flex-grow">
                                    <h3 className="text-lg font-semibold">{item.title}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Year: {item.year}</p>
                                    
                                    {/* Link untuk DOI */}
                                    {item.doi && (
                                        <a href={item.doi} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 underline hover:text-blue-800">
                                            View DOI
                                        </a>
                                    )}

                                    {/* Link untuk PDF */}
                                    {item.file_url && (
                                        <a href={item.file_url} target="_blank" rel="noopener noreferrer" className="block mt-1 text-sm text-green-600 underline hover:text-green-800">
                                            View PDF
                                        </a>
                                    )}
                                </div>
                                <div className="mt-4 flex gap-2 pt-3 border-t">
                                    <Link href={route('admin.publication.edit', item.id)}>
                                        <Button variant="secondary" size="sm">Edit</Button>
                                    </Link>
                                    <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)}>
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center col-span-full text-gray-500 dark:text-gray-400 py-10">
                            No publications found.
                        </p>
                    )}
                </div>
                
                {/* 5. Tampilkan komponen Pagination */}
                {publications.data.length > 0 && <Pagination links={publications.links} />}
            </div>
        </AppLayout>
    );
}