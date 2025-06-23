import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import ProjectForm from './ProjectForm';

export default function Create({ clients, fields }: { clients: any[], fields:any[] }) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Create Project', href: '/project/create' }]}>
            <Head title="Create Project" />
            <div className="p-4 w-full md:w-2/3">
                <ProjectForm clients={clients} fields={fields}/>
            </div>
        </AppLayout>
    );
}
