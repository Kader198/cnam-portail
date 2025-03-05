import React from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface Role {
  role_id: number;
  role_name: string;
  role_name_ar: string;
  description: string;
  description_ar: string;
  permission_level: number;
}

interface Props {
  role?: Role;
  mode: 'create' | 'edit';
}

export default function RoleForm({ role, mode }: Props) {
  const { t } = useTranslation();
  const { data, setData, post, put, processing, errors } = useForm({
    role_name: role?.role_name || '',
    role_name_ar: role?.role_name_ar || '',
    description: role?.description || '',
    description_ar: role?.description_ar || '',
    permission_level: role?.permission_level?.toString() || '1',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'create') {
      post(route('roles.store'), {
        onSuccess: () => {
          toast.success(t('roles.form.messages.create_success'));
        },
        onError: () => {
          toast.error(t('roles.form.messages.create_error'));
        },
      });
    } else {
      put(route('roles.update', role?.role_id), {
        onSuccess: () => {
          toast.success(t('roles.form.messages.update_success'));
        },
        onError: () => {
          toast.error(t('roles.form.messages.update_error'));
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Role Name (English) */}
        <div className="space-y-2">
          <Label htmlFor="role_name">{t('roles.form.role_name')}</Label>
          <Input
            id="role_name"
            value={data.role_name}
            onChange={(e) => setData('role_name', e.target.value)}
            required
          />
          <InputError message={errors.role_name} />
        </div>

        {/* Role Name (Arabic) */}
        <div className="space-y-2">
          <Label htmlFor="role_name_ar">{t('roles.form.role_name_ar')}</Label>
          <Input
            id="role_name_ar"
            value={data.role_name_ar}
            onChange={(e) => setData('role_name_ar', e.target.value)}
            required
          />
          <InputError message={errors.role_name_ar} />
        </div>

        {/* Description (English) */}
        <div className="space-y-2">
          <Label htmlFor="description">{t('roles.form.description')}</Label>
          <Textarea
            id="description"
            value={data.description}
            onChange={(e) => setData('description', e.target.value)}
            required
          />
          <InputError message={errors.description} />
        </div>

        {/* Description (Arabic) */}
        <div className="space-y-2">
          <Label htmlFor="description_ar">{t('roles.form.description_ar')}</Label>
          <Textarea
            id="description_ar"
            value={data.description_ar}
            onChange={(e) => setData('description_ar', e.target.value)}
            required
          />
          <InputError message={errors.description_ar} />
        </div>

        {/* Permission Level */}
        <div className="space-y-2">
          <Label htmlFor="permission_level">{t('roles.form.permission_level')}</Label>
          <Select
            value={data.permission_level}
            onValueChange={(value) => setData('permission_level', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder={t('roles.form.permission_level_placeholder')} />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                <SelectItem key={level} value={level.toString()}>
                  {t('roles.form.permission_level_option', { level })}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <InputError message={errors.permission_level} />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => window.history.back()}
        >
          {t('roles.form.buttons.cancel')}
        </Button>
        <Button type="submit" disabled={processing}>
          {mode === 'create' ? t('roles.form.buttons.create') : t('roles.form.buttons.update')}
        </Button>
      </div>
    </form>
  );
} 