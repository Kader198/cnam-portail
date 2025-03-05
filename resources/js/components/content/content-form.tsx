import React from 'react';
import { useForm } from '@inertiajs/react';
import { Content } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import LexicalEditor from '@/components/editor/lexical-editor';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

interface Props {
  content?: Content;
  mode: 'create' | 'edit';
}

export default function ContentForm({ content, mode }: Props) {
  const { t } = useTranslation();
  const { data, setData, post, put, processing, errors } = useForm({
    title: content?.title || '',
    title_ar: content?.title_ar || '',
    content_body: content?.content_body || '',
    content_body_ar: content?.content_body_ar || '',
    content_type: content?.content_type || '',
    is_published: content?.is_published || false,
    meta_description: content?.meta_description || '',
    meta_description_ar: content?.meta_description_ar || '',
    keywords: content?.keywords || '',
    keywords_ar: content?.keywords_ar || '',
    featured_image: content?.featured_image || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'create') {
      post(route('content.store'), {
        onSuccess: () => {
          toast.success(t('content.form.messages.create_success'));
        },
        onError: () => {
          toast.error(t('content.form.messages.create_error'));
        },
      });
    } else {
      put(route('content.update', content?.content_id), {
        onSuccess: () => {
          toast.success(t('content.form.messages.update_success'));
        },
        onError: () => {
          toast.error(t('content.form.messages.update_error'));
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* English Title */}
        <div className="space-y-2">
          <Label htmlFor="title">{t('content.form.title_en')}</Label>
          <Input
            id="title"
            value={data.title}
            onChange={(e) => setData('title', e.target.value)}
            required
          />
          {errors.title && (
            <div className="text-sm text-red-600">{errors.title}</div>
          )}
        </div>

        {/* Arabic Title */}
        <div className="space-y-2">
          <Label htmlFor="title_ar">{t('content.form.title_ar')}</Label>
          <Input
            id="title_ar"
            value={data.title_ar}
            onChange={(e) => setData('title_ar', e.target.value)}
            required
          />
          {errors.title_ar && (
            <div className="text-sm text-red-600">{errors.title_ar}</div>
          )}
        </div>

        {/* Content Type */}
        <div className="space-y-2">
          <Label htmlFor="content_type">{t('content.form.content_type')}</Label>
          <Select
            value={data.content_type}
            onValueChange={(value) => setData('content_type', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder={t('content.form.content_type_placeholder')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="article">{t('content.form.content_types.article')}</SelectItem>
              <SelectItem value="news">{t('content.form.content_types.news')}</SelectItem>
              <SelectItem value="page">{t('content.form.content_types.page')}</SelectItem>
              <SelectItem value="announcement">{t('content.form.content_types.announcement')}</SelectItem>
            </SelectContent>
          </Select>
          {errors.content_type && (
            <div className="text-sm text-red-600">{errors.content_type}</div>
          )}
        </div>

        {/* Publication Status */}
        <div className="space-y-2">
          <Label>{t('content.form.publication_status')}</Label>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="is_published"
              checked={data.is_published}
              onCheckedChange={(checked) => setData('is_published', checked as boolean)}
            />
            <Label htmlFor="is_published">{t('content.form.published')}</Label>
          </div>
          {errors.is_published && (
            <div className="text-sm text-red-600">{errors.is_published}</div>
          )}
        </div>

        {/* English Content */}
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="content_body">{t('content.form.content_en')}</Label>
          <LexicalEditor
            value={data.content_body}
            onChange={(value) => setData('content_body', value)}
          />
          {errors.content_body && (
            <div className="text-sm text-red-600">{errors.content_body}</div>
          )}
        </div>

        {/* Arabic Content */}
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="content_body_ar">{t('content.form.content_ar')}</Label>
          <LexicalEditor
            value={data.content_body_ar}
            onChange={(value) => setData('content_body_ar', value)}
            className="min-h-[300px]"
          />
          {errors.content_body_ar && (
            <div className="text-sm text-red-600">{errors.content_body_ar}</div>
          )}
        </div>

        {/* Meta Description (English) */}
        <div className="space-y-2">
          <Label htmlFor="meta_description">{t('content.form.meta_description_en')}</Label>
          <Textarea
            id="meta_description"
            value={data.meta_description}
            onChange={(e) => setData('meta_description', e.target.value)}
            rows={3}
          />
          {errors.meta_description && (
            <div className="text-sm text-red-600">{errors.meta_description}</div>
          )}
        </div>

        {/* Meta Description (Arabic) */}
        <div className="space-y-2">
          <Label htmlFor="meta_description_ar">{t('content.form.meta_description_ar')}</Label>
          <Textarea
            id="meta_description_ar"
            value={data.meta_description_ar}
            onChange={(e) => setData('meta_description_ar', e.target.value)}
            rows={3}
          />
          {errors.meta_description_ar && (
            <div className="text-sm text-red-600">{errors.meta_description_ar}</div>
          )}
        </div>

        {/* Keywords (English) */}
        <div className="space-y-2">
          <Label htmlFor="keywords">{t('content.form.keywords_en')}</Label>
          <Input
            id="keywords"
            value={data.keywords}
            onChange={(e) => setData('keywords', e.target.value)}
            placeholder={t('content.form.keywords_placeholder')}
          />
          {errors.keywords && (
            <div className="text-sm text-red-600">{errors.keywords}</div>
          )}
        </div>

        {/* Keywords (Arabic) */}
        <div className="space-y-2">
          <Label htmlFor="keywords_ar">{t('content.form.keywords_ar')}</Label>
          <Input
            id="keywords_ar"
            value={data.keywords_ar}
            onChange={(e) => setData('keywords_ar', e.target.value)}
            placeholder={t('content.form.keywords_placeholder')}
          />
          {errors.keywords_ar && (
            <div className="text-sm text-red-600">{errors.keywords_ar}</div>
          )}
        </div>

        {/* Featured Image */}
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="featured_image">{t('content.form.featured_image')}</Label>
          <Input
            id="featured_image"
            value={data.featured_image}
            onChange={(e) => setData('featured_image', e.target.value)}
          />
          {errors.featured_image && (
            <div className="text-sm text-red-600">{errors.featured_image}</div>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => window.history.back()}
        >
          {t('content.form.buttons.cancel')}
        </Button>
        <Button type="submit" disabled={processing}>
          {mode === 'create' ? t('content.form.buttons.create') : t('content.form.buttons.update')}
        </Button>
      </div>
    </form>
  );
} 