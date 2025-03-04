import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { BreadcrumbItem, Content } from '@/types';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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

interface Props {
  contents: {
    data: Content[];
    links: any[];
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

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Content Management" />

      <div className="py-3">
        <div className="mx-auto sm:px-6 lg:px-4">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <div className="flex justify-between mb-4">
                <h3 className="text-lg font-medium">Content List</h3>
                <Link href={route('content.create')}>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Content
                  </Button>
                </Link>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Created At</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contents.data.map((content) => (
                      <TableRow key={content.content_id}>
                        <TableCell>
                          <div className="font-medium">{content.title}</div>
                          <div className="text-sm text-gray-500">{content.title_ar}</div>
                        </TableCell>
                        <TableCell>{content.content_type}</TableCell>
                        <TableCell>
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
                        </TableCell>
                        <TableCell>{content.author?.name}</TableCell>
                        <TableCell>
                          {format(new Date(content.created_at), 'MMM d, yyyy')}
                        </TableCell>
                        <TableCell>
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
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="mt-4">
                {/* Add your pagination component here */}
              </div>
            </div>
          </div>
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
