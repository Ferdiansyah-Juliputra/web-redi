import { useState, useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Client = {
  id: number;
  name: string;
  image_path?: string;
};

export default function ClientForm({ client }: { client?: Client }) {
  const isEdit = !!client;

  const [name, setName] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const { errors } = usePage().props as { errors: Record<string, string> };

  useEffect(() => {
    if (isEdit && client) {
      setName(client.name || '');
    }
  }, [client]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    if (image) {
      formData.append('image', image);
    }

    if (isEdit) {
      formData.append('_method', 'put');
      router.post(route('admin.client.update', client.id), formData, {
        forceFormData: true,
        preserveScroll: true,
      });
    } else {
      router.post(route('admin.client.store'), formData, {
        forceFormData: true,
        preserveScroll: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="mb-4">
        <Label htmlFor="name">Client Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Client Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div className="mb-4">
        <Label htmlFor="image">
          {isEdit ? 'Replace Logo (optional)' : 'Upload Client Logo (JPG/PNG)'}
        </Label>
        <Input
          id="image"
          name="image"
          type="file"
          accept="image/jpeg,image/png,image/svg"
          onChange={(e) => setImage(e.target.files?.[0] ?? null)}
          required={!isEdit}
        />
        {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
      </div>

      <Button type="submit">{isEdit ? 'Update Client' : 'Add Client'}</Button>
    </form>
  );
}
