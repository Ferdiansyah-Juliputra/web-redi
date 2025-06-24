import { useState, useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';
import Select from 'react-select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

type Option = { value: number; label: string };

type ExperienceFormProps = {
  experience?: any;
  clients: Option[];
  fields: Option[];
  provinces: Option[];
};

export default function ExperienceForm({ experience, clients, fields, provinces }: ExperienceFormProps) {
  const isEdit = !!experience;
  const { errors } = usePage().props as { errors: Record<string, string> };

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedClients, setSelectedClients] = useState<Option[]>([]);
  const [selectedField, setSelectedField] = useState<Option | null>(null);
  const [selectedProvinces, setSelectedProvinces] = useState<Option[]>([]);
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    if (isEdit && experience) {
      setTitle(experience.title || '');
      setDescription(experience.description || '');

      if (experience.clients) {
        const matchedClients = clients.filter((c) =>
          experience.clients.some((ec: any) => ec.id === c.value)
        );
        setSelectedClients(matchedClients);
      }

      if (experience.provinces) {
        const matchedProvinces = provinces.filter((p) =>
          experience.provinces.some((ep: any) => ep.id === p.value)
        );
        setSelectedProvinces(matchedProvinces);
      }

      if (experience.field_id) {
        const found = fields.find((f) => f.value === experience.field_id);
        if (found) setSelectedField(found);
      }
    }
  }, [experience]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);

    if (selectedField) {
      formData.append('field_id', String(selectedField.value));
    }

    selectedClients.forEach((client) =>
      formData.append('client_ids[]', String(client.value))
    );
    selectedProvinces.forEach((province) =>
      formData.append('province_ids[]', String(province.value))
    );

    if (image) {
      formData.append('image', image);
    }

    if (isEdit) {
      formData.append('_method', 'put');
      router.post(route('admin.experience.update', experience.id), formData, {
        forceFormData: true,
        preserveScroll: true,
      });
    } else {
      router.post(route('admin.experience.store'), formData, {
        forceFormData: true,
        preserveScroll: true,
      });
    }
  };

  const isDark = typeof window !== 'undefined' &&
    document.documentElement.classList.contains('dark');

  const selectStyles = {
    control: (base: any, state: any) => ({
      ...base,
      backgroundColor: isDark ? '#111827' : '#fff',
      borderColor: state.isFocused ? '#3b82f6' : isDark ? '#374151' : '#d1d5db',
      color: isDark ? '#f9fafb' : '#111827',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#3b82f6',
      },
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: isDark ? '#1f2937' : '#fff',
      color: isDark ? '#f9fafb' : '#111827',
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected
        ? '#3b82f6'
        : state.isFocused
        ? isDark
          ? '#374151'
          : '#e5e7eb'
        : 'transparent',
      color: state.isSelected ? '#fff' : isDark ? '#f9fafb' : '#111827',
      cursor: 'pointer',
    }),
    multiValue: (base: any) => ({
      ...base,
      backgroundColor: isDark ? '#374151' : '#e5e7eb',
    }),
    multiValueLabel: (base: any) => ({
      ...base,
      color: isDark ? '#f9fafb' : '#111827',
    }),
    multiValueRemove: (base: any) => ({
      ...base,
      color: isDark ? '#f9fafb' : '#111827',
      ':hover': {
        backgroundColor: '#ef4444',
        color: 'white',
      },
    }),
    singleValue: (base: any) => ({
      ...base,
      color: isDark ? '#f9fafb' : '#111827',
    }),
    input: (base: any) => ({
      ...base,
      color: isDark ? '#f9fafb' : '#111827',
    }),
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
      <div>
        <Label>Title</Label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
      </div>

      <div>
        <Label>Description</Label>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
      </div>

      <div>
        <Label>Province(s)</Label>
        <Select
          options={provinces}
          value={selectedProvinces}
          onChange={(options) => setSelectedProvinces(options as Option[])}
          isMulti
          styles={selectStyles}
        />
        {errors.province_ids && <p className="text-red-500 text-sm">{errors.province_ids}</p>}
      </div>

      <div>
        <Label>Client(s)</Label>
        <Select
          options={clients}
          value={selectedClients}
          onChange={(options) => setSelectedClients(options as Option[])}
          isMulti
          styles={selectStyles}
        />
        {errors.client_ids && <p className="text-red-500 text-sm">{errors.client_ids}</p>}
      </div>

      <div>
        <Label>Field</Label>
        <Select
          options={fields}
          value={selectedField}
          onChange={(option) => setSelectedField(option)}
          styles={selectStyles}
        />
        {errors.field_id && <p className="text-red-500 text-sm">{errors.field_id}</p>}
      </div>

      <div>
        <Label>Image</Label>
        <Input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} required={!isEdit} />
        {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
      </div>

      <Button type="submit">{isEdit ? 'Update' : 'Create'}</Button>
    </form>
  );
}
