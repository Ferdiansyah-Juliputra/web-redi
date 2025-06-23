import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import FieldForm from './FieldForm';

export default function Create() {
  return (
    <AppLayout breadcrumbs={[{ title: 'Fields', href: '/field' }]}>
      <Head title="Add Field" />
      <div className="p-4 max-w-xl">
        <h1 className="text-2xl font-bold mb-4">Add New Field</h1>
        <FieldForm />
      </div>
    </AppLayout>
  );
}
