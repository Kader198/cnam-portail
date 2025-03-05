import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { BreadcrumbItem, Content } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import AppLayout from '@/layouts/app-layout';
import { Plus, Pencil, Trash2, CheckCircle2, CircleDashed } from 'lucide-react';
import toast from 'react-hot-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DataTable, Column } from '@/components/ui/data-table';

interface Props {
  contents: {
    data: Content[];
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
    title: 'Content Management',
    href: '/content',
  },
];

export default function ContentList({ contents }: Props) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [contentToDelete, setContentToDelete] = useState<Content | null>(null);

  const handleDeleteClick = (content: Content) => {
    setContentToDelete(content);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (contentToDelete) {
      router.delete(route('content.destroy', contentToDelete.content_id), {
        onSuccess: () => {
          toast.success('Content deleted successfully');
          setDeleteDialogOpen(false);
          setContentToDelete(null);
        },
        onError: () => {
          toast.error('Failed to delete content');
        },
      });
    }
  };

  const columns: Column<Content>[] = [
    {
      header: 'Title',
      accessorKey: 'title',
      cell: (content) => (
        <div>
          <div className="font-medium">{content.title}</div>
          <div className="text-sm text-gray-500">{content.title_ar}</div>
        </div>
      ),
    },
    {
      header: 'Type',
      accessorKey: 'content_type',
      cell: (content) => (
        <Badge variant="outline">
          {content.content_type}
        </Badge>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'is_published',
      cell: (content) => (
        <Badge
          variant={content.is_published ? 'default' : 'secondary'}
        >
          {content.is_published ? (
            <>
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Published
            </>
          ) : (
            <>
              <CircleDashed className="w-3 h-3 mr-1" />
              Draft
            </>
          )}
        </Badge>
      ),
    },
    {
      header: 'Author',
      accessorKey: 'author',
      cell: (content) => content.author?.name || '-',
    },
    {
      header: 'Created At',
      accessorKey: 'created_at',
      cell: (content) => format(new Date(content.created_at), 'MMM d, yyyy'),
    },
    {
      header: 'Actions',
      accessorKey: 'content_id',
      cell: (content) => (
        <div className="flex space-x-2">
          <Link
            href={route('content.edit', content.content_id)}
            className="text-indigo-600 hover:text-indigo-900 flex items-center"
          >
            <Pencil className="w-4 h-4 mr-1" />
            Edit
          </Link>
          <button
            onClick={() => handleDeleteClick(content)}
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
      key: 'type',
      label: 'Filter by type',
      options: [
        { value: 'all', label: 'All Types' },
        { value: 'page', label: 'Page' },
        { value: 'post', label: 'Post' },
        { value: 'news', label: 'News' },
      ],
    },
    {
      key: 'status',
      label: 'Filter by status',
      options: [
        { value: 'all', label: 'All Status' },
        { value: 'published', label: 'Published' },
        { value: 'draft', label: 'Draft' },
      ],
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Content Management" />

      <div className="py-3">
        <div className="mx-auto sm:px-6 lg:px-4">
          <DataTable
            title="Content"
            data={contents}
            columns={columns}
            route_name={route('content.index')}
            searchPlaceholder="Search content..."
            filters={filters}
            createButton={{
              label: 'Create New Content',
              href: route('content.create'),
            }}
          />
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Content</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{contentToDelete?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
