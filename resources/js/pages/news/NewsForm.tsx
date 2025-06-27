// resources/js/pages/news/Partials/NewsForm.tsx

import React from 'react';
import { useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { InputError } from '@/components/ui/input-error';
import { PlusCircle, XCircle } from 'lucide-react';

// Definisikan tipe data untuk prop 'news'
interface NewsData {
    id?: number;
    title?: string;
    description?: string;
    category?: 'Recruitment' | 'Internship';
    status?: 'OPEN' | 'CLOSE';
    instagram_link?: string;
    start_date?: string;
    end_date?: string;
    requirements?: string[];
}

export default function NewsForm({ news }: { news?: NewsData }) {
    const { data, setData, post, processing, errors } = useForm({
        title: news?.title || '',
        description: news?.description || '',
        category: news?.category || 'Recruitment',
        status: news?.status || 'OPEN',
        instagram_link: news?.instagram_link || '',
        start_date: news?.start_date?.split(' ')[0] || '',
        end_date: news?.end_date?.split(' ')[0] || '',
        requirements: news?.requirements && news.requirements.length > 0 ? news.requirements : [''],
        ...(news && { _method: 'PUT' }),
    });

    const handleAddRequirement = () => { if (data.requirements.length < 10) setData('requirements', [...data.requirements, '']); };
    const handleRequirementChange = (index: number, value: string) => { const newRequirements = [...data.requirements]; newRequirements[index] = value; setData('requirements', newRequirements); };
    const handleRemoveRequirement = (index: number) => { const newRequirements = data.requirements.filter((_, i) => i !== index); if (newRequirements.length === 0) {setData('requirements', ['']);} else {setData('requirements', newRequirements);}};
    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if (news) { post(route('admin.news.update', news.id), { preserveScroll: true }); } else { post(route('admin.news.store')); }};

    return (
        <form onSubmit={handleSubmit} className="space-y-6 news-form">
            <div>
                <Label htmlFor="title" className="font-medium text-gray-700 dark:text-gray-300">Title</Label>
                <Input id="title" value={data.title} onChange={e => setData('title', e.target.value)} placeholder="e.g., Opening for Junior Researcher" className="mt-1 text-gray-900 dark:text-gray-100" />
                <InputError message={errors.title} className="mt-1" />
            </div>

            <div>
                <Label htmlFor="description" className="font-medium text-gray-700 dark:text-gray-300">Description</Label>
                <Textarea id="description" value={data.description} onChange={e => setData('description', e.target.value)} rows={5} placeholder="Enter a brief description..." className="mt-1 text-gray-900 dark:text-gray-100" />
                <InputError message={errors.description} className="mt-1" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <Label htmlFor="category" className="font-medium text-gray-700 dark:text-gray-300">Category</Label>
                    <Select value={data.category} onValueChange={(value: 'Recruitment' | 'Internship') => setData('category', value)}>
                        {/* Tambahkan kelas warna teks di sini */}
                        <SelectTrigger className="mt-1 text-gray-900 dark:text-gray-100">
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Recruitment">Recruitment</SelectItem>
                            <SelectItem value="Internship">Internship</SelectItem>
                        </SelectContent>
                    </Select>
                    <InputError message={errors.category} className="mt-1" />
                </div>
                <div>
                    <Label htmlFor="status" className="font-medium text-gray-700 dark:text-gray-300">Status</Label>
                    <Select value={data.status} onValueChange={(value: 'OPEN' | 'CLOSE') => setData('status', value)}>
                         {/* Tambahkan kelas warna teks di sini */}
                        <SelectTrigger className="mt-1 text-gray-900 dark:text-gray-100">
                            <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="OPEN">OPEN</SelectItem>
                            <SelectItem value="CLOSE">CLOSE</SelectItem>
                        </SelectContent>
                    </Select>
                    <InputError message={errors.status} className="mt-1" />
                </div>
            </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <Label htmlFor="start_date" className="font-medium text-gray-700 dark:text-gray-300">Start Date</Label>
                    {/* Tambahkan kelas warna teks di sini */}
                    <Input id="start_date" type="date" value={data.start_date} onChange={e => setData('start_date', e.target.value)} className="mt-1 text-gray-900 dark:text-gray-100" />
                    <InputError message={errors.start_date} className="mt-1" />
                </div>
                <div>
                    <Label htmlFor="end_date" className="font-medium text-gray-700 dark:text-gray-300">End Date</Label>
                    {/* Tambahkan kelas warna teks di sini */}
                    <Input id="end_date" type="date" value={data.end_date} onChange={e => setData('end_date', e.target.value)} className="mt-1 text-gray-900 dark:text-gray-100" />
                    <InputError message={errors.end_date} className="mt-1" />
                </div>
            </div>

            <div>
                <Label htmlFor="instagram_link" className="font-medium text-gray-700 dark:text-gray-300">Instagram Link (Optional)</Label>
                <Input id="instagram_link" type="url" value={data.instagram_link} onChange={e => setData('instagram_link', e.target.value)} placeholder="https://instagram.com/..." className="mt-1 text-gray-900 dark:text-gray-100" />
                <InputError message={errors.instagram_link} className="mt-1" />
            </div>

            <div>
                <Label className="font-medium text-gray-700 dark:text-gray-300">Requirements (Up to 10)</Label>
                <div className="space-y-2 mt-1">
                    {data.requirements.map((req, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <Input
                                type="text"
                                placeholder={`Requirement #${index + 1}`}
                                value={req}
                                onChange={e => handleRequirementChange(index, e.target.value)}
                                className="text-gray-900 dark:text-gray-100"
                            />
                            {data.requirements.length > 1 && (
                                <Button type="button" variant="destructive" size="icon" onClick={() => handleRemoveRequirement(index)}>
                                    <XCircle size={18} />
                                </Button>
                            )}
                        </div>
                    ))}
                </div>
                 {data.requirements.length < 10 && (
                    <Button type="button" variant="outline" size="sm" className="mt-2" onClick={handleAddRequirement}>
                        <PlusCircle size={16} className="mr-2" />
                        Add Requirement
                    </Button>
                )}
                 <InputError message={errors.requirements} className="mt-1" />
            </div>

            <Button type="submit" disabled={processing}>
                {processing ? 'Saving...' : (news ? 'Update News' : 'Create News')}
            </Button>
        </form>
    );
}