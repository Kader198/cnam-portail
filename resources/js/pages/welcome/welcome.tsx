import { HeroCarousel } from "@/components/hero-carousel"
import { NewsCard } from "@/components/news-card"
import { ServiceCard } from "@/components/service-card"
import { StatCard } from "@/components/stat-card"
import { TestimonialCard } from "@/components/testimonial-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import WelcomeLayout from "@/layouts/welcome/welcome-layout"
import {
  Building2,
  Calendar,
  ChevronRight,
  Clock,
  Download,
  FileText,
  HelpCircle,
  Info,
  Link,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Shield,
  User,
  Users
} from "lucide-react"
import { Menu } from "@/types";
interface Props {
  welcome_message: any;
  latest_news: any[];
  testimonials: any[];
  contact_info: any[];
  practical_info: any[];
  service_providers: any[];
  departments: any[];
  faqs: any[];
  glossary_terms: any[];
  menus: any[];
  main_menu: Menu[];
  footer_menu: Menu[];
}
export default function Home({
  welcome_message,
  latest_news,
  testimonials,
  contact_info,
  practical_info,
  service_providers,
  departments,
  faqs,
  glossary_terms,
  menus,
  main_menu,
  footer_menu
}: Props) {
  return (
    <WelcomeLayout main_menu={main_menu} footer_menu={footer_menu}>
      <HeroCarousel />

      {/* Stats Section */}
      <section className="py-4 sm:py-6 md:py-10 bg-muted/30">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <StatCard icon={<Users className="h-5 w-5 sm:h-6 sm:w-6 text-[#c4008b]" />} value="500K+" label="Assurés" />
            <StatCard icon={<Building2 className="h-5 w-5 sm:h-6 sm:w-6 text-[#c4008b]" />} value="1200+" label="Prestataires" />
            <StatCard icon={<Shield className="h-5 w-5 sm:h-6 sm:w-6 text-[#c4008b]" />} value="95%" label="Taux de couverture" />
            <StatCard icon={<Clock className="h-5 w-5 sm:h-6 sm:w-6 text-[#c4008b]" />} value="48h" label="Délai de traitement" />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="py-6 sm:py-8 md:py-12">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {/* Welcome Section */}
            <Card className="overflow-hidden border-none shadow-md">
              <CardHeader className="pb-3 bg-[#c4008b]/5 border-b">
                <CardTitle className="text-lg sm:text-xl font-bold text-[#c4008b] flex items-center">
                  <Info className="mr-2 h-5 w-5" />
                  Mot de Bienvenue
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-full overflow-hidden border-4 border-[#c4008b]/20">
                    <img src="https://i.imgur.com/Hl4U5Jh.png" alt="CNAM Icon" className="w-full h-full object-cover" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground text-center px-2">
                  Nous avons le plaisir de vous présenter le site cnam.mr sous un autre visage, un nouveau look que nous
                  avons voulu plus agréable à consulter, plus aéré et plus fonctionnel.
                </p>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="outline" size="sm" className="w-full">
                  <FileText className="mr-1.5 h-4 w-4" />
                  Lire plus
                </Button>
              </CardFooter>
            </Card>

            {/* Contact Section */}
            <Card className="overflow-hidden border-none shadow-md">
              <CardHeader className="pb-3 bg-[#c4008b]/5 border-b">
                <CardTitle className="text-lg sm:text-xl font-bold text-[#c4008b] flex items-center">
                  <Phone className="mr-2 h-5 w-5" />
                  Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#c4008b]/10 flex-shrink-0">
                      <MessageSquare className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#c4008b]" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-medium">Des suggestions, des réclamations</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">votre avis nous intéresse...</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#c4008b]/10 flex-shrink-0">
                      <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#c4008b]" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-medium">Email</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">contact@cnam.mr</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#c4008b]/10 flex-shrink-0">
                      <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#c4008b]" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-medium">Adresse</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">Nouakchott, Mauritanie</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button className="w-full bg-[#c4008b] hover:bg-[#a30073] text-sm sm:text-base">
                  <Mail className="mr-1.5 h-4 w-4" />
                  Contactez nous
                </Button>
              </CardFooter>
            </Card>

            {/* Practical Info Section */}
            <Card className="overflow-hidden border-none shadow-md">
              <CardHeader className="pb-3 bg-[#c4008b]/5 border-b">
                <CardTitle className="text-lg sm:text-xl font-bold text-[#c4008b] flex items-center">
                  <HelpCircle className="mr-2 h-5 w-5" />
                  Infos pratiques
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-xs sm:text-sm text-muted-foreground mb-4">
                  Vérifiez que le prestataire qui vous reçoit (à l&apos;intérieur ou à l&apos;extérieur) est agréé par
                  la CNAM, sinon vos factures ne seront pas remboursées.
                </p>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 transition-colors">
                    <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#c4008b]/10 flex-shrink-0">
                      <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#c4008b]" />
                    </div>
                    <span className="text-xs sm:text-sm">Guide des procédures</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 transition-colors">
                    <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#c4008b]/10 flex-shrink-0">
                      <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#c4008b]" />
                    </div>
                    <span className="text-xs sm:text-sm">Liste des prestataires agréés</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 transition-colors">
                    <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#c4008b]/10 flex-shrink-0">
                      <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#c4008b]" />
                    </div>
                    <span className="text-xs sm:text-sm">Formulaires à télécharger</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0 flex justify-between gap-2">
                <Button variant="outline" size="sm" className="flex-1 text-xs sm:text-sm">
                  <ChevronRight className="mr-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4 rotate-180" />
                  Précédente
                </Button>
                <Button variant="outline" size="sm" className="flex-1 text-xs sm:text-sm">
                  Suivante
                  <ChevronRight className="ml-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Services Section */}
          <section className="mt-8 sm:mt-12 md:mt-16">
            <div className="flex items-center justify-between mb-4 sm:mb-6 md:mb-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#c4008b] flex items-center">
                <Shield className="mr-2 h-5 w-5 sm:h-6 sm:w-6 hidden sm:inline" />
                Nos Services
              </h2>
              <Link href="#" className="text-xs sm:text-sm text-[#c4008b] hover:underline flex items-center">
                Tous les services <ChevronRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
              </Link>
            </div>
            <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <ServiceCard
                icon={<User className="h-6 w-6 text-[#c4008b]" />}
                title="Pour les Assurés"
                description="Accédez à vos droits et suivez vos remboursements en ligne"
                features={[
                  "Suivi des remboursements",
                  "Téléchargement des attestations",
                  "Mise à jour des informations",
                ]}
              />
              <ServiceCard
                icon={<Building2 className="h-6 w-6 text-[#c4008b]" />}
                title="Pour les Prestataires"
                description="Consultez les procédures et soumettez vos factures"
                features={["Facturation en ligne", "Suivi des paiements", "Mise à jour du profil"]}
              />
              <ServiceCard
                icon={<Users className="h-6 w-6 text-[#c4008b]" />}
                title="Pour les Employeurs"
                description="Gérez les affiliations et les cotisations de vos employés"
                features={["Déclaration des employés", "Paiement des cotisations", "Suivi des dossiers"]}
              />
            </div>
          </section>

          {/* News and Testimonials */}
          <div className="mt-8 sm:mt-12 md:mt-16 grid gap-4 sm:gap-6 md:gap-8 md:grid-cols-2">
            {/* News Section */}
            <div>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[#c4008b] flex items-center">
                  <Calendar className="mr-2 h-5 w-5 hidden sm:inline" />
                  Actualités
                </h2>
                <Link href="#" className="text-sm text-[#c4008b] hover:underline flex items-center">
                  Voir toutes <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              <div className="space-y-4">
                <NewsCard
                  date="25 Fév"
                  title="L'activité de la deuxième journée de la visite du Directeur général et de sa délégation qui l'accompagne en Algérie sœur"
                  category="Événements"
                  description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
                />
                <NewsCard
                  date="18 Fév"
                  title="Signature d'une convention de partenariat entre la CNAM et l'Ordre National des Médecins"
                  category="Partenariats"
                  description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
                />
                <NewsCard
                  date="10 Fév"
                  title="Lancement du nouveau système de gestion des remboursements"
                  category="Services"
                  description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
                />
              </div>
            </div>

            {/* Testimonials Section */}
            <div>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[#c4008b] flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5 hidden sm:inline" />
                  Témoignages
                </h2>
                <Link href="#" className="text-sm text-[#c4008b] hover:underline flex items-center">
                  Voir tous <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              <div className="space-y-4">
                <TestimonialCard
                  quote="Merci j'ai compris je vous demande de continuer votre politique de communication avec vos adhérants."
                  author="Ba Abdellahi"
                  date="mercredi 5 mars 2014 16:26"
                  rating={2}
                />
                <TestimonialCard
                  quote="Je tiens à remercier la CNAM pour la rapidité de traitement de mon dossier."
                  author="Mohamed Lemine"
                  date="lundi 3 février 2014 10:15"
                  rating={2}
                />
                <TestimonialCard
                  quote="Le nouveau site est beaucoup plus facile à utiliser, félicitations pour cette amélioration."
                  author="Fatima Sy"
                  date="vendredi 24 janvier 2014 09:30"
                  rating={5}
                />
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <section className="mt-8 sm:mt-12 md:mt-16">
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#c4008b] to-[#c4008b]/70 p-4 sm:p-6 md:p-8 lg:p-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl"></div>

              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
                <div className="text-center md:text-left">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">Besoin d&apos;assistance ?</h2>
                  <p className="text-white/80 max-w-md text-sm sm:text-base">
                    Notre équipe est disponible pour répondre à toutes vos questions et vous accompagner dans vos
                    démarches.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
                  <Button variant="secondary" size="sm" className="w-full sm:w-auto text-xs sm:text-sm">
                    <Phone className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    Nous contacter
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto bg-transparent text-white border-white hover:bg-white/20 hover:text-white text-xs sm:text-sm"
                  >
                    <HelpCircle className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    FAQ
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Image Gallery */}
        <section className="mt-8 sm:mt-12 md:mt-16">
          <div className="container mx-auto max-w-7xl px-2 sm:px-4 md:px-6">
            <div className="flex items-center justify-between mb-4 sm:mb-6 md:mb-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#c4008b] flex items-center">
                <FileText className="mr-2 h-5 w-5 sm:h-6 sm:w-6 hidden sm:inline" />
                Galerie Photos
              </h2>
              <Link href="#" className="text-xs sm:text-sm text-[#c4008b] hover:underline flex items-center">
                Voir toutes <ChevronRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              <div className="relative aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                <img
                  src="https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?q=80&w=400&auto=format&fit=crop"
                  alt="CNAM Event"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                <img
                  src="https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?q=80&w=400&auto=format&fit=crop"
                  alt="Healthcare Services"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                <img
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=400&auto=format&fit=crop"
                  alt="Medical Consultation"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                <img
                  src="https://images.unsplash.com/photo-1579684288361-5c1a2957cc38?q=80&w=400&auto=format&fit=crop"
                  alt="Healthcare Professional"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </WelcomeLayout>
  )
}

