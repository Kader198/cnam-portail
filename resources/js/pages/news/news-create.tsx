import React from 'react';
import { Head } from '@inertiajs/react';
import { BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import NewsForm from '@/components/news/news-form';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'News Management',
    href: '/news',
  },
  {
    title: 'Create News',
    href: '/news/create',
  },
];

export default function NewsCreate() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create News" />

      <div className="py-3">
        <div className="mx-auto sm:px-6 lg:px-4">
          <Card>
            <CardHeader>
              <CardTitle>Create News</CardTitle>
              <CardDescription>
                Create a new news article.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <NewsForm mode="create" />
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
