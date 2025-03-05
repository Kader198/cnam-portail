import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { BreadcrumbItem } from '@/types';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import AppLayout from '@/layouts/app-layout';
import { FolderTree, Pencil, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { DataTable, Column } from '@/components/ui/data-table';
import { DeleteConfirmationDialog } from '@/components/delete-confirmation-dialog';

interface Category {
  category_id: number;
  name: string;
  name_ar: string;
  description: string;
  description_ar: string;
  slug: string;
  slug_ar: string;
  created_at: string;
  contents_count: number;
}

interface Props {
  categories: {
    data: Category[];
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
    title: 'Category Management',
    href: '/categories',
  },
];

export default function CategoryList({ categories }: Props) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

  const handleDeleteClick = (category: Category) => {
    setCategoryToDelete(category);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (categoryToDelete) {
      router.delete(route('categories.destroy', categoryToDelete.category_id), {
        onSuccess: () => {
          toast.success('Category deleted successfully');
          setDeleteDialogOpen(false);
          setCategoryToDelete(null);
        },
        onError: () => {
          toast.error('Failed to delete category');
        },
      });
    }
  };

  const columns: Column<Category>[] = [
    {
      header: 'Name',
      accessorKey: 'name',
      cell: (category) => (
        <div>
          <div className="font-medium">{category.name}</div>
          <div className="text-sm text-gray-500">{category.name_ar}</div>
        </div>
      ),
    },
    {
      header: 'Description',
      accessorKey: 'description',
      cell: (category) => (
        <div>
          <div>{category.description}</div>
          <div className="text-sm text-gray-500">{category.description_ar}</div>
        </div>
      ),
    },
    {
      header: 'Contents',
      accessorKey: 'contents_count',
      cell: (category) => (
        <div className="flex items-center">
          <FolderTree className="w-4 h-4 mr-1" />
          {category.contents_count} contents
        </div>
      ),
    },
    {
      header: 'Created At',
      accessorKey: 'created_at',
      cell: (category) => format(new Date(category.created_at), 'MMM d, yyyy'),
    },
    {
      header: 'Actions',
      accessorKey: 'category_id',
      cell: (category) => (
        <div className="flex space-x-2">
          <Link
            href={route('categories.edit', category.category_id)}
            className="text-indigo-600 hover:text-indigo-900 flex items-center"
          >
            <Pencil className="w-4 h-4 mr-1" />
            Edit
          </Link>
          <button
            onClick={() => handleDeleteClick(category)}
            className="text-red-600 hover:text-red-900 flex items-center"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Category Management" />

      <div className="py-3">
        <div className="mx-auto sm:px-6 lg:px-4">
          <DataTable
            title="Categories"
            data={categories}
            columns={columns}
            route_name={route('categories.index')}
            searchPlaceholder="Search categories..."
            createButton={{
              label: 'Create New Category',
              href: route('categories.create'),
            }}
          />
        </div>
      </div>

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        title="Delete Category"
        itemName={categoryToDelete?.name}
      />
    </AppLayout>
  );
}
