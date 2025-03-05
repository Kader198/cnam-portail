import React from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
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
import { format } from 'date-fns';
import { FilePond, registerPlugin } from 'react-filepond';
import type { FilePondFile, FilePondErrorDescription, FilePondInitialFile, ActualFileObject } from 'filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(FilePondPluginImagePreview);

interface News {
  news_id?: number;
  title: string;
  title_ar: string;
  content_body: string;
  content_body_ar: string;
  slug: string;
  slug_ar: string;
  featured_image: string | null;
  meta_description: string;
  meta_description_ar: string;
  keywords: string;
  keywords_ar: string;
  language_code: string;
  publication_date: string;
  news_type: string;
  featured: boolean;
  is_published: boolean;
  author: {
    name: string;
  };
  media?: {
    media_id: number;
    file_name: string;
    file_path: string;
  }[];
}

interface Props {
  news?: News;
  mode: 'create' | 'edit';
}

export default function NewsForm({ news, mode }: Props) {
  const { t } = useTranslation();
  const [files, setFiles] = React.useState<(string | FilePondInitialFile | Blob | ActualFileObject)[]>([]);
  const { data, setData, post, put, processing, errors } = useForm({
    title: news?.title || '',
    title_ar: news?.title_ar || '',
    content_body: news?.content_body || '',
    content_body_ar: news?.content_body_ar || '',
    slug: news?.slug || '',
    slug_ar: news?.slug_ar || '',
    featured_image: null as File | null,
    meta_description: news?.meta_description || '',
    meta_description_ar: news?.meta_description_ar || '',
    keywords: news?.keywords || '',
    keywords_ar: news?.keywords_ar || '',
    language_code: news?.language_code || 'en',
    is_published: news?.is_published || false,
    publication_date: news ? format(new Date(news.publication_date), 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'),
    news_type: news?.news_type || 'general',
    featured: news?.featured || false,
  });

  // Initialize FilePond with existing image if in edit mode
  React.useEffect(() => {
    if (news?.media?.[0]) {
      setFiles([{
        source: news.media[0].file_path,
        options: {
          type: 'local',
          file: {
            name: news.media[0].file_name,
            size: 0,
            type: 'image/*'
          }
        }
      }]);
    }
  }, [news]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'create') {
      post(route('news.store'), {
        onSuccess: () => {
          toast.success(t('news.form.messages.create_success'));
        },
        onError: () => {
          toast.error(t('news.form.messages.create_error'));
        },
      });
    } else {
      put(route('news.update', news?.news_id), {
        onSuccess: () => {
          toast.success(t('news.form.messages.update_success'));
        },
        onError: () => {
          toast.error(t('news.form.messages.update_error'));
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* English Title */}
        <div className="space-y-2">
          <Label htmlFor="title">{t('news.form.title_en')}</Label>
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
          <Label htmlFor="title_ar">{t('news.form.title_ar')}</Label>
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

        {/* English Slug */}
        <div className="space-y-2">
          <Label htmlFor="slug">{t('news.form.slug_en')}</Label>
          <Input
            id="slug"
            value={data.slug}
            onChange={(e) => setData('slug', e.target.value)}
            required
          />
          {errors.slug && (
            <div className="text-sm text-red-600">{errors.slug}</div>
          )}
        </div>

        {/* Arabic Slug */}
        <div className="space-y-2">
          <Label htmlFor="slug_ar">{t('news.form.slug_ar')}</Label>
          <Input
            id="slug_ar"
            value={data.slug_ar}
            onChange={(e) => setData('slug_ar', e.target.value)}
            required
          />
          {errors.slug_ar && (
            <div className="text-sm text-red-600">{errors.slug_ar}</div>
          )}
        </div>

        {/* Meta Description English */}
        <div className="space-y-2">
          <Label htmlFor="meta_description">{t('news.form.meta_description_en')}</Label>
          <Textarea
            id="meta_description"
            value={data.meta_description}
            onChange={(e) => setData('meta_description', e.target.value)}
          />
          {errors.meta_description && (
            <div className="text-sm text-red-600">{errors.meta_description}</div>
          )}
        </div>

        {/* Meta Description Arabic */}
        <div className="space-y-2">
          <Label htmlFor="meta_description_ar">{t('news.form.meta_description_ar')}</Label>
          <Textarea
            id="meta_description_ar"
            value={data.meta_description_ar}
            onChange={(e) => setData('meta_description_ar', e.target.value)}
          />
          {errors.meta_description_ar && (
            <div className="text-sm text-red-600">{errors.meta_description_ar}</div>
          )}
        </div>

        {/* Keywords English */}
        <div className="space-y-2">
          <Label htmlFor="keywords">{t('news.form.keywords_en')}</Label>
          <Input
            id="keywords"
            value={data.keywords}
            onChange={(e) => setData('keywords', e.target.value)}
          />
          {errors.keywords && (
            <div className="text-sm text-red-600">{errors.keywords}</div>
          )}
        </div>

        {/* Keywords Arabic */}
        <div className="space-y-2">
          <Label htmlFor="keywords_ar">{t('news.form.keywords_ar')}</Label>
          <Input
            id="keywords_ar"
            value={data.keywords_ar}
            onChange={(e) => setData('keywords_ar', e.target.value)}
          />
          {errors.keywords_ar && (
            <div className="text-sm text-red-600">{errors.keywords_ar}</div>
          )}
        </div>

        {/* Language Code */}
        <div className="space-y-2">
          <Label htmlFor="language_code">{t('news.form.language_code')}</Label>
          <Select
            value={data.language_code}
            onValueChange={(value) => setData('language_code', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder={t('news.form.language_code_placeholder')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="ar">Arabic</SelectItem>
            </SelectContent>
          </Select>
          {errors.language_code && (
            <div className="text-sm text-red-600">{errors.language_code}</div>
          )}
        </div>

        {/* News Type */}
        <div className="space-y-2">
          <Label htmlFor="news_type">{t('news.form.news_type')}</Label>
          <Select
            value={data.news_type}
            onValueChange={(value) => setData('news_type', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder={t('news.form.news_type_placeholder')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">{t('news.form.news_types.general')}</SelectItem>
              <SelectItem value="announcement">{t('news.form.news_types.announcement')}</SelectItem>
              <SelectItem value="event">{t('news.form.news_types.event')}</SelectItem>
            </SelectContent>
          </Select>
          {errors.news_type && (
            <div className="text-sm text-red-600">{errors.news_type}</div>
          )}
        </div>

        {/* Publication Date */}
        <div className="space-y-2">
          <Label htmlFor="publication_date">{t('news.form.publication_date')}</Label>
          <Input
            id="publication_date"
            type="date"
            value={data.publication_date}
            onChange={(e) => setData('publication_date', e.target.value)}
            required
          />
          {errors.publication_date && (
            <div className="text-sm text-red-600">{errors.publication_date}</div>
          )}
        </div>

        {/* Publication Status */}
        <div className="space-y-2">
          <Label>{t('news.form.publication_status')}</Label>
          <div className="flex items-center space-x-2">
            <Switch
              id="is_published"
              checked={data.is_published}
              onCheckedChange={(checked) => setData('is_published', checked)}
            />
            <span className="text-sm text-gray-500">
              {data.is_published ? t('news.form.published') : t('news.form.draft')}
            </span>
          </div>
          {errors.is_published && (
            <div className="text-sm text-red-600">{errors.is_published}</div>
          )}
        </div>

        {/* Featured Status */}
        <div className="space-y-2">
          <Label>{t('news.form.featured_status')}</Label>
          <div className="flex items-center space-x-2">
            <Switch
              id="featured"
              checked={data.featured}
              onCheckedChange={(checked) => setData('featured', checked)}
            />
            <span className="text-sm text-gray-500">
              {data.featured ? t('news.form.featured') : t('news.form.not_featured')}
            </span>
          </div>
          {errors.featured && (
            <div className="text-sm text-red-600">{errors.featured}</div>
          )}
        </div>

        {/* English Content */}
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="content_body">{t('news.form.content_en')}</Label>
          <LexicalEditor
            value={data.content_body}
            onChange={(value) => setData('content_body', value)}
            className="min-h-[400px]"
          />
          {errors.content_body && (
            <div className="text-sm text-red-600">{errors.content_body}</div>
          )}
        </div>

        {/* Arabic Content */}
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="content_body_ar">{t('news.form.content_ar')}</Label>
          <LexicalEditor
            value={data.content_body_ar}
            onChange={(value) => setData('content_body_ar', value)}
            className="min-h-[400px]"
          />
          {errors.content_body_ar && (
            <div className="text-sm text-red-600">{errors.content_body_ar}</div>
          )}
        </div>

        {/* Featured Image */}
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="featured_image">{t('news.form.featured_image')}</Label>
          <FilePond
            files={files}
            onupdatefiles={(newFiles: FilePondFile[]) => {
              setFiles(newFiles.map(file => ({
                source: file.source,
                options: {
                  type: 'local',
                  file: file.file
                }
              })));
              if (newFiles.length > 0) {
                const file = newFiles[0].file as File;
                setData('featured_image', file);
              } else {
                setData('featured_image', null);
              }
            }}
            allowMultiple={false}
            maxFiles={1}
            acceptedFileTypes={['image/*']}
            labelIdle={t('news.form.drag_drop_image')}
            server={{
              url: route('media.store'),
              process: {
                method: 'POST',
                withCredentials: false,
                headers: {},
                timeout: 7000,
                onload: (response: Response) => {
                  return response;
                },
                onerror: (response: Response) => {
                  return response.text();
                },
              },
            } as any}
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
          {t('news.form.buttons.cancel')}
        </Button>
        <Button type="submit" disabled={processing}>
          {mode === 'create' ? t('news.form.buttons.create') : t('news.form.buttons.update')}
        </Button>
      </div>
    </form>
  );
} 