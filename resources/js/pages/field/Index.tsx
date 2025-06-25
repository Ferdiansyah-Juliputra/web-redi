import { Head, Link, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';

interface Field {
  id: number;
  field: string;
  created_at: string;
  updated_at: string;
}

interface PageProps {
  fields: Field[];
  [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Fields', href: '/field' },
];

export default function Index() {
  const { fields } = usePage<PageProps>().props;

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this field?')) {
      router.delete(route('admin.field.destroy', id));
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Fields" />

      <div className="mx-4 my-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Fields</h1>
        <Link href={route('admin.field.create')}>
          <Button>Add Field</Button>
        </Link>
      </div>

      <div className="mx-4 my-4 bg-white dark:bg-black rounded shadow p-4">
        {fields.length > 0 ? (
          <table className="w-full table-auto text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4">ID</th>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((field) => (
                <tr key={field.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="py-2 px-4">{field.id}</td>
                  <td className="py-2 px-4">{field.field}</td>
                  <td className="py-2 px-4 flex gap-2">
                    <Link href={route('admin.field.edit', field.id)}>
                      <Button variant="secondary">Edit</Button>
                    </Link>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(field.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">No fields found.</p>
        )}
      </div>
    </AppLayout>
  );
}
