import React from 'react';
import { Head, Link } from '@inertiajs/react';
import UserForm from '@/components/users/user-form';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User Management',
        href: '/users',
    },
];

interface Props {
    roles: Array<{
        role_id: number;
        role_name: string;
        description: string;
    }>;
}

export default function UserCreate({ roles }: Props) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create User" />

      <div className="py-3">
        <div className="mx-auto sm:px-6 lg:px-4">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <div className="flex items-center gap-4 mb-6">
                <Link href={route('users.index')}>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                </Link>
                <h2 className="text-lg font-medium">Create New User</h2>
              </div>
              <UserForm mode="create" roles={roles} />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
