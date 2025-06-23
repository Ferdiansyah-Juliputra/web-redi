// resources/js/Pages/Client/Create.tsx

import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import ClientForm from './ClientForm';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Clients',
    href: '/client',
  },
  {
    title: 'Create',
    href: '/client/create',
  },
];

export default function Create() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Add New Client" />
      <div className="w-full md:w-8/12 p-4">
        <h1 className="text-2xl font-semibold mb-4">Add New Client</h1>
        <ClientForm />
      </div>
    </AppLayout>
  );
}
