import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Menu } from '@/types';

interface MenuItem {
  item_id?: number;
  menu_id: number;
  item_title: string;
  item_title_ar: string;
  url: string;
  parent_item_id: number | null;
  display_order: number;
  target: string;
  icon: string | null;
  css_class: string | null;
}

interface Props {
  menuItem?: MenuItem;
  menus: Menu[];
  parentItems: MenuItem[];
  mode: 'create' | 'edit';
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
  {
    title: 'Create Menu Item',
    href: '#',
  },
];

export default function MenuItemForm({ menuItem, menus, parentItems, mode }: Props) {
  const { data, setData, post, put, processing, errors } = useForm<MenuItem>({
    menu_id: menuItem?.menu_id || '',
    item_title: menuItem?.item_title || '',
    item_title_ar: menuItem?.item_title_ar || '',
    url: menuItem?.url || '',
    parent_item_id: menuItem?.parent_item_id || null,
    display_order: menuItem?.display_order || 0,
    target: menuItem?.target || '_self',
    icon: menuItem?.icon || '',
    css_class: menuItem?.css_class || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'create') {
      post(route('menu-items.store'));
    } else {
      put(route('menu-items.update', menuItem?.item_id));
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={mode === 'create' ? 'Create Menu Item' : 'Edit Menu Item'} />

      <div className="py-3">
        <div className="mx-auto sm:px-6 lg:px-4">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="menu_id">Menu</Label>
                    <Select
                      value={data.menu_id.toString()}
                      onValueChange={(value) => setData('menu_id', parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a menu" />
                      </SelectTrigger>
                      <SelectContent>
                        {menus.map((menu) => (
                          <SelectItem key={menu.menu_id} value={menu.menu_id.toString()}>
                            {menu.menu_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.menu_id && (
                      <p className="text-sm text-red-600">{errors.menu_id}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="parent_item_id">Parent Item</Label>
                    <Select
                      value={data.parent_item_id?.toString() || ''}
                      onValueChange={(value) => setData('parent_item_id', value ? parseInt(value) : null)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a parent item" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">None</SelectItem>
                        {parentItems.map((item) => (
                          <SelectItem key={item.item_id} value={item.item_id.toString()}>
                            {item.item_title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.parent_item_id && (
                      <p className="text-sm text-red-600">{errors.parent_item_id}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="item_title">Title (English)</Label>
                    <Input
                      id="item_title"
                      value={data.item_title}
                      onChange={(e) => setData('item_title', e.target.value)}
                    />
                    {errors.item_title && (
                      <p className="text-sm text-red-600">{errors.item_title}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="item_title_ar">Title (Arabic)</Label>
                    <Input
                      id="item_title_ar"
                      value={data.item_title_ar}
                      onChange={(e) => setData('item_title_ar', e.target.value)}
                    />
                    {errors.item_title_ar && (
                      <p className="text-sm text-red-600">{errors.item_title_ar}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="url">URL</Label>
                    <Input
                      id="url"
                      value={data.url}
                      onChange={(e) => setData('url', e.target.value)}
                    />
                    {errors.url && (
                      <p className="text-sm text-red-600">{errors.url}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="target">Target</Label>
                    <Select
                      value={data.target}
                      onValueChange={(value) => setData('target', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select target" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="_self">Same Window</SelectItem>
                        <SelectItem value="_blank">New Window</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.target && (
                      <p className="text-sm text-red-600">{errors.target}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="display_order">Display Order</Label>
                    <Input
                      id="display_order"
                      type="number"
                      value={data.display_order}
                      onChange={(e) => setData('display_order', parseInt(e.target.value))}
                    />
                    {errors.display_order && (
                      <p className="text-sm text-red-600">{errors.display_order}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="icon">Icon</Label>
                    <Input
                      id="icon"
                      value={data.icon || ''}
                      onChange={(e) => setData('icon', e.target.value)}
                    />
                    {errors.icon && (
                      <p className="text-sm text-red-600">{errors.icon}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="css_class">CSS Class</Label>
                    <Input
                      id="css_class"
                      value={data.css_class || ''}
                      onChange={(e) => setData('css_class', e.target.value)}
                    />
                    {errors.css_class && (
                      <p className="text-sm text-red-600">{errors.css_class}</p>
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
                    {mode === 'create' ? 'Create Menu Item' : 'Update Menu Item'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
} 