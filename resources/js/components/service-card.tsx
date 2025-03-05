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
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#c4008b]/10 flex-shrink-0">
              {icon}
            </div>
            <h3 className="text-xs xs:text-sm sm:text-base font-semibold">{title}</h3>
          </div>
          <p className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground mb-3 flex-grow">{description}</p>
          <ul className="space-y-1.5">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-1.5 text-[10px] xs:text-xs">
                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#c4008b]/10 flex-shrink-0">
                  <Check className="h-2.5 w-2.5 text-[#c4008b]" />
                </div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
      </CardContent>
      <CardFooter className="pt-0">
        <Button variant="outline" className="w-full">
          En savoir plus
        </Button>
      </CardFooter>
    </Card>
  )
}

