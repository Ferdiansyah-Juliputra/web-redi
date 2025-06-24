// resources/js/Pages/Gallery/GalleryForm.tsx

import { useState, useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type Gallery = {
  id: number;
  title: string;
  year: string;
  description: string;
  image_url?: string;
};

export default function GalleryForm({ gallery }: { gallery?: Gallery }) {
  const isEdit = !!gallery;

  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const { errors } = usePage().props as { errors: Record<string, string> };

  useEffect(() => {
    if (isEdit) {
      setTitle(gallery.title || '');
      setYear(gallery.year?.toString() || '');
      setDescription(gallery.description || '');
    }
  }, [gallery]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('year', year);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }

    if (isEdit) {
      formData.append('_method', 'put');
      router.post(route('admin.gallery.update', gallery.id), formData, {
        forceFormData: true,
        preserveScroll: true,
      });
    } else {
      router.post(route('admin.gallery.store'), formData, {
        forceFormData: true,
        preserveScroll: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="mb-4">
        <Label htmlFor="title">Album Title</Label>
        <Input
          id="title"
          name="title"
          type="text"
          required
          placeholder="Album Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
      </div>

      <div className="mb-4">
        <Label htmlFor="year">Year</Label>
        <Input
          id="year"
          name="year"
          type="number"
          required
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        {errors.year && <p className="text-red-500 text-sm mt-1">{errors.year}</p>}
      </div>

      <div className="mb-4">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          required
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
      </div>

      <div className="mb-4">
        <Label htmlFor="image">
          {isEdit ? 'Replace Image (optional)' : 'Upload Image (JPG/PNG)'}
        </Label>
        <Input
          id="image"
          name="image"
          type="file"
          accept="image/jpeg,image/png"
          onChange={(e) => setImage(e.target.files?.[0] ?? null)}
          required={!isEdit}
        />
        {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
      </div>

      <Button type="submit">{isEdit ? 'Update Gallery' : 'Add to Gallery'}</Button>
    </form>
  );
}
