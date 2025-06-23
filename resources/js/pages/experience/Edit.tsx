import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import ExperienceForm from './ExperienceForm';

type Option = { value: number; label: string };

export default function Edit({
  experience,
  clients,
  fields,
  provinces,
}: {
  experience: any;
  clients: Option[];
  fields: Option[];
  provinces: Option[];
}) {
  return (
    <AppLayout breadcrumbs={[{ title: 'Edit Experience', href: `/experience/${experience.id}/edit` }]}>
      <Head title="Edit Experience" />
      <div className="p-4 w-full md:w-2/3">
        <ExperienceForm
          experience={experience}
          clients={clients}
          fields={fields}
          provinces={provinces}
        />
      </div>
    </AppLayout>
  );
}
