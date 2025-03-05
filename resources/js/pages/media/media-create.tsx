import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { useTranslation } from 'react-i18next';

registerPlugin(FilePondPluginImagePreview);

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Media Management',
    href: '/media',
  },
  {
    title: 'Upload Media',
    href: '/media/create',
  },
];

export default function MediaCreate() {
  const { t } = useTranslation();
  const { data, setData, post, processing, errors } = useForm({
    file: null as File | null,
    media_type: 'image',
    alt_text: '',
    alt_text_ar: '',
    title: '',
    title_ar: '',
    description: '',
    description_ar: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('media.store'));
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Upload Media" />

      <div className="py-3">
        <div className="mx-auto sm:px-6 lg:px-4">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* File Upload */}
                  <div className="md:col-span-2">
                    <Label htmlFor="file">{t('media.form.file')}</Label>
                    <FilePond
                      files={data.file ? [data.file] : []}
                      onupdatefiles={(files) => setData('file', files[0]?.file || null)}
                      allowMultiple={false}
                      maxFiles={1}
                      acceptedFileTypes={['image/*', 'video/*', 'application/pdf']}
                      labelIdle={t('media.form.drag_drop_file')}
                      className="mt-2"
                    />
                    {errors.file && (
                      <div className="text-sm text-red-600 mt-1">{errors.file}</div>
                    )}
                  </div>

                  {/* Media Type */}
                  <div>
                    <Label htmlFor="media_type">{t('media.form.media_type')}</Label>
                    <Select
                      value={data.media_type}
                      onValueChange={(value) => setData('media_type', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="image">Image</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                        <SelectItem value="document">Document</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.media_type && (
                      <div className="text-sm text-red-600 mt-1">{errors.media_type}</div>
                    )}
                  </div>

                  {/* Title */}
                  <div>
                    <Label htmlFor="title">{t('media.form.title')}</Label>
                    <Input
                      id="title"
                      value={data.title}
                      onChange={(e) => setData('title', e.target.value)}
                    />
                    {errors.title && (
                      <div className="text-sm text-red-600 mt-1">{errors.title}</div>
                    )}
                  </div>

                  {/* Title (Arabic) */}
                  <div>
                    <Label htmlFor="title_ar">{t('media.form.title_ar')}</Label>
                    <Input
                      id="title_ar"
                      value={data.title_ar}
                      onChange={(e) => setData('title_ar', e.target.value)}
                    />
                    {errors.title_ar && (
                      <div className="text-sm text-red-600 mt-1">{errors.title_ar}</div>
                    )}
                  </div>

                  {/* Alt Text */}
                  <div>
                    <Label htmlFor="alt_text">{t('media.form.alt_text')}</Label>
                    <Input
                      id="alt_text"
                      value={data.alt_text}
                      onChange={(e) => setData('alt_text', e.target.value)}
                    />
                    {errors.alt_text && (
                      <div className="text-sm text-red-600 mt-1">{errors.alt_text}</div>
                    )}
                  </div>

                  {/* Alt Text (Arabic) */}
                  <div>
                    <Label htmlFor="alt_text_ar">{t('media.form.alt_text_ar')}</Label>
                    <Input
                      id="alt_text_ar"
                      value={data.alt_text_ar}
                      onChange={(e) => setData('alt_text_ar', e.target.value)}
                    />
                    {errors.alt_text_ar && (
                      <div className="text-sm text-red-600 mt-1">{errors.alt_text_ar}</div>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <Label htmlFor="description">{t('media.form.description')}</Label>
                    <Textarea
                      id="description"
                      value={data.description}
                      onChange={(e) => setData('description', e.target.value)}
                    />
                    {errors.description && (
                      <div className="text-sm text-red-600 mt-1">{errors.description}</div>
                    )}
                  </div>

                  {/* Description (Arabic) */}
                  <div>
                    <Label htmlFor="description_ar">{t('media.form.description_ar')}</Label>
                    <Textarea
                      id="description_ar"
                      value={data.description_ar}
                      onChange={(e) => setData('description_ar', e.target.value)}
                    />
                    {errors.description_ar && (
                      <div className="text-sm text-red-600 mt-1">{errors.description_ar}</div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => window.history.back()}
                  >
                    {t('common.cancel')}
                  </Button>
                  <Button type="submit" disabled={processing}>
                    {t('common.save')}
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