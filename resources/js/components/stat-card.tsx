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
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 flex-shrink-0 shadow-sm">
          {icon}
        </div>
        <div>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  )
}

