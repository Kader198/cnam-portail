import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { BreadcrumbItem } from '@/types';
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
import { Plus, Pencil, Trash2, Users, Search, Filter } from 'lucide-react';
import toast from 'react-hot-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('all');

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.get(
      route('roles.index'),
      { search: searchQuery, level: levelFilter },
      { preserveState: true }
    );
  };

  const handleFilterChange = (value: string) => {
    setLevelFilter(value);
    router.get(
      route('roles.index'),
      { search: searchQuery, level: value },
      { preserveState: true }
    );
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Role Management" />

      <div className="py-3">
        <div className="mx-auto sm:px-6 lg:px-4">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <div className="flex justify-between mb-4">
                <h3 className="text-lg font-medium">Roles List</h3>
                <Link href={route('roles.create')}>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Role
                  </Button>
                </Link>
              </div>

              {/* Search and Filters */}
              <form onSubmit={handleSearch} className="mb-6 flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="Search roles..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={levelFilter} onValueChange={handleFilterChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                      <SelectItem key={level} value={level.toString()}>
                        Level {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button type="submit">
                  <Filter className="w-4 h-4 mr-2" />
                  Apply Filters
                </Button>
              </form>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Permission Level</TableHead>
                      <TableHead>Users</TableHead>
                      <TableHead>Created At</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {roles.data.map((role) => (
                      <TableRow key={role.role_id}>
                        <TableCell>
                          <div className="font-medium">{role.role_name}</div>
                          <div className="text-sm text-gray-500">{role.role_name_ar}</div>
                        </TableCell>
                        <TableCell>
                          <div>{role.description}</div>
                          <div className="text-sm text-gray-500">{role.description_ar}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            Level {role.permission_level}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {role.users_count} users
                          </div>
                        </TableCell>
                        <TableCell>
                          {format(new Date(role.created_at), 'MMM d, yyyy')}
                        </TableCell>
                        <TableCell>
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
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing {roles.from} to {roles.to} of {roles.total} results
                </div>
                <div className="flex space-x-2">
                  {roles.links.map((link, index) => (
                    <Button
                      key={index}
                      variant={link.active ? 'default' : 'outline'}
                      onClick={() => router.get(link.url)}
                      disabled={!link.url}
                    >
                      {link.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Role</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete role "{roleToDelete?.role_name}"? This action cannot be undone.
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