import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { BreadcrumbItem } from '@/types';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { Menu, Pencil, Trash2, List } from 'lucide-react';
import toast from 'react-hot-toast';
import { DataTable, Column } from '@/components/ui/data-table';
import { DeleteConfirmationDialog } from '@/components/delete-confirmation-dialog';

interface MenuItem {
  menu_id: number;  
  menu_name: string;
  menu_name_ar: string;
  location: string;
  is_active: boolean;
  items_count: number;
  created_at: string;
}

interface Props {
  menus: {
    data: MenuItem[];
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
    title: 'Menu Management',
    href: '/menus',
  },
];

export default function MenuList({ menus }: Props) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [menuToDelete, setMenuToDelete] = useState<MenuItem | null>(null);

  const handleDeleteClick = (menu: MenuItem) => {
    setMenuToDelete(menu);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (menuToDelete) {
      router.delete(route('menus.destroy', menuToDelete.menu_id), {
        onSuccess: () => {
          toast.success('Menu deleted successfully');
          setDeleteDialogOpen(false);
          setMenuToDelete(null);
        },
        onError: () => {
          toast.error('Failed to delete menu');
        },
      });
    }
  };

  const columns: Column<MenuItem>[] = [
    {
      header: 'Name',
      accessorKey: 'menu_name',
      cell: (menu) => (
        <div>
          <div className="font-medium">{menu.menu_name}</div>
          <div className="text-sm text-gray-500">{menu.menu_name_ar}</div>
        </div>
      ),
    },
    {
      header: 'Location',
      accessorKey: 'location',
      cell: (menu) => menu.location,
    },
    {
      header: 'Status',
      accessorKey: 'is_active',
      cell: (menu) => (
        <Badge variant={menu.is_active ? 'default' : 'destructive'}>
          {menu.is_active ? 'Active' : 'Inactive'}
        </Badge>
      ),
    },
    {
      header: 'Items',
      accessorKey: 'items_count',
      cell: (menu) => (
        <Link href={route('menu-items.index', menu.menu_id)}>
          <div className="flex items-center">
            <List className="w-4 h-4 mr-1" />
            {menu.items_count} items
          </div>
        </Link>
      ),
    },
    {
      header: 'Created At',
      accessorKey: 'created_at',
      cell: (menu) => new Date(menu.created_at).toLocaleDateString(),
    },
    {
      header: 'Actions',
      accessorKey: 'menu_id',
      cell: (menu) => (
        <div className="flex space-x-2">
          <Link
            href={route('menus.edit', menu.menu_id)}
            className="text-indigo-600 hover:text-indigo-900 flex items-center"
          >
            <Pencil className="w-4 h-4 mr-1" />
            Edit
          </Link>
          <button
            onClick={() => handleDeleteClick(menu)}
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
        { value: '1', label: 'Active' },
        { value: '0', label: 'Inactive' },
      ],
    },
    {
      key: 'location',
      label: 'Filter by location',
      options: [
        { value: 'header', label: 'Header' },
        { value: 'footer', label: 'Footer' },
        { value: 'sidebar', label: 'Sidebar' },
      ],
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Menu Management" />

      <div className="py-3">
        <div className="mx-auto sm:px-6 lg:px-4">
          <DataTable
            title="Menus"
            data={menus}
            columns={columns}
            route_name={route('menus.index')}
            searchPlaceholder="Search menus..."
            filters={filters}
            createButton={{
              label: 'Create New Menu',
              href: route('menus.create'),
            }}
          />
        </div>
      </div>

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        title="Delete Menu"
        itemName={menuToDelete?.menu_name}
      />
    </AppLayout>
  );
}
