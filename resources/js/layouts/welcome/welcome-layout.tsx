import { type PropsWithChildren } from 'react'
import { MainNav } from '@/components/main-nav'
import { FileText, MessageSquare, Phone } from 'lucide-react'
import { Link } from '@inertiajs/react'
import { LanguageSwitcher } from '@/components/language-switcher'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { Menu as MenuIcon } from 'lucide-react'
import { FileCheck } from 'lucide-react'
import { Info } from 'lucide-react'
import { Shield } from 'lucide-react'
import { ChevronRight } from 'lucide-react'
import { Mail } from 'lucide-react'
import { MapPin } from 'lucide-react' 
import { Bell } from 'lucide-react'
import type { Menu } from '@/types'
interface Props {
  main_menu:  Menu[];
  footer_menu: Menu[];
}

export default function WelcomeLayout({ children, main_menu, footer_menu }: PropsWithChildren<Props>) {
  return (
    <div className="flex min-h-screen flex-col ">
      {/* Top Bar */}
      <div className="border-b bg-[#c4008b]/5">
        <div className="container mx-auto max-w-7xl flex items-center justify-between py-1.5 sm:py-2">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
            <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span>+222 45 29 19 33</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="#" className="flex items-center gap-1 text-xs sm:text-sm text-[#c4008b] hover:underline">
              <MessageSquare className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Messagerie</span>
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto max-w-7xl flex items-center justify-between py-1.5 sm:py-2 md:py-3">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="mr-1 md:hidden"
              onClick={() => document.getElementById("mobile-menu-trigger")?.click()}
            >
              <MenuIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
            <Link href="/" className="flex items-center gap-1.5 sm:gap-2">
              <img
                src="/images/logo.png"
                alt="CNAM Logo"
                className="h-[28px] xs:h-[32px] sm:h-[40px] md:h-[50px] lg:h-[60px] w-auto"
              />
            </Link>
          </div>
          <div className="flex items-center gap-1 xs:gap-2 md:gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher..."
                className="w-[100px] xs:w-[120px] sm:w-[180px] lg:w-[250px] pl-7 sm:pl-8 h-8 sm:h-9 text-xs sm:text-sm"
              />
            </div>
            <Button className="bg-[#c4008b] hover:bg-[#a30073] text-[10px] xs:text-xs sm:text-sm px-2 xs:px-3 sm:px-4 h-7 sm:h-8 md:h-9">
              <FileCheck className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1 xs:mr-1.5 sm:mr-2" />
              <span className="hidden xs:inline">Suivez votre dossier</span>
              <span className="xs:hidden">Dossier</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="sm:hidden"
              onClick={() => document.getElementById("search-trigger")?.click()}
            >
              <Search className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <MainNav main_menu={main_menu} />

      {/* Alert Banner */}
      <div className="bg-[#c4008b] text-white">
        <div className="container mx-auto max-w-7xl py-1.5 sm:py-2 md:py-3">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
            <p className="text-[10px] xs:text-xs sm:text-sm font-medium">
              CNAM - Diffusion de fichiers : Un court métrage documentant l&apos;expérience de la Caisse nationale
              d&apos;assurance maladie
              <Link href="#" className="ml-1.5 sm:ml-2 underline">
                Voir plus
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 px-2 sm:px-4 md:px-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/40 mt-8 sm:mt-12">
        <div className="container mx-auto max-w-7xl py-6 sm:py-8 md:py-12">
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-semibold flex items-center">
                <Info className="mr-2 h-5 w-5 text-[#c4008b]" />À propos de CNAM
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground flex items-center">
                    <ChevronRight className="mr-1 h-3 w-3 text-[#c4008b]" />
                    Qui sommes-nous
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground flex items-center">
                    <ChevronRight className="mr-1 h-3 w-3 text-[#c4008b]" />
                    Notre mission
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground flex items-center">
                    <ChevronRight className="mr-1 h-3 w-3 text-[#c4008b]" />
                    Organigramme
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground flex items-center">
                    <ChevronRight className="mr-1 h-3 w-3 text-[#c4008b]" />
                    Historique
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold flex items-center">
                <Shield className="mr-2 h-5 w-5 text-[#c4008b]" />
                Services
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground flex items-center">
                    <ChevronRight className="mr-1 h-3 w-3 text-[#c4008b]" />
                    Assurés
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground flex items-center">
                    <ChevronRight className="mr-1 h-3 w-3 text-[#c4008b]" />
                    Prestataires
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground flex items-center">
                    <ChevronRight className="mr-1 h-3 w-3 text-[#c4008b]" />
                    Employeurs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground flex items-center">
                    <ChevronRight className="mr-1 h-3 w-3 text-[#c4008b]" />
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold flex items-center">
                <FileText className="mr-2 h-5 w-5 text-[#c4008b]" />
                Ressources
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground flex items-center">
                    <ChevronRight className="mr-1 h-3 w-3 text-[#c4008b]" />
                    Actualités
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground flex items-center">
                    <ChevronRight className="mr-1 h-3 w-3 text-[#c4008b]" />
                    Avis et Annonces
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground flex items-center">
                    <ChevronRight className="mr-1 h-3 w-3 text-[#c4008b]" />
                    Appels d&apos;offres
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground flex items-center">
                    <ChevronRight className="mr-1 h-3 w-3 text-[#c4008b]" />
                    Recrutement
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold flex items-center">
                <Phone className="mr-2 h-5 w-5 text-[#c4008b]" />
                Contact
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#c4008b]/10 flex-shrink-0 mt-0.5">
                    <Phone className="h-3 w-3 text-[#c4008b]" />
                  </div>
                  <span className="text-muted-foreground">+222 45 29 19 33</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#c4008b]/10 flex-shrink-0 mt-0.5">
                    <Mail className="h-3 w-3 text-[#c4008b]" />
                  </div>
                  <span className="text-muted-foreground">contact@cnam.mr</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#c4008b]/10 flex-shrink-0 mt-0.5">
                    <MapPin className="h-3 w-3 text-[#c4008b]" />
                  </div>
                  <span className="text-muted-foreground">Nouakchott, Mauritanie</span>
                </li>
                <li className="mt-4">
                  <Button variant="outline" size="sm" className="w-full">
                    <MessageSquare className="mr-1.5 h-4 w-4" />
                    Nous écrire
                  </Button>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6 sm:mt-8 border-t pt-6 sm:pt-8 text-center text-xs sm:text-sm text-muted-foreground">
            <p>Copyright © CNAM {new Date().getFullYear()} - Tous droits réservés</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 