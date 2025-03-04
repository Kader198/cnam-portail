import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { FileText, Info, Phone, User } from "lucide-react"

interface CarouselSlide {
  image: string
  badge: string
  title: string
  description: string
  primaryButton: {
    text: string
    icon: React.ReactNode
  }
  secondaryButton: {
    text: string
    icon: React.ReactNode
  }
}

const slides: CarouselSlide[] = [
  {
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop",
    badge: "Nouveau",
    title: "Vous avez droit à la couverture CNAM?",
    description: "Adhérez sans attendre et bénéficiez de nos services d'assurance maladie",
    primaryButton: {
      text: "S'inscrire",
      icon: <User className="mr-1 h-2.5 w-2.5 xs:h-3 xs:w-3 sm:h-3.5 sm:w-3.5" />
    },
    secondaryButton: {
      text: "En savoir plus",
      icon: <Info className="mr-1 h-2.5 w-2.5 xs:h-3 xs:w-3 sm:h-3.5 sm:w-3.5" />
    }
  },
  {
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop",
    badge: "Services",
    title: "Des services adaptés à vos besoins",
    description: "Découvrez nos prestations pour les assurés, prestataires et employeurs",
    primaryButton: {
      text: "Nos services",
      icon: <FileText className="mr-1 h-2.5 w-2.5 xs:h-3 xs:w-3 sm:h-3.5 sm:w-3.5" />
    },
    secondaryButton: {
      text: "Contactez-nous",
      icon: <Phone className="mr-1 h-2.5 w-2.5 xs:h-3 xs:w-3 sm:h-3.5 sm:w-3.5" />
    }
  }
]

export function HeroCarousel() {
  return (
    <section className="py-3 sm:py-4 md:py-6 lg:py-8">
      <div className="container mx-auto max-w-7xl px-2 sm:px-4 md:px-6">
        <Carousel className="w-full">
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem key={index}>
                <div className="relative h-[180px] xs:h-[220px] sm:h-[300px] md:h-[400px] w-full overflow-hidden rounded-xl">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/30 p-2.5 xs:p-3 sm:p-4 md:p-6 lg:p-10 flex flex-col justify-center">
                    <div className="max-w-md xl:ml-8">
                      <Badge className="mb-1.5 xs:mb-2 md:mb-3 bg-white/20 text-white hover:bg-white/30 text-[10px] xs:text-xs ">
                        {slide.badge}
                      </Badge>
                      <h2 className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1 xs:mb-2 md:mb-4 leading-tight">
                        {slide.title}
                      </h2>
                      <p className="text-white/90 mb-2 xs:mb-3 md:mb-6 text-[10px] xs:text-xs sm:text-sm md:text-base line-clamp-2 sm:line-clamp-none">
                        {slide.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 xs:gap-2 sm:gap-3">
                        <Button
                          variant="secondary"
                          size="sm"
                          className="h-6 xs:h-7 sm:h-8 md:h-9 text-[10px] xs:text-xs sm:text-sm"
                        >
                          {slide.primaryButton.icon}
                          {slide.primaryButton.text}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-6 xs:h-7 sm:h-8 md:h-9 bg-transparent text-white border-white hover:bg-white/20 hover:text-white text-[10px] xs:text-xs sm:text-sm"
                        >
                          {slide.secondaryButton.icon}
                          {slide.secondaryButton.text}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute bottom-1.5 xs:bottom-2 sm:bottom-3 md:bottom-4 left-0 right-0 flex justify-center gap-1">
            {slides.map((_, index) => (
              <Button
                key={index}
                variant={index === 0 ? "secondary" : "outline"}
                size="icon"
                className="h-1 w-1 xs:h-1.5 xs:w-1.5 sm:h-2 sm:w-2 rounded-full p-0"
              />
            ))}
          </div>
          <CarouselPrevious className="left-1 sm:left-2 md:left-4 h-6 w-6 xs:h-7 xs:w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 -translate-y-1/2" />
          <CarouselNext className="right-1 sm:right-2 md:right-4 h-6 w-6 xs:h-7 xs:w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 -translate-y-1/2" />
        </Carousel>
      </div>
    </section>
  )
} 