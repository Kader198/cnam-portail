import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, FileText, UserRound, FolderTree, Menu, Newspaper, Book, Image, Settings } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    // Dashboard
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGrid,
        group: 'General'
    },
    // Content Management
    {
        title: 'Content',
        url: '/content',
        icon: FileText,
        group: 'Content'
    },
    {
        title: 'Categories',
        url: '/categories',
        icon: FolderTree,
        group: 'Content'
    },
    {
        title: 'Menus',
        url: '/menus',
        icon: Menu,
        group: 'Content'
    },
    {
        title: 'News',
        url: '/news',
        icon: Newspaper,
        group: 'Content'
    },
    {
        title: 'Glossary',
        url: '/glossary',
        icon: Book,
        group: 'Content'
    },
    // Media Management
    {
        title: 'Media',
        url: '/media',
        icon: Image,
        group: 'Media'
    },
    // User Management
    {
        title: 'Users',
        url: '/users',
        icon: UserRound,
        group: 'Users'
    },
    {
        title: 'Roles',
        url: '/roles',
        icon: UserRound,
        group: 'Users'
    },
    // Settings
    {
        title: 'Settings',
        url: '/settings',
        icon: Settings,
        group: 'Settings'
    }
];

const footerNavItems: NavItem[] = [
  
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
