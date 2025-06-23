import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { PageProps as InertiaPageProps } from '@inertiajs/core';

interface Publication {
  id: number;
  title: string;
  year: number;
  doi_link: string;
  pdf_path: string | null;
}

interface PageProps extends InertiaPageProps {
  publications: Publication[];
}

export default function Index() {
  const { publications } = usePage<PageProps>().props;

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this publication?')) {
      router.delete(route('publication.destroy', id));
    }
  };

  return (
    <AppLayout>
      <Head title="Publications" />
      <div className="flex justify-between items-center my-4 px-4">
        <h1 className="text-2xl font-bold">Publications</h1>
        <Link href={route('publication.create')}>
          <Button>Add Publication</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4">
        {publications.length > 0 ? (
          publications.map((item) => (
            <div key={item.id} className="p-4 border rounded bg-background shadow-sm">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Year: {item.year}</p>

              <a
                href={item.doi_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 underline"
              >
                View DOI
              </a>

              {item.pdf_path && (
                <a
                  href={`/storage/${item.pdf_path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-1 text-sm text-green-600 underline"
                >
                  View PDF
                </a>
              )}

              <div className="mt-3 flex gap-2">
                <Link href={route('publication.edit', item.id)}>
                  <Button variant="secondary">Edit</Button>
                </Link>
                <Button variant="destructive" onClick={() => handleDelete(item.id)}>
                  Delete
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500 dark:text-gray-400">
            No publications found.
          </p>
        )}
      </div>
    </AppLayout>
  );
}
