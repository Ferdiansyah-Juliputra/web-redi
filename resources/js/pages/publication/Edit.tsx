import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import PublicationForm from './PublicationForm';
import { PageProps as InertiaPageProps } from '@inertiajs/core';

interface Publication {
  id: number;
  title: string;
  year: number;
  doi_link: string;
  pdf_path: string | null;
}

interface PageProps extends InertiaPageProps {
  publication: Publication;
}

export default function Edit() {
  const { publication } = usePage<PageProps>().props;

  return (
    <AppLayout>
      <Head title="Edit Publication" />
      <div className="max-w-xl mx-auto my-8 p-4 bg-background shadow-md rounded">
        <h1 className="text-2xl font-semibold mb-4">Edit Publication</h1>
        <PublicationForm publication={publication} />
      </div>
    </AppLayout>
  );
}
