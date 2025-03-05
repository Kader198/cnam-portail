import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import toast from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Glossary Management',
    href: '/glossary',
  },
  {
    title: 'Create Term',
    href: '/glossary/create',
  },
];

interface FormData {
  term: string;
  term_ar: string;
  definition: string;
  definition_ar: string;
  first_letter: string;
  first_letter_ar: string;
  display_order: number;
}

export default function GlossaryCreate() {
  const { data, setData, post, processing, errors } = useForm({
    term: '',
    term_ar: '',
    definition: '',
    definition_ar: '',
    first_letter: '',
    first_letter_ar: '',
    display_order: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('glossary.store'), {
      onSuccess: () => {
        toast.success('Glossary term created successfully');
      },
      onError: () => {
        toast.error('Failed to create glossary term');
      },
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Glossary Term" />

      <div className="py-3">
        <div className="mx-auto sm:px-6 lg:px-4">
          <Card>
            <CardHeader>
              <CardTitle>Create New Glossary Term</CardTitle>
              <CardDescription>
                Add a new term to your website glossary.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="term">Term (English)</Label>
                    <Input
                      id="term"
                      value={data.term}
                      onChange={e => setData('term', e.target.value)}
                      placeholder="Enter term in English"
                      required
                    />
                    {errors.term && (
                      <p className="text-sm text-red-500">{errors.term}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="term_ar">Term (Arabic)</Label>
                    <Input
                      id="term_ar"
                      value={data.term_ar}
                      onChange={e => setData('term_ar', e.target.value)}
                      placeholder="Enter term in Arabic"
                      required
                    />
                    {errors.term_ar && (
                      <p className="text-sm text-red-500">{errors.term_ar}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="first_letter">First Letter (English)</Label>
                    <Input
                      id="first_letter"
                      value={data.first_letter}
                      onChange={e => setData('first_letter', e.target.value)}
                      placeholder="Enter first letter in English"
                      maxLength={1}
                      required
                    />
                    {errors.first_letter && (
                      <p className="text-sm text-red-500">{errors.first_letter}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="first_letter_ar">First Letter (Arabic)</Label>
                    <Input
                      id="first_letter_ar"
                      value={data.first_letter_ar}
                      onChange={e => setData('first_letter_ar', e.target.value)}
                      placeholder="Enter first letter in Arabic"
                      maxLength={1}
                      required
                    />
                    {errors.first_letter_ar && (
                      <p className="text-sm text-red-500">{errors.first_letter_ar}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="display_order">Display Order</Label>
                    <Input
                      id="display_order"
                      type="number"
                      value={data.display_order}
                      onChange={e => setData('display_order', parseInt(e.target.value))}
                      placeholder="Enter display order"
                      required
                    />
                    {errors.display_order && (
                      <p className="text-sm text-red-500">{errors.display_order}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="definition">Definition (English)</Label>
                  <Textarea
                    id="definition"
                    value={data.definition}
                    onChange={e => setData('definition', e.target.value)}
                    placeholder="Enter definition in English"
                    required
                    rows={6}
                  />
                  {errors.definition && (
                    <p className="text-sm text-red-500">{errors.definition}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="definition_ar">Definition (Arabic)</Label>
                  <Textarea
                    id="definition_ar"
                    value={data.definition_ar}
                    onChange={e => setData('definition_ar', e.target.value)}
                    placeholder="Enter definition in Arabic"
                    required
                    rows={6}
                  />
                  {errors.definition_ar && (
                    <p className="text-sm text-red-500">{errors.definition_ar}</p>
                  )}
                </div>

                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => window.history.back()}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={processing}>
                    Create Term
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
