// resources/js/Pages/Gallery/Edit.tsx

import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import GalleryForm from './GalleryForm';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs = (id: number): BreadcrumbItem[] => [
  {
    title: 'Edit Album',
    href: `/gallery/${id}/edit`,
  },
];

export default function Edit({ gallery }: { gallery: any }) {
  return (
    <AppLayout breadcrumbs={breadcrumbs(gallery.id)}>
      <Head title="Edit Album" />
      <div className="w-8/12 p-4">
        <GalleryForm gallery={gallery} />
      </div>
    </AppLayout>
  );
}
