import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useForm } from '@inertiajs/react';

interface Props {
  publication?: {
    id: number;
    title: string;
    year: number;
    doi_link: string;
    pdf_path: string | null;
  };
}

export default function PublicationForm({ publication }: Props) {
  const { data, setData, post, processing, errors, reset } = useForm({
    title: publication?.title || '',
    year: publication?.year || new Date().getFullYear(),
    doi_link: publication?.doi_link || '',
    pdf: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    publication
      ? post(route('admin.publication.update', publication.id), { method: 'post' })
      : post(route('admin.publication.store'));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={data.title}
          onChange={(e) => setData('title', e.target.value)}
        />
        {errors.title && <div className="text-red-500">{errors.title}</div>}
      </div>

      <div>
        <Label htmlFor="year">Year</Label>
        <Input
          id="year"
          type="number"
          value={data.year}
          onChange={(e) => setData('year', parseInt(e.target.value))}
        />
        {errors.year && <div className="text-red-500">{errors.year}</div>}
      </div>

      <div>
        <Label htmlFor="doi_link">DOI Link</Label>
        <Input
          id="doi_link"
          value={data.doi_link}
          onChange={(e) => setData('doi_link', e.target.value)}
        />
        {errors.doi_link && <div className="text-red-500">{errors.doi_link}</div>}
      </div>

      <div>
        <Label htmlFor="pdf">PDF File</Label>
        <Input
          id="pdf"
          type="file"
          accept="application/pdf"
          onChange={(e) => setData('pdf', e.target.files?.[0] || null)}
        />
        {errors.pdf && <div className="text-red-500">{errors.pdf}</div>}
      </div>

      <Button type="submit" disabled={processing}>
        {publication ? 'Update Publication' : 'Add Publication'}
      </Button>
    </form>
  );
}
