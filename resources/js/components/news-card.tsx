import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Calendar, ArrowRight } from "lucide-react"

interface NewsCardProps {
  date: string
  title: string
  category: string
  description: string
}

export function NewsCard({ date, title, category, description }: NewsCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md border-none shadow-sm hover:translate-y-[-2px]">
      <CardContent className="flex p-4">
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#c4008b]/10 flex-shrink-0">
              <Calendar className="h-3 w-3 text-[#c4008b]" />
            </div>
            <span className="text-[10px] xs:text-xs text-[#c4008b]">{date}</span>
          </div>
          <h3 className="text-xs xs:text-sm sm:text-base font-semibold mb-1.5 line-clamp-2">{title}</h3>
          <p className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground mb-3 flex-grow line-clamp-3">{description}</p>
          <a href="#" className="text-[10px] xs:text-xs text-[#c4008b] hover:underline inline-flex items-center gap-1">
            Lire la suite
            <ArrowRight className="h-3 w-3" />
          </a>
        </div>
      </CardContent>
    </Card>
  )
}

