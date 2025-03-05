import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import AppLayout from '@/layouts/app-layout';
import { Users, Pencil, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { DataTable, Column } from '@/components/ui/data-table';
import { DeleteConfirmationDialog } from '@/components/delete-confirmation-dialog';

interface Role {
  role_id: number;
  role_name: string;
  role_name_ar: string;
  description: string;
  description_ar: string;
  permission_level: number;
  created_at: string;
  users_count: number;
}

interface Props {
  roles: {
    data: Role[];
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
    title: 'Role Management',
    href: '/roles',
  },
];

export default function RolesList({ roles }: Props) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);

  const handleDeleteClick = (role: Role) => {
    setRoleToDelete(role);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (roleToDelete) {
      router.delete(route('roles.destroy', roleToDelete.role_id), {
        onSuccess: () => {
          toast.success('Role deleted successfully');
          setDeleteDialogOpen(false);
          setRoleToDelete(null);
        },
        onError: () => {
          toast.error('Failed to delete role');
        },
      });
    }
  };

  const columns: Column<Role>[] = [
    {
      header: 'Name',
      accessorKey: 'role_name',
      cell: (role) => (
        <div>
          <div className="font-medium">{role.role_name}</div>
          <div className="text-sm text-gray-500">{role.role_name_ar}</div>
        </div>
      ),
    },
    {
      header: 'Description',
      accessorKey: 'description',
      cell: (role) => (
        <div>
          <div>{role.description}</div>
          <div className="text-sm text-gray-500">{role.description_ar}</div>
        </div>
      ),
    },
    {
      header: 'Permission Level',
      accessorKey: 'permission_level',
      cell: (role) => (
        <Badge variant="outline">
          Level {role.permission_level}
        </Badge>
      ),
    },
    {
      header: 'Users',
      accessorKey: 'users_count',
      cell: (role) => (
        <div className="flex items-center">
          <Users className="w-4 h-4 mr-1" />
          {role.users_count} users
        </div>
      ),
    },
    {
      header: 'Created At',
      accessorKey: 'created_at',
      cell: (role) => format(new Date(role.created_at), 'MMM d, yyyy'),
    },
    {
      header: 'Actions',
      accessorKey: 'role_id',
      cell: (role) => (
        <div className="flex space-x-2">
          <Link
            href={route('roles.edit', role.role_id)}
            className="text-indigo-600 hover:text-indigo-900 flex items-center"
          >
            <Pencil className="w-4 h-4 mr-1" />
            Edit
          </Link>
          <button
            onClick={() => handleDeleteClick(role)}
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
      key: 'level',
      label: 'Filter by level',
      options: Array.from({ length: 10 }, (_, i) => ({
        value: (i + 1).toString(),
        label: `Level ${i + 1}`,
      })),
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Role Management" />

      <div className="py-3">
        <div className="mx-auto sm:px-6 lg:px-4">
          <DataTable
            title="Roles"
            data={roles}
            columns={columns}
            route_name={route('roles.index')}
            searchPlaceholder="Search roles..."
            filters={filters}
            createButton={{
              label: 'Create New Role',
              href: route('roles.create'),
            }}
          />
        </div>
      </div>

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        title="Delete Role"
        itemName={roleToDelete?.role_name}
      />
    </AppLayout>
  );
} 