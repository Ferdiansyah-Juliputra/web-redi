import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage, router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Projects',
    href: '/project',
  },
];

interface ProjectItem {
  id: number;
  name: string;
  year: number;
  clients: {
    id: number;
    name: string;
  }[];
}

interface PageProps {
  projects: ProjectItem[];
  [key: string]: unknown;
}

export default function Index() {
  const { projects } = usePage<PageProps>().props;

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      router.delete(route('admin.project.destroy', id));
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Projects" />
      <div className="mx-4 my-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <Link href={route('admin.project.create')}>
          <Button>Add Project</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-4 my-4">
        {projects.length > 0 ? (
          projects.map((project) => (
            <div key={project.id} className="border rounded p-4 shadow-sm relative">
              <h3 className="text-lg font-bold mb-1">
                {project.name} ({project.year})
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Client(s):{' '}
                {project.clients.length > 0
                  ? project.clients.map((c) => c.name).join(', ')
                  : 'None'}
              </p>

              <div className="flex gap-2">
                <Link href={route('admin.project.edit', project.id)}>
                  <Button variant="secondary">Edit</Button>
                </Link>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(project.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500 dark:text-gray-400">
            No project found.
          </p>
        )}
      </div>
    </AppLayout>
  );
}
