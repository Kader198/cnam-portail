import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { BreadcrumbItem } from '@/types';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import AppLayout from '@/layouts/app-layout';
import { Pencil, Trash2, File, Image, Video, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import { DataTable, Column } from '@/components/ui/data-table';
import { DeleteConfirmationDialog } from '@/components/delete-confirmation-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Media {
  media_id: number;
  file_name: string;
  file_path: string;
  media_type: string;
  uploaded_by: number;
  upload_date: string;
  alt_text: string;
  alt_text_ar: string;
  title: string;
  title_ar: string;
  description: string;
  description_ar: string;
  file_size: number;
  uploader: {
    name: string;
  };
}

interface Props {
  media: {
    data: Media[];
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
    title: 'Media Management',
    href: '/media',
  },
];

export default function MediaList({ media }: Props) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [mediaToDelete, setMediaToDelete] = useState<Media | null>(null);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [previewMedia, setPreviewMedia] = useState<Media | null>(null);

  const handleDeleteClick = (media: Media) => {
    setMediaToDelete(media);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (mediaToDelete) {
      router.delete(route('media.destroy', mediaToDelete.media_id), {
        onSuccess: () => {
          toast.success('Media deleted successfully');
          setDeleteDialogOpen(false);
          setMediaToDelete(null);
        },
        onError: () => {
          toast.error('Failed to delete media');
        },
      });
    }
  };

  const getMediaIcon = (mediaType: string) => {
    switch (mediaType.toLowerCase()) {
      case 'image':
        return <Image className="w-4 h-4" />;
      case 'video':
        return <Video className="w-4 h-4" />;
      default:
        return <File className="w-4 h-4" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handlePreviewClick = (media: Media) => {
    setPreviewMedia(media);
    setPreviewDialogOpen(true);
  };

  const columns: Column<Media>[] = [
    {
      header: 'File',
      accessorKey: 'file_name',
      cell: (media) => (
        <div className="flex items-center">
          {media.media_type.toLowerCase() === 'image' ? (
            <div className="flex items-center space-x-3">
              <div className="relative group">
                <img 
                  src={`/storage/${media.file_path}`}
                  alt={media.alt_text}
                  className="w-16 h-16 object-cover rounded-lg shadow-sm hover:shadow-md transition-shadow"
                />
                <button
                  onClick={() => handlePreviewClick(media)}
                  className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100"
                >
                  <Eye className="w-6 h-6 text-white" />
                </button>
              </div>
              <div>
                <div className="font-medium">{media.file_name}</div>
                <div className="text-sm text-gray-500">{formatFileSize(media.file_size)}</div>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                {getMediaIcon(media.media_type)}
              </div>
              <div>
                <div className="font-medium">{media.file_name}</div>
                <div className="text-sm text-gray-500">{formatFileSize(media.file_size)}</div>
              </div>
            </div>
          )}
        </div>
      ),
    },
    {
      header: 'Title',
      accessorKey: 'title',
      cell: (media) => (
        <div>
          <div className="font-medium">{media.title}</div>
          <div className="text-sm text-gray-500">{media.title_ar}</div>
        </div>
      ),
    },
    {
      header: 'Alt Text',
      accessorKey: 'alt_text',
      cell: (media) => (
        <div>
          <div>{media.alt_text}</div>
          <div className="text-sm text-gray-500">{media.alt_text_ar}</div>
        </div>
      ),
    },
    {
      header: 'Type',
      accessorKey: 'media_type',
      cell: (media) => (
        <Badge variant="outline">
          {media.media_type}
        </Badge>
      ),
    },
    {
      header: 'Size',
      accessorKey: 'file_size',
      cell: (media) => formatFileSize(media.file_size),
    },
    {
      header: 'Uploaded By',
      accessorKey: 'uploader',
      cell: (media) => media.uploader.name,
    },
    {
      header: 'Upload Date',
      accessorKey: 'upload_date',
      cell: (media) => format(new Date(media.upload_date), 'MMM d, yyyy'),
    },
    {
      header: 'Actions',
      accessorKey: 'media_id',
      cell: (media) => (
        <div className="flex space-x-2">
          <Link
            href={route('media.edit', media.media_id)}
            className="text-indigo-600 hover:text-indigo-900 flex items-center"
          >
            <Pencil className="w-4 h-4 mr-1" />
            Edit
          </Link>
          <button
            onClick={() => handleDeleteClick(media)}
            className="text-red-600 hover:text-red-900 flex items-center"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Delete
          </button>
        </div>
      ),
    },
  ];

  const filters = [
    {
      key: 'type',
      label: 'Filter by type',
      options: [
        { value: 'image', label: 'Images' },
        { value: 'video', label: 'Videos' },
        { value: 'document', label: 'Documents' },
      ],
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Media Management" />

      <div className="py-3">
        <div className="mx-auto sm:px-6 lg:px-4">
          <DataTable
            title="Media"
            data={media}
            columns={columns}
            route_name={route('media.index')}
            searchPlaceholder="Search media..."
            filters={filters}
            createButton={{
              label: 'Upload New Media',
              href: route('media.create'),
            }}
          />
        </div>
      </div>

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        title="Delete Media"
        itemName={mediaToDelete?.file_name}
      />

      <Dialog open={previewDialogOpen} onOpenChange={setPreviewDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{previewMedia?.title}</DialogTitle>
          </DialogHeader>
          {previewMedia && (
            <div className="mt-4">
              <img
                src={`/storage/${previewMedia.file_path}`}
                alt={previewMedia.alt_text}
                className="w-full h-auto rounded-lg"
              />
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>File Size: {formatFileSize(previewMedia.file_size)}</span>
                  <span>Uploaded: {format(new Date(previewMedia.upload_date), 'MMM d, yyyy')}</span>
                </div>
                <div className="text-sm">
                  <div className="font-medium">Alt Text:</div>
                  <div className="text-gray-600">{previewMedia.alt_text}</div>
                </div>
                {previewMedia.description && (
                  <div className="text-sm">
                    <div className="font-medium">Description:</div>
                    <div className="text-gray-600">{previewMedia.description}</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
