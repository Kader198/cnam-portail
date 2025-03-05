import { Card, CardContent } from "@/components/ui/card"
import { Quote, Star } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  author: string
  date: string
  rating: number
}

export function TestimonialCard({ quote, author, date, rating }: TestimonialCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md border-none shadow-sm hover:translate-y-[-2px] w-full">
      <CardContent className="p-4">
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#c4008b]/10 flex-shrink-0">
              <Quote className="h-3 w-3 text-[#c4008b]" />
            </div>
            <h3 className="text-xs xs:text-sm sm:text-base font-semibold">{author}</h3>
          </div>
          <p className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground mb-3 flex-grow line-clamp-3">{quote}</p>
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#c4008b]/10 flex-shrink-0">
              <Star className="h-3 w-3 text-[#c4008b]" />
            </div>
            <span className="text-[10px] xs:text-xs text-[#c4008b]">{rating}</span>
          </div>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">{date}</span>
        </div>
      </CardContent>
    </Card>
  )
}

