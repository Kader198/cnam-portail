import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { BreadcrumbItem } from '@/types';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { Newspaper, Pencil, Trash2, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import { DataTable, Column } from '@/components/ui/data-table';
import { DeleteConfirmationDialog } from '@/components/delete-confirmation-dialog';
import { format } from 'date-fns';

interface NewsItem {
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
  created_at: string;
}

interface Props {
  news: {
    data: NewsItem[];
    links: any[];
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
    from: number;
    to: number;
  };
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'News Management',
    href: '/news',
  },
];

export default function NewsList({ news }: Props) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [newsToDelete, setNewsToDelete] = useState<NewsItem | null>(null);

  const handleDeleteClick = (newsItem: NewsItem) => {
    setNewsToDelete(newsItem);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (newsToDelete) {
      router.delete(route('news.destroy', newsToDelete.news_id), {
        onSuccess: () => {
          toast.success('News deleted successfully');
          setDeleteDialogOpen(false);
          setNewsToDelete(null);
        },
        onError: () => {
          toast.error('Failed to delete news');
        },
      });
    }
  };

  const columns: Column<NewsItem>[] = [
    {
      header: 'Title',
      accessorKey: 'title',
      cell: (newsItem) => (
        <div>
          <div className="font-medium">{newsItem.title || 'No title'}</div>
          <div className="text-sm text-gray-500">{newsItem.title_ar || 'No Arabic title'}</div>
        </div>
      ),
    },
    {
      header: 'Type',
      accessorKey: 'news_type',
      cell: (newsItem) => (
        <Badge variant="outline">
          {newsItem.news_type || 'N/A'}
        </Badge>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'is_published',
      cell: (newsItem) => (
        <Badge variant={newsItem.is_published ? 'default' : 'destructive'}>
          {newsItem.is_published ? 'Published' : 'Draft'}
        </Badge>
      ),
    },
    {
      header: 'Featured',
      accessorKey: 'featured',
      cell: (newsItem) => (
        newsItem.featured && (
          <Star className="w-4 h-4 text-yellow-500" />
        )
      ),
    },
    {
      header: 'Publication Date',
      accessorKey: 'publication_date',
      cell: (newsItem) => newsItem.publication_date ? format(new Date(newsItem.publication_date), 'MMM d, yyyy') : 'N/A',
    },
    {
      header: 'Author',
      accessorKey: 'author.name',
      cell: (newsItem) => newsItem.author?.name || 'N/A',
    },
    {
      header: 'Actions',
      accessorKey: 'news_id',
      cell: (newsItem) => (
        <div className="flex space-x-2">
          <Link
            href={route('news.edit', newsItem.news_id)}
            className="text-indigo-600 hover:text-indigo-900 flex items-center"
          >
            <Pencil className="w-4 h-4 mr-1" />
            Edit
          </Link>
          <button
            onClick={() => handleDeleteClick(newsItem)}
            className="text-red-600 hover:text-red-900 flex items-center"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Delete
          </button>
        </div>
      ),
    },
  ];

  const filters = [
    {
      key: 'status',
      label: 'Filter by status',
      options: [
        { value: '1', label: 'Published' },
        { value: '0', label: 'Draft' },
      ],
    },
    {
      key: 'type',
      label: 'Filter by type',
      options: [
        { value: 'general', label: 'General' },
        { value: 'announcement', label: 'Announcement' },
        { value: 'event', label: 'Event' },
      ],
    },
    {
      key: 'featured',
      label: 'Filter by featured',
      options: [
        { value: '1', label: 'Featured' },
        { value: '0', label: 'Not Featured' },
      ],
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="News Management" />

      <div className="py-3">
        <div className="mx-auto sm:px-6 lg:px-4">
          <DataTable
            title="News"
            data={news}
            columns={columns}
            route_name={route('news.index')}
            searchPlaceholder="Search news..."
            filters={filters}
            createButton={{
              label: 'Create New News',
              href: route('news.create'),
            }}
          />
        </div>
      </div>

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        title="Delete News"
        itemName={newsToDelete?.title}
      />
    </AppLayout>
  );
}
