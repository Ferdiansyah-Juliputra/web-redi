import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { router, usePage } from '@inertiajs/react';

interface Field {
  id?: number;
  field: string;
}

interface FieldFormProps {
  field?: Field;
}

export default function FieldForm({ field }: FieldFormProps) {
  const isEdit = !!field;
  const [fieldName, setFieldName] = useState('');
  const { errors } = usePage().props as { errors: Record<string, string> };

  useEffect(() => {
    if (field) {
      setFieldName(field.field); // gunakan field.field karena itu nama kolom di DB
    }
  }, [field]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { field: fieldName };

    if (isEdit && field?.id) {
      router.put(route('field.update', field.id), data);
    } else {
      router.post(route('field.store'), data);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="field">Field Name</Label>
        <Input
          id="field"
          value={fieldName}
          onChange={(e) => setFieldName(e.target.value)}
          placeholder="Enter field name"
          required
        />
        {errors.field && <p className="text-red-500 text-sm">{errors.field}</p>}
      </div>
      <Button type="submit">{isEdit ? 'Update Field' : 'Add Field'}</Button>
    </form>
  );
}
