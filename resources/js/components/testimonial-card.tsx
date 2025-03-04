import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  author: string
  date: string
}

export function TestimonialCard({ quote, author, date }: TestimonialCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md border-none shadow-sm hover:translate-y-[-2px] w-full">
      <CardContent className="p-4">
        <div className="mb-3 flex">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
            <Quote className="h-4 w-4 text-primary" />
          </div>
        </div>
        <p className="mb-4 text-sm italic text-muted-foreground">{quote}</p>
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium">{author}</span>
          <span className="text-muted-foreground">{date}</span>
        </div>
      </CardContent>
    </Card>
  )
}

