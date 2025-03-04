import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Content {
  content_id: number;
  title: string;
  title_ar: string;
  content_body: string;
  content_body_ar: string;
  content_type: string;
  is_published: boolean;
  meta_description: string | null;
  meta_description_ar: string | null;
  keywords: string | null;
  keywords_ar: string | null;
  featured_image: string | null;
  slug: string;
  slug_ar: string;
  author_id: number;
  created_at: string;
  updated_at: string;
  author?: {
    id: number;
    name: string;
  };
  categories?: any[];
  media?: any[];
}
