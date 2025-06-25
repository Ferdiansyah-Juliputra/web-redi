import { Head, Link, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Modal from '@/components/ui/Modal'; 

const breadcrumbs = [
  {
    title: 'Experiences',
    href: '/experience',
  },
];

interface Experience {
  id: number;
  title: string;
  description: string;
  image_path?: string;
  clients: { id: number; name: string }[];
  provinces: { id: number; name: string }[];
  fields: { id: number; name: string }[];
}

interface PageProps {
  experiences: Experience[];
  [key: string]: any;
}

export default function Index() {
  const { experiences } = usePage<PageProps>().props;

  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [showModal, setShowModal] = useState(false);

  const openModal = (experience: Experience) => {
    setSelectedExperience(experience);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedExperience(null);
    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this experience?')) {
      router.delete(route('admin.experience.destroy', id), {
        onSuccess: () => closeModal(),
      });
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Experiences" />
      <div className="mx-4 my-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Experiences</h1>
        <Link href={route('admin.experience.create')}>
          <Button>Add Experience</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-4 my-4">
        {experiences.length > 0 ? (
          experiences.map((experience) => (
            <div
              key={experience.id}
              className="border rounded p-4 shadow-sm relative hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
              onClick={() => openModal(experience)}
            >
              <h3 className="text-lg font-bold mb-1">{experience.title}</h3>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Client(s):</strong>{' '}
                {experience.clients.map((client) => client.name).join(', ')}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Province(s):</strong>{' '}
                {experience.provinces.map((prov) => prov.name).join(', ')}
              </p>


              {experience.image_path && (
                <img
                  src={`/storage/${experience.image_path}`}
                  alt="Experience"
                  className="mb-2 max-h-40 w-full object-cover rounded"
                />
              )}
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500 dark:text-gray-400">
            No experiences found.
          </p>
        )}
      </div>

      {showModal && selectedExperience && (
        <Modal onClose={closeModal}>
          <div className="p-4 space-y-4 max-w-lg">
            <h2 className="text-xl font-bold">{selectedExperience.title}</h2>
            <p className="text-sm text-gray-600">{selectedExperience.description}</p>

            <p>
              <strong>Clients:</strong>{' '}
              {selectedExperience.clients.map((client) => client.name).join(', ')}
            </p>

            <p>
              <strong>Provinces:</strong>{' '}
              {selectedExperience.provinces.map((prov) => prov.name).join(', ')}
            </p>

            {selectedExperience.image_path && (
              <img
                src={`/storage/${selectedExperience.image_path}`}
                alt="Experience"
                className="rounded max-h-60 w-full object-cover"
              />
            )}

            <div className="flex justify-end gap-2 pt-2">
              <Link href={route('admin.experience.edit', selectedExperience.id)}>
                <Button variant="secondary">Edit</Button>
              </Link>
              <Button variant="destructive" onClick={() => handleDelete(selectedExperience.id)}>
                Delete
              </Button>
              <Button onClick={closeModal}>Close</Button>
            </div>
          </div>
        </Modal>
      )}
    </AppLayout>
  );
}
