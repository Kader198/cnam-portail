import React from 'react';
import { Head, Link } from '@inertiajs/react';
import RoleForm from '@/components/roles/role-form';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Role Management',
        href: '/roles',
    },
];

interface Role {
    role_id: number;
    role_name: string;
    role_name_ar: string;
    description: string;
    description_ar: string;
    permission_level: number;
}

interface Props {
    role: Role;
}

export default function RoleEdit({ role }: Props) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Role" />

      <div className="py-3">
        <div className="mx-auto sm:px-6 lg:px-4">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <div className="flex items-center gap-4 mb-6">
                <Link href={route('roles.index')}>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                </Link>
                <h2 className="text-lg font-medium">Edit Role</h2>
              </div>
              <RoleForm mode="edit" role={role} />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
} 