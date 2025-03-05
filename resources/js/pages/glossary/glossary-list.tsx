import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { BreadcrumbItem } from '@/types';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { Book, Pencil, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { DataTable, Column } from '@/components/ui/data-table';
import { DeleteConfirmationDialog } from '@/components/delete-confirmation-dialog';

interface GlossaryItem {
  glossary_id: number;
  term: string;
  term_ar: string;
  definition: string;
  definition_ar: string;
  first_letter: string;
  first_letter_ar: string;
  display_order: number;
  created_at: string;
}

interface Props {
  glossary: {
    data: GlossaryItem[];
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
    title: 'Glossary Management',
    href: '/glossary',
  },
];

export default function GlossaryList({ glossary }: Props) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [glossaryToDelete, setGlossaryToDelete] = useState<GlossaryItem | null>(null);

  const handleDeleteClick = (glossaryItem: GlossaryItem) => {
    setGlossaryToDelete(glossaryItem);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (glossaryToDelete) {
      router.delete(route('glossary.destroy', glossaryToDelete.glossary_id), {
        onSuccess: () => {
          toast.success('Glossary term deleted successfully');
          setDeleteDialogOpen(false);
          setGlossaryToDelete(null);
        },
        onError: () => {
          toast.error('Failed to delete glossary term');
        },
      });
    }
  };

  const columns: Column<GlossaryItem>[] = [
    {
      header: 'Term',
      accessorKey: 'term',
      cell: (glossaryItem) => (
        <div>
          <div className="font-medium">{glossaryItem.term}</div>
          <div className="text-sm text-gray-500">{glossaryItem.term_ar}</div>
        </div>
      ),
    },
    {
      header: 'Definition',
      accessorKey: 'definition',
      cell: (glossaryItem) => (
        <div>
          <div className="line-clamp-2">{glossaryItem.definition}</div>
          <div className="text-sm text-gray-500 line-clamp-2">{glossaryItem.definition_ar}</div>
        </div>
      ),
    },
    {
      header: 'First Letter',
      accessorKey: 'first_letter',
      cell: (glossaryItem) => (
        <div className="flex items-center space-x-2">
          <Badge variant="outline">{glossaryItem.first_letter}</Badge>
          <Badge variant="outline">{glossaryItem.first_letter_ar}</Badge>
        </div>
      ),
    },
    {
      header: 'Order',
      accessorKey: 'display_order',
      cell: (glossaryItem) => (
        <Badge variant="secondary">
          {glossaryItem.display_order}
        </Badge>
      ),
    },
    {
      header: 'Created At',
      accessorKey: 'created_at',
      cell: (glossaryItem) => new Date(glossaryItem.created_at).toLocaleDateString(),
    },
    {
      header: 'Actions',
      accessorKey: 'glossary_id',
      cell: (glossaryItem) => (
        <div className="flex space-x-2">
          <Link
            href={route('glossary.edit', glossaryItem.glossary_id)}
            className="text-indigo-600 hover:text-indigo-900 flex items-center"
          >
            <Pencil className="w-4 h-4 mr-1" />
            Edit
          </Link>
          <button
            onClick={() => handleDeleteClick(glossaryItem)}
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
      key: 'first_letter',
      label: 'Filter by first letter',
      options: Array.from({ length: 26 }, (_, i) => ({
        value: String.fromCharCode(65 + i),
        label: String.fromCharCode(65 + i),
      })),
    },
    {
      key: 'first_letter_ar',
      label: 'Filter by first letter (Arabic)',
      options: [
        { value: 'ا', label: 'ا' },
        { value: 'ب', label: 'ب' },
        { value: 'ت', label: 'ت' },
        { value: 'ث', label: 'ث' },
        { value: 'ج', label: 'ج' },
        { value: 'ح', label: 'ح' },
        { value: 'خ', label: 'خ' },
        { value: 'د', label: 'د' },
        { value: 'ذ', label: 'ذ' },
        { value: 'ر', label: 'ر' },
        { value: 'ز', label: 'ز' },
        { value: 'س', label: 'س' },
        { value: 'ش', label: 'ش' },
        { value: 'ص', label: 'ص' },
        { value: 'ض', label: 'ض' },
        { value: 'ط', label: 'ط' },
        { value: 'ظ', label: 'ظ' },
        { value: 'ع', label: 'ع' },
        { value: 'غ', label: 'غ' },
        { value: 'ف', label: 'ف' },
        { value: 'ق', label: 'ق' },
        { value: 'ك', label: 'ك' },
        { value: 'ل', label: 'ل' },
        { value: 'م', label: 'م' },
        { value: 'ن', label: 'ن' },
        { value: 'ه', label: 'ه' },
        { value: 'و', label: 'و' },
        { value: 'ي', label: 'ي' },
      ],
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Glossary Management" />

      <div className="py-3">
        <div className="mx-auto sm:px-6 lg:px-4">
          <DataTable
            title="Glossary Terms"
            data={glossary}
            columns={columns}
            route_name={route('glossary.index')}
            searchPlaceholder="Search glossary terms..."
            filters={filters}
            createButton={{
              label: 'Create New Term',
              href: route('glossary.create'),
            }}
          />
        </div>
      </div>

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        title="Delete Glossary Term"
        itemName={glossaryToDelete?.term}
      />
    </AppLayout>
  );
}
