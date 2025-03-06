import { DeleteConfirmationDialog } from '@/components/delete-confirmation-dialog';
import { Badge } from '@/components/ui/badge';
import { Column, DataTable } from '@/components/ui/data-table';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { ArrowRight, Trash2 } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface MenuItem {
  menu_item_id: number;
  menu_id: number;
  item_title: string;
  item_title_ar: string;
  url: string;
  parent_item_id: number | null;
  display_order: number;
  target: string;
  icon: string | null;
  css_class: string | null;
  is_active: boolean;
  menu: {
    menu_name: string;
  };
  parent?: {
    item_title: string;
  };
}

interface Props {
  menuItems: {
    data: MenuItem[];
    links: any[];
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
    from: number;
    to: number;
  };
  selectedMenuId?: string;
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Menu Management',
    href: '/menus',
  },
  {
    title: 'Menu Items',
    href: '/menu-items',
  },
];

export default function MenuItemsList({ menuItems, selectedMenuId }: Props) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<MenuItem | null>(null);

  const handleDeleteClick = (item: MenuItem) => {
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (itemToDelete) {
      router.delete(route('menu-items.destroy', { menu_item: itemToDelete.menu_item_id }), {
        onSuccess: () => {
          toast.success('Menu item deleted successfully');
          setDeleteDialogOpen(false);
          setItemToDelete(null);
        },
        onError: () => {
          toast.error('Failed to delete menu item');
        },
      });
    }
  };

  const handleToggleStatus = (item: MenuItem) => {
    router.put(route('menu-items.toggle-status', { menu_item: item.menu_item_id }), {}, {
      onSuccess: () => {
        toast.success('Menu item status updated successfully');
      },
      onError: () => {
        toast.error('Failed to update menu item status');
      },
    });
  };

  const columns: Column<MenuItem>[] = [
    {
      header: 'Title',
      accessorKey: 'item_title',
      cell: (item) => (
        <div>
          <div className="font-medium">{item.item_title}</div>
          <div className="text-sm text-gray-500">{item.item_title_ar}</div>
        </div>
      ),
    },
    {
      header: 'Menu',
      accessorKey: 'menu.menu_name',
      cell: (item) => item.menu.menu_name,
    },
    {
      header: 'Parent Item',
      accessorKey: 'parent',
      cell: (item) => item.parent?.item_title || '-',
    },
    {
      header: 'URL',
      accessorKey: 'url',
      cell: (item) => (
        <div className="flex items-center">
          <ArrowRight className="w-4 h-4 mr-1" />
          {item.url}
        </div>
      ),
    },
    {
      header: 'Target',
      accessorKey: 'target',
      cell: (item) => (
        <Badge variant="outline">
          {item.target}
        </Badge>
      ),
    },
    {
      header: 'Order',
      accessorKey: 'display_order',
      cell: (item) => item.display_order,
    },
    {
      header: 'Status',
      accessorKey: 'is_active',
      cell: (item) => (
        <div className="flex items-center space-x-2">
          <Switch
            checked={item.is_active}
            onCheckedChange={() => handleToggleStatus(item)}
          />
          <Badge variant={item.is_active ? 'default' : 'destructive'}>
            {item.is_active ? 'Active' : 'Inactive'}
          </Badge>
        </div>
      ),
    },
    {
      header: 'Actions',
      accessorKey: 'item_id',
      cell: (item) => (
        <div className="flex space-x-2">
          {/* <Link
            href={route('menu-items.edit', { menu_item: item.item_id })}
            className="text-indigo-600 hover:text-indigo-900 flex items-center"
          >
            <Pencil className="w-4 h-4 mr-1" />
            Edit
          </Link> */}
          <button
            onClick={() => handleDeleteClick(item)}
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
      key: 'menu_id',
      label: 'Filter by menu',
      options: [
        { value: '1', label: 'Header Menu' },
        { value: '2', label: 'Footer Menu' },
        { value: '3', label: 'Sidebar Menu' },
      ],
    },
    {
      key: 'target',
      label: 'Filter by target',
      options: [
        { value: '_self', label: 'Same Window' },
        { value: '_blank', label: 'New Window' },
      ],
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Menu Items Management" />

      <div className="py-3">
        <div className="mx-auto sm:px-6 lg:px-4">

          <DataTable
            title="Menu Items"
            data={menuItems}
            columns={columns}
            route_name={route('menu-items.index')}
            searchPlaceholder="Search menu items..."
            filters={filters}
            createButton={{
              label: 'Create New Menu Item',
              href: route('menu-items.create'),
            }}
          />
        </div>
      </div>

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        title="Delete Menu Item"
        itemName={itemToDelete?.item_title}
      />
    </AppLayout>
  );
} 