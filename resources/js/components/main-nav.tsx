"use client"

import { Input } from "@/components/ui/input"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import type { Menu, MenuItem } from "@/types"
import { Bell, Building2, FileText, Home, LogIn, Search, UserPlus, Users } from "lucide-react"
import * as React from "react"

// Icon mapping based on icon names
const getIconComponent = (iconName: string) => {
  const iconMap: { [key: string]: React.ReactNode } = {
    "Home": <Home className="h-4 w-4 mr-2" />,
    "Users": <Users className="h-4 w-4 mr-2" />,
    "Building2": <Building2 className="h-4 w-4 mr-2" />,
    "Bell": <Bell className="h-4 w-4 mr-2" />,
    "FileText": <FileText className="h-4 w-4 mr-2" />,
    "LogIn": <LogIn className="h-4 w-4 mr-2" />,
    "UserPlus": <UserPlus className="h-4 w-4 mr-2" />,
  }
  return iconMap[iconName] || null
}

// Replace the MainNav component with this improved responsive version
export function MainNav({ main_menu }: { main_menu: Menu[] }) {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false)

  // Helper function to render menu items
  const renderMenuItem = (item: MenuItem) => {
    const isActive = window.location.pathname === item.url
    const icon = getIconComponent(item.icon)

    // Only render items that are top-level (parent_id is null)
    if (item.parent_id !== null) {
      return null
    }

    if (item.children && item.children.length > 0) {
      return (
        <NavigationMenuItem key={item.menu_item_id}>
          <NavigationMenuTrigger>
            {icon}
            {item.title}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {item.children.map((child) => (
                <li key={child.menu_item_id} className="row-span-1">
                  <a
                    href={child.url}
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none flex items-center">
                      {getIconComponent(child.icon)}
                      {child.title}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      )
    }

    return (
      <NavigationMenuItem key={item.menu_item_id}>
        <a href={item.url} className={navigationMenuTriggerStyle()}>
          {icon}
          {item.title}
        </a>
      </NavigationMenuItem>
    )
  }

  // Filter top-level items for mobile menu
  const topLevelItems = main_menu[0]?.items.filter(item => item.parent_id === null) || []

  return (
    <>
      {/* Mobile Search Overlay */}
      <Sheet>
        <SheetTrigger asChild>
          <button id="search-trigger" className="hidden">
            Search
          </button>
        </SheetTrigger>
        <SheetContent side="top" className="h-[120px] pt-12">
          <div className="relative w-full pt-2">
            <Search className="absolute left-3 top-[14px] h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Rechercher..." className="w-full pl-9" autoFocus />
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Navigation */}
      <div className="border-b z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 hidden sm:block">
        <div className="container mx-auto max-w-7xl flex h-10 md:h-12 items-center">
          <Sheet>
            <SheetTrigger asChild>
              <button id="mobile-menu-trigger" className="hidden">
                Menu
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] sm:w-[350px] pt-12">
              <div className="py-4">
                <div className="relative mb-4">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Rechercher..." className="w-full pl-8" />
                </div>
                <div className="grid gap-1">
                  {topLevelItems.map((item) => (
                    <React.Fragment key={item.menu_item_id}>
                      <a
                        href={item.url}
                        className={cn(
                          "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent",
                          window.location.pathname === item.url && "bg-accent",
                        )}
                      >
                        {getIconComponent(item.icon)}
                        {item.title}
                      </a>
                      {item.children && item.children.length > 0 && (
                        <div className="ml-4 mt-1 mb-2 grid gap-1 border-l pl-4">
                          {item.children.map((child) => (
                            <a
                              key={child.menu_item_id}
                              href={child.url}
                              className={cn(
                                "flex items-center rounded-md px-3 py-2 text-sm hover:bg-accent",
                                window.location.pathname === child.url && "bg-accent",
                              )}
                            >
                              {child.title}
                            </a>
                          ))}
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {topLevelItems.map((item) => renderMenuItem(item))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Mobile Navigation Pills */}
          <div className="md:hidden w-full overflow-x-auto scrollbar-hide">
            <div className="flex space-x-1 py-1 px-1 min-w-max">
              {topLevelItems.map((item) => (
                <a
                  key={item.menu_item_id}
                  href={item.url}
                  className={cn(
                    "flex items-center whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium",
                    window.location.pathname === item.url ? "bg-[#c4008b] text-[#c4008b]-foreground" : "bg-muted hover:bg-muted/80",
                  )}
                >
                  <span className="mr-1">
                    {getIconComponent(item.icon)}
                  </span>
                  {item.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

