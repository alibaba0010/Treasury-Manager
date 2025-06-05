"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PositionsTable } from "@/components/positions-table"
import { ActivityFeed } from "@/components/activity-feed"

export function PositionsActivity() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2 bg-gradient-to-br from-card to-card/50 border-2 hover:border-primary/20 transition-all duration-300">
        <CardHeader>
          <CardTitle className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Current Positions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <PositionsTable />
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-card to-card/50 border-2 hover:border-primary/20 transition-all duration-300">
        <CardHeader>
          <CardTitle className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ActivityFeed />
        </CardContent>
      </Card>
    </div>
  )
}
