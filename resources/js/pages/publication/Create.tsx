import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import PublicationForm from './PublicationForm';

export default function Create() {
  return (
    <AppLayout>
      <Head title="Add Publication" />
      <div className="p-4 w-full md:w-2/3">
        <h1 className="text-2xl font-semibold mb-4">Add New Publication</h1>
        <PublicationForm />
      </div>
    </AppLayout>
  );
}
