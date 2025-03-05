import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { BreadcrumbItem } from '@/types';
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

interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  roles: Array<{
    role_id: number;
    role_name: string;
    role_name_ar: string;
  }>;
  audit_logs_count: number;
}

interface Props {
  users: {
    data: User[];
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
    title: 'User Management',
    href: '/users',
  },
];

export default function UsersList({ users }: Props) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (userToDelete) {
      router.delete(route('users.destroy', userToDelete.id), {
        onSuccess: () => {
          toast.success('User deleted successfully');
          setDeleteDialogOpen(false);
          setUserToDelete(null);
        },
        onError: () => {
          toast.error('Failed to delete user');
        },
      });
    }
  };

  const columns: Column<User>[] = [
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Email',
      accessorKey: 'email',
    },
    {
      header: 'Roles',
      accessorKey: 'roles',
      cell: (user) => (
        <div className="flex flex-wrap gap-1">
          {user.roles.map((role) => (
            <Badge key={role.role_id} variant="outline">
              {role.role_name}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'email_verified_at',
      cell: (user) => (
        <Badge
          variant={user.email_verified_at ? 'default' : 'secondary'}
        >
          {user.email_verified_at ? (
            <>
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Verified
            </>
          ) : (
            <>
              <CircleDashed className="w-3 h-3 mr-1" />
              Unverified
            </>
          )}
        </Badge>
      ),
    },
    {
      header: 'Activity',
      accessorKey: 'audit_logs_count',
      cell: (user) => (
        <Badge variant="outline">
          {user.audit_logs_count} actions
        </Badge>
      ),
    },
    {
      header: 'Created At',
      accessorKey: 'created_at',
      cell: (user) => format(new Date(user.created_at), 'MMM d, yyyy'),
    },
    {
      header: 'Actions',
      accessorKey: 'id',
      cell: (user) => (
        <div className="flex space-x-2">
          <Link
            href={route('users.edit', user.id)}
            className="text-indigo-600 hover:text-indigo-900 flex items-center"
          >
            <Pencil className="w-4 h-4 mr-1" />
            Edit
          </Link>
          <button
            onClick={() => handleDeleteClick(user)}
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
      key: 'role',
      label: 'Filter by role',
      options: [
        { value: 'all', label: 'All Roles' },
        { value: 'admin', label: 'Admin' },
        { value: 'editor', label: 'Editor' },
        { value: 'user', label: 'User' },
      ],
    },
    {
      key: 'status',
      label: 'Filter by status',
      options: [
        { value: 'all', label: 'All Status' },
        { value: 'verified', label: 'Verified' },
        { value: 'unverified', label: 'Unverified' },
      ],
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="User Management" />

      <div className="py-3">
        <div className="mx-auto sm:px-6 lg:px-4">
          <DataTable
            title="Users"
            data={users}
            columns={columns}
            route_name={route('users.index')}
            searchPlaceholder="Search users..."
            filters={filters}
            createButton={{
              label: 'Create New User',
              href: route('users.create'),
            }}
          />
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete user "{userToDelete?.name}"? This action cannot be undone.
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
