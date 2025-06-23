import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import ProjectForm from './ProjectForm';
import { type BreadcrumbItem } from '@/types';

export default function Edit({
  project,
  clients,
  fields,
}: {
  project: any;
  clients: any[];
  fields: any[];
}) {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Edit Project',
      href: `/project/${project.id}/edit`,
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Project" />
      <div className="p-4 w-full md:w-2/3">
        <ProjectForm project={project} clients={clients} fields={fields} />
      </div>
    </AppLayout>
  );
}
