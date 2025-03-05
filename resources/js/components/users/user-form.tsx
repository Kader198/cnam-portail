import React from 'react';
import { useForm } from '@inertiajs/react';
import { User } from '@/types';
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

interface Role {
  role_id: number;
  role_name: string;
  description: string;
}

interface Props {
  user?: User & {
    roles?: Role[];
  };
  mode: 'create' | 'edit';
  roles: Role[];
}

export default function UserForm({ user, mode, roles }: Props) {
  const { t } = useTranslation();
  const { data, setData, post, put, processing, errors } = useForm({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    password_confirmation: '',
    roles: user?.roles?.[0]?.role_id?.toString() || '',
  });

  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'create') {
      post(route('users.store'), {
        onSuccess: () => {
          toast.success(t('users.form.messages.create_success'));
        },
        onError: () => {
          toast.error(t('users.form.messages.create_error'));
        },
      });
    } else {
      put(route('users.update', user?.id), {
        onSuccess: () => {
          toast.success(t('users.form.messages.update_success'));
        },
        onError: () => {
          toast.error(t('users.form.messages.update_error'));
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name">{t('users.form.name')}</Label>
          <Input
            id="name"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            required
          />
          <InputError message={errors.name} />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">{t('users.form.email')}</Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            required
          />
          <InputError message={errors.email} />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password">{t('users.form.password')}</Label>
          <Input
            id="password"
            type="password"
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
            required={mode === 'create'}
          />
          <InputError message={errors.password} />
        </div>

        {/* Password Confirmation */}
        <div className="space-y-2">
          <Label htmlFor="password_confirmation">{t('users.form.password_confirmation')}</Label>
          <Input
            id="password_confirmation"
            type="password"
            value={data.password_confirmation}
            onChange={(e) => setData('password_confirmation', e.target.value)}
            required={mode === 'create'}
          />
          <InputError message={errors.password_confirmation} />
        </div>

        {/* Roles */}
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="roles">{t('users.form.roles')}</Label>
          <Select
            value={data.roles}
            onValueChange={(value) => setData('roles', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder={t('users.form.roles_placeholder')} />
            </SelectTrigger>
            <SelectContent>
              {roles.map((role) => (
                <SelectItem key={role.role_id} value={role.role_id.toString()}>
                  {role.role_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <InputError message={errors.roles} />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => window.history.back()}
        >
          {t('users.form.buttons.cancel')}
        </Button>
        <Button type="submit" disabled={processing}>
          {mode === 'create' ? t('users.form.buttons.create') : t('users.form.buttons.update')}
        </Button>
      </div>
    </form>
  );
} 