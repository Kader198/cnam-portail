"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Home, Users, Building2, FileText, Bell, Search, LogIn, UserPlus } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"

const navItems = [
  {
    title: "Accueil",
    href: "/",
    icon: <Home className="h-4 w-4 mr-2" />,
  },
  {
    title: "Assurés",
    href: "/assures",
    icon: <Users className="h-4 w-4 mr-2" />,
    children: [
      {
        title: "Droits et obligations",
        href: "/assures/droits-obligations",
        description: "Connaître vos droits et obligations en tant qu'assuré",
      },
      {
        title: "Procédures",
        href: "/assures/procedures",
        description: "Les démarches à suivre pour bénéficier des prestations",
      },
      {
        title: "Remboursements",
        href: "/assures/remboursements",
        description: "Suivre l'état de vos remboursements",
      },
    ],
  },
  {
    title: "Prestataires",
    href: "/prestataires",
    icon: <Building2 className="h-4 w-4 mr-2" />,
    children: [
      {
        title: "Convention",
        href: "/prestataires/convention",
        description: "Les termes de la convention avec la CNAM",
      },
      {
        title: "Facturation",
        href: "/prestataires/facturation",
        description: "Procédures de facturation des prestations",
      },
      {
        title: "Agrément",
        href: "/prestataires/agrement",
        description: "Demande d'agrément pour les prestataires",
      },
    ],
  },
  {
    title: "Employeurs",
    href: "/employeurs",
    icon: <Users className="h-4 w-4 mr-2" />,
    children: [
      {
        title: "Affiliation",
        href: "/employeurs/affiliation",
        description: "Procédures d'affiliation des employés",
      },
      {
        title: "Cotisations",
        href: "/employeurs/cotisations",
        description: "Gestion des cotisations sociales",
      },
      {
        title: "Déclarations",
        href: "/employeurs/declarations",
        description: "Déclarations périodiques obligatoires",
      },
    ],
  },
  {
    title: "Actualités",
    href: "/actualites",
    icon: <Bell className="h-4 w-4 mr-2" />,
  },
  {
    title: "Documentation",
    href: "/documentation",
    icon: <FileText className="h-4 w-4 mr-2" />,
  },
  {
    title: "Avis et Annonces",
    href: "/avis-annonces",
    icon: <Bell className="h-4 w-4 mr-2" />,
  },
  {
    title: "Connexion",
    href: "/login",
    icon: <LogIn className="h-4 w-4 mr-2" />,
  },
  {
    title: "Inscription",
    href: "/register",
    icon: <UserPlus className="h-4 w-4 mr-2" />,
  },
]

// Replace the MainNav component with this improved responsive version
export function MainNav() {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false)

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
      <div className="border-b z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
                  {navItems.map((item) => (
                    <React.Fragment key={item.href}>
                      <a
                        href={item.href}
                        className={cn(
                          "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent",
                          window.location.pathname === item.href && "bg-accent",
                        )}
                      >
                        {item.icon}
                        {item.title}
                      </a>
                      {item.children && (
                        <div className="ml-4 mt-1 mb-2 grid gap-1 border-l pl-4">
                          {item.children.map((child) => (
                            <a
                              key={child.href}
                              href={child.href}
                              className={cn(
                                "flex items-center rounded-md px-3 py-2 text-sm hover:bg-accent",
                                window.location.pathname === child.href && "bg-accent",
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
              {navItems.map((item) => {
                if (!item.children) {
                  return (
                    <NavigationMenuItem key={item.href}>
                      <a href={item.href} className={navigationMenuTriggerStyle()}>
                        {item.icon}
                        {item.title}
                      </a>
                    </NavigationMenuItem>
                  )
                }

                return (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuTrigger>
                      {item.icon}
                      {item.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {item.children.map((child) => (
                          <li key={child.href} className="row-span-1">
                            <a
                              href={child.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">{child.title}</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {child.description}
                              </p>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                )
              })}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Mobile Navigation Pills */}
          <div className="md:hidden w-full overflow-x-auto scrollbar-hide">
            <div className="flex space-x-1 py-1 px-1 min-w-max">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium",
                    window.location.pathname === item.href ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80",
                  )}
                >
                  {React.cloneElement(item.icon, { className: "h-3 w-3 mr-1" })}
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

