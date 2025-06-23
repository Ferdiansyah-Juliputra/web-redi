// resources/js/Pages/Client/Index.tsx
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage, router } from '@inertiajs/react';

interface Client {
  id: number;
  name: string;
  image_path?: string | null;
  created_at: string;
  updated_at: string;
}

interface PageProps {
  clients: Client[];
  [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Clients', href: '/client' },
];

export default function Index() {
  const { clients } = usePage<PageProps>().props;

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this client?')) {
      router.delete(route('client.destroy', id));
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Clients" />

      <div className="mx-4 my-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Clients</h1>
        <Link href={route('client.create')}>
          <Button>Add Client</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-4 my-4">
        {clients.length > 0 ? (
          clients.map((client) => (
            <div key={client.id} className="border border-black rounded-2xl p-4 relative bg-gray-300">
              {client.image_path && (
                <img
                  src={`/storage/${client.image_path}`}
                  alt={client.name}
                  className="w-full h-32 object-contain rounded mb-2"
                />
              )}
              <h3 className="text-lg font-bold mb-1 text-black">{client.name}</h3>
              <div className="flex gap-2">
                <Link href={route('client.edit', client.id)}>
                  <Button variant="secondary">Edit</Button>
                </Link>
                <Button variant="destructive" onClick={() => handleDelete(client.id)}>
                  Delete
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500 dark:text-gray-400">
            No client found.
          </p>
        )}
      </div>
    </AppLayout>
  );
}
