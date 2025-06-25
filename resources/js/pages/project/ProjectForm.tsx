import { useState, useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';
import Select from 'react-select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

type Option = { value: number; label: string };

export default function ProjectForm({
  project,
  clients,
  fields,
}: {
  project?: any;
  clients: { id: number; name: string }[];
  fields: { id: number; field: string }[];
}) {
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [selectedClients, setSelectedClients] = useState<Option[]>([]);
  const [selectedField, setSelectedField] = useState<Option | null>(null);
  const { errors } = usePage().props as { errors: Record<string, string> };

  const isEdit = !!project;

  useEffect(() => {
    if (isEdit) {
      setName(project.name || '');
      setYear(project.year?.toString() || '');

      if (project.clients && Array.isArray(project.clients)) {
        const mappedClients = project.clients.map((c: any) => ({
          value: c.id,
          label: c.name,
        }));
        setSelectedClients(mappedClients);
      }

      if (project.field_id && project.field) {
        setSelectedField({
          value: project.field_id,
          label: project.field.field,
        });
      }
    }
  }, [project]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name,
      year,
      client_ids: selectedClients.map(c => c.value),
      field_id: selectedField?.value ?? null,
    };

    if (isEdit) {
      router.put(route('admin.project.update', project.id), payload);
    } else {
      router.post(route('admin.project.store'), payload);
    }
  };

  const clientOptions: Option[] = clients.map((client) => ({
    value: client.id,
    label: client.name,
  }));

  const fieldOptions: Option[] = fields.map((field) => ({
    value: field.id,
    label: field.field,
  }));

  const isDark = typeof window !== 'undefined' &&
    document.documentElement.classList.contains('dark');

  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      backgroundColor: isDark ? '#0f172a' : '#fff', // slate-900
      borderColor: state.isFocused ? '#60a5fa' : isDark ? '#334155' : '#cbd5e1', // blue-400 / slate-700
      color: isDark ? '#f8fafc' : '#1e293b', // slate-50 / slate-800
      boxShadow: state.isFocused ? '0 0 0 1px #60a5fa' : 'none',
      '&:hover': {
        borderColor: '#60a5fa',
      },
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: isDark ? '#1e293b' : '#fff', // slate-800
      color: isDark ? '#f8fafc' : '#1e293b',
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected
        ? '#3b82f6'
        : state.isFocused
        ? isDark
          ? '#334155'
          : '#e2e8f0'
        : 'transparent',
      color: state.isSelected ? '#fff' : isDark ? '#f8fafc' : '#1e293b',
      cursor: 'pointer',
    }),
    multiValue: (base: any) => ({
      ...base,
      backgroundColor: isDark ? '#334155' : '#e5e7eb',
      color: isDark ? '#f8fafc' : '#1e293b',
    }),
    multiValueLabel: (base: any) => ({
      ...base,
      color: isDark ? '#f8fafc' : '#1e293b',
    }),
    singleValue: (base: any) => ({
      ...base,
      color: isDark ? '#f8fafc' : '#1e293b',
    }),
    input: (base: any) => ({
      ...base,
      color: isDark ? '#f8fafc' : '#1e293b',
    }),
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Project Name</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} required />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      <div>
        <Label>Year</Label>
        <Input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />
        {errors.year && <p className="text-red-500 text-sm">{errors.year}</p>}
      </div>

      <div>
        <Label>Clients</Label>
        <Select
          isMulti
          options={clientOptions}
          value={selectedClients}
          onChange={(options) => setSelectedClients(options as Option[])}
          placeholder="Select one or more clients..."
          styles={customStyles}
        />
        {errors.client_ids && (
          <p className="text-red-500 text-sm">{errors.client_ids}</p>
        )}
      </div>

      <div>
        <Label>Field of Work</Label>
        <Select
          options={fieldOptions}
          value={selectedField}
          onChange={(option) => setSelectedField(option)}
          isClearable
          placeholder="Select a field of work..."
          styles={customStyles}
        />
        {errors.field_id && (
          <p className="text-red-500 text-sm">{errors.field_id}</p>
        )}
      </div>

      <Button type="submit">{isEdit ? 'Update' : 'Create'}</Button>
    </form>
  );
}
