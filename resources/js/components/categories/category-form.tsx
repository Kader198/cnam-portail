import React from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import InputError from '@/components/input-error';
import toast from 'react-hot-toast';

interface Category {
  category_id: number;
  name: string;
  name_ar: string;
  description: string;
  description_ar: string;
  slug: string;
  slug_ar: string;
}

interface Props {
  category?: Category;
  mode: 'create' | 'edit';
}

export const CategoryForm = ({ category, mode }: Props) => {
  const { data, setData, post, put, processing, errors } = useForm({
    name: category?.name || '',
    name_ar: category?.name_ar || '',
    description: category?.description || '',
    description_ar: category?.description_ar || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'create') {
      post(route('categories.store'));
    } else {
      put(route('categories.update', category?.category_id));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name (English)</Label>
          <Input
            id="name"
            value={data.name}
            onChange={e => setData('name', e.target.value)}
            required
          />
          <InputError message={errors.name} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="name_ar">Name (Arabic)</Label>
          <Input
            id="name_ar"
            value={data.name_ar}
            onChange={e => setData('name_ar', e.target.value)}
            required
          />
          <InputError message={errors.name_ar} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description (English)</Label>
          <Textarea
            id="description"
            value={data.description}
            onChange={e => setData('description', e.target.value)}
            required
          />
          <InputError message={errors.description} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description_ar">Description (Arabic)</Label>
          <Textarea
            id="description_ar"
            value={data.description_ar}
            onChange={e => setData('description_ar', e.target.value)}
            required
          />
          <InputError message={errors.description_ar} />
        </div>
      </div>

      <Button type="submit" disabled={processing}>
        {mode === 'create' ? 'Create Category' : 'Update Category'}
      </Button>
    </form>
  );
} 