import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronRight } from "lucide-react"

interface NewsCardProps {
  date: string
  title: string
  category: string
}

export function NewsCard({ date, title, category }: NewsCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md border-none shadow-sm hover:translate-y-[-2px]">
      <CardContent className="flex p-4">
        <div className="mr-4 flex h-14 w-14 flex-col items-center justify-center rounded-md bg-primary/10 text-center">
          <span className="text-sm font-bold text-primary">{date.split(" ")[0]}</span>
          <span className="text-xs text-muted-foreground">{date.split(" ")[1]}</span>
        </div>
        <div className="flex-1">
          <div className="mb-1 flex items-center justify-between">
            <Badge variant="outline" className="text-xs">
              {category}
            </Badge>
          </div>
          <h3 className="line-clamp-2 text-sm font-medium">{title}</h3>
          <a href="#" className="mt-2 flex items-center text-xs text-primary hover:underline">
            Lire plus <ChevronRight className="ml-1 h-3 w-3" />
          </a>
        </div>
      </CardContent>
    </Card>
  )
}

