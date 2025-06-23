// resources/js/Pages/Gallery/Create.tsx

import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import GalleryForm from './GalleryForm';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Add a New Album',
    href: '/gallery/create',
  },
];

export default function Create() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Add a New Album" />
      <div className="w-8/12 p-4">
        <GalleryForm />
      </div>
    </AppLayout>
  );
}
