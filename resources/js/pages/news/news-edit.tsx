import React from 'react';
import { Head } from '@inertiajs/react';
import { BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import NewsForm from '@/components/news/news-form';

interface News {
  news_id: number;
  title: string;
  title_ar: string;
  content_body: string;
  content_body_ar: string;
  slug: string;
  slug_ar: string;
  featured_image: string | null;
  meta_description: string;
  meta_description_ar: string;
  keywords: string;
  keywords_ar: string;
  language_code: string;
  publication_date: string;
  news_type: string;
  featured: boolean;
  is_published: boolean;
  author: {
    name: string;
  };
}

interface Props {
  news: News;
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'News Management',
    href: '/news',
  },
  {
    title: 'Edit News',
    href: '/news/edit',
  },
];

export default function NewsEdit({ news }: Props) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit News" />

      <div className="py-3">
        <div className="mx-auto sm:px-6 lg:px-4">
          <Card>
            <CardHeader>
              <CardTitle>Edit News</CardTitle>
              <CardDescription>
                Update the news article details.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <NewsForm news={news} mode="edit" />
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
