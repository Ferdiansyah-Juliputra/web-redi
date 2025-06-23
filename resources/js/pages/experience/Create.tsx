import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import ExperienceForm from './ExperienceForm';

type Option = { value: number; label: string };

export default function Create({
  clients,
  fields,
  provinces,
}: {
  clients: Option[];
  fields: Option[];
  provinces: Option[];
}) {
  return (
    <AppLayout breadcrumbs={[{ title: 'Add a New Experience', href: '/experience/create' }]}>
      <Head title="Add a New Experience" />
      <div className="p-4 w-full md:w-2/3">
        <ExperienceForm clients={clients} fields={fields} provinces={provinces} />
      </div>
    </AppLayout>
  );
}
