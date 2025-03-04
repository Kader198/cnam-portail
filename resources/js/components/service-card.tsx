import type * as React from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
  features: string[]
}

export function ServiceCard({ icon, title, description, features }: ServiceCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg border-none shadow-md hover:translate-y-[-2px] w-full">
      <CardHeader className="pb-4">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 shadow-sm">
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="pb-4">
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 flex-shrink-0 mt-0.5">
                <Check className="h-3 w-3 text-primary" />
              </div>
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="pt-0">
        <Button variant="outline" className="w-full">
          En savoir plus
        </Button>
      </CardFooter>
    </Card>
  )
}

