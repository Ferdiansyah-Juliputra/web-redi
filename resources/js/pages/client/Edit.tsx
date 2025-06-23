// resources/js/Pages/Client/Edit.tsx

import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import ClientForm from './ClientForm';
import { type BreadcrumbItem } from '@/types';

interface EditProps {
  client: {
    id: number;
    name: string;
    image_path?: string;
  };
}

const breadcrumbs = (id: number): BreadcrumbItem[] => [
  {
    title: 'Clients',
    href: '/client',
  },
  {
    title: 'Edit Client',
    href: `/client/${id}/edit`,
  },
];

export default function Edit({ client }: EditProps) {
  return (
    <AppLayout breadcrumbs={breadcrumbs(client.id)}>
      <Head title="Edit Client" />
      <div className="w-full md:w-8/12 p-4">
        <h1 className="text-2xl font-semibold mb-4">Edit Client</h1>
        <ClientForm client={client} />
      </div>
    </AppLayout>
  );
}
