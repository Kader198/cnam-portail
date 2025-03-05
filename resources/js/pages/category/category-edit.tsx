import React from 'react';
import { Head, Link } from '@inertiajs/react';
import {CategoryForm} from '@/components/categories/category-form';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Category Management',
        href: '/categories',
    },
];

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
    category: Category;
}

export default function CategoryEdit({ category }: Props) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Category" />

      <div className="py-3">
        <div className="mx-auto sm:px-6 lg:px-4">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <div className="flex items-center gap-4 mb-6">
                <Link href={route('categories.index')}>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                </Link>
                <h2 className="text-lg font-medium">Edit Category</h2>
              </div>
              <CategoryForm mode="edit" category={category} />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
} 