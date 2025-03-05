import type * as React from "react"
import { Card, CardContent } from "@/components/ui/card"

interface StatCardProps {
  icon: React.ReactNode
  value: string
  label: string
}

export function StatCard({ icon, value, label }: StatCardProps) {
  return (
    <Card className="border-none shadow-sm bg-background w-full">
      <CardContent className="p-4 flex items-center gap-4">
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#c4008b]/10 flex-shrink-0">
              {icon}
            </div>
            <h3 className="text-xs xs:text-sm sm:text-base font-semibold">{label}</h3>
          </div>
          <div className="text-2xl xs:text-3xl sm:text-4xl font-bold text-[#c4008b] mb-1">{value}</div>
        </div>
      </CardContent>
    </Card>
  )
}

