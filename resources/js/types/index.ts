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
    group?: string;
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


export interface MenuItem {
    menu_item_id: number;  // ID of the menu item
    menu_id: number;  // ID of the parent menu
    title: string;  // Title of the menu item in English
    title_ar: string;  // Title of the menu item in Arabic
    children: MenuItem[];  // Nested children menu items
    created_at: string;  // ISO 8601 date string
    deleted_at: string | null;  // Date string or null (for deleted items)
    display_order: number;  // Display order of the item
    is_active: number;  // 1 for active, 0 for inactive
    parent_id: number | null;  // Parent ID (null if no parent)
    updated_at: string;  // ISO 8601 date string
    url: string;  // URL for the menu item
    url_ar: string;  // Arabic URL for the menu item
    icon: string;  // Icon name for the menu item
}

export interface Menu {
    menu_id: number;
    menu_name: string;
    menu_name_ar: string;
    location: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    items: MenuItem[];
}
