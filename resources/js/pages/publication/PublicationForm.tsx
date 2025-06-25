import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useForm } from '@inertiajs/react';

interface Props {
    publication?: {
        id: number;
        title: string;
        year: number;
        doi: string; // Diubah dari doi_link
        file_path: string | null; // Diubah dari pdf_path
    };
}

export default function PublicationForm({ publication }: Props) {
    // 1. Sesuaikan nama field di useForm
    const { data, setData, post, processing, errors } = useForm({
        title: publication?.title || '',
        year: publication?.year || new Date().getFullYear(),
        doi: publication?.doi || '', // Diubah dari doi_link
        file: null as File | null, // Diubah dari pdf
        // Tambahkan _method: 'PUT' HANYA jika ini form edit
        ...(publication && { _method: 'PUT' }), 
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // 2. Logika submit yang lebih jelas
        if (publication) {
            // Untuk update, Inertia akan mengirim sebagai POST tapi dengan _method=PUT di dalamnya
            // yang akan ditangkap oleh Laravel sebagai permintaan PUT.
            post(route('admin.publication.update', publication.id), {
                preserveScroll: true,
            });
        } else {
            // Untuk create, ini akan menjadi permintaan POST biasa.
            post(route('admin.publication.store'));
        }
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
                {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
            </div>

            <div>
                <Label htmlFor="year">Year</Label>
                <Input id="year" type="number" value={data.year} onChange={(e) => setData('year', parseInt(e.target.value))} />
                {errors.year && <div className="text-red-500 text-sm mt-1">{errors.year}</div>}
            </div>

            {/* 3. Sesuaikan semua id, htmlFor, dan setData */}
            <div>
                <Label htmlFor="doi">DOI Link</Label>
                <Input id="doi" value={data.doi} onChange={(e) => setData('doi', e.target.value)} />
                {errors.doi && <div className="text-red-500 text-sm mt-1">{errors.doi}</div>}
            </div>

            <div>
                <Label htmlFor="file">PDF File</Label>
                <Input id="file" type="file" accept="application/pdf" onChange={(e) => setData('file', e.target.files?.[0] || null)} />
                {errors.file && <div className="text-red-500 text-sm mt-1">{errors.file}</div>}
            </div>

            <Button type="submit" disabled={processing}>
                {processing ? (publication ? 'Updating...' : 'Adding...') : (publication ? 'Update Publication' : 'Add Publication')}
            </Button>
        </form>
    );
}