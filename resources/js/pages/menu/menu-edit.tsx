import { IconSelector } from '@/components/icon-selector';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import React from 'react';
import toast from 'react-hot-toast';

interface Menu {
  menu_id: number;
  menu_name: string;
  menu_name_ar: string;
  location: string;
  is_active: boolean;
  icon: string;
}

interface Props {
  menu: Menu;
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Menu Management',
    href: '/menus',
  },
  {
    title: 'Edit Menu',
    href: '/menus/edit',
  },
];

interface FormData {
  menu_name: string;
  menu_name_ar: string;
  location: string;
  is_active: boolean;
  icon: string;
}

export default function MenuEdit({ menu }: Props) {
  const { data, setData, put, processing, errors } = useForm({
    menu_name: menu.menu_name,
    menu_name_ar: menu.menu_name_ar,
    location: menu.location,
    is_active: menu.is_active,
    icon: menu.icon,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(route('menus.update', menu.menu_id), {
      onSuccess: () => {
        toast.success('Menu updated successfully');
      },
      onError: () => {
        toast.error('Failed to update menu');
      },
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Menu" />

      <div className="py-3">
        <div className="mx-auto sm:px-6 lg:px-4">
          <Card>
            <CardHeader>
              <CardTitle>Edit Menu</CardTitle>
              <CardDescription>
                Update the menu details.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="menu_name">Menu Name (English)</Label>
                    <Input
                      id="menu_name"
                      value={data.menu_name}
                      onChange={e => setData('menu_name', e.target.value)}
                      placeholder="Enter menu name in English"
                      required
                    />
                    {errors.menu_name && (
                      <p className="text-sm text-red-500">{errors.menu_name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="menu_name_ar">Menu Name (Arabic)</Label>
                    <Input
                      id="menu_name_ar"
                      value={data.menu_name_ar}
                      onChange={e => setData('menu_name_ar', e.target.value)}
                      placeholder="Enter menu name in Arabic"
                      required
                    />
                    {errors.menu_name_ar && (
                      <p className="text-sm text-red-500">{errors.menu_name_ar}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Select
                      value={data.location}
                      onValueChange={value => setData('location', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select menu location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="header">Header</SelectItem>
                        <SelectItem value="footer">Footer</SelectItem>
                        <SelectItem value="sidebar">Sidebar</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.location && (
                      <p className="text-sm text-red-500">{errors.location}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="is_active">Status</Label>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="is_active"
                        checked={data.is_active}
                        onCheckedChange={checked => setData('is_active', checked)}
                      />
                      <span className="text-sm text-gray-500">
                        {data.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    {errors.is_active && (
                      <p className="text-sm text-red-500">{errors.is_active}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="icon">Icon</Label>
                    <IconSelector
                      value={data.icon}
                      onChange={(value) => setData('icon', value)}
                    />
                    {errors.icon && (
                      <p className="text-sm text-red-500">{errors.icon}</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => window.history.back()}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={processing}>
                    Update Menu
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
