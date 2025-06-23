import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import FieldForm from './FieldForm';

interface Field {
  id: number;
  field: string; // Sesuai nama kolom di database
}

interface PageProps {
  field: Field;
  [key: string]: unknown;
}

export default function Edit() {
  const { field } = usePage<PageProps>().props;

  return (
    <AppLayout breadcrumbs={[{ title: 'Fields', href: '/field' }]}>
      <Head title="Edit Field" />
      <div className="p-4 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Edit Field</h1>
        <FieldForm field={field} /> {/* FIX: gunakan prop dengan benar */}
      </div>
    </AppLayout>
  );
}
