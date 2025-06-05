"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, DollarSign, Activity, ArrowUpRight } from "lucide-react"

interface KeyMetricsProps {
  totalValue: number
  ytdReturn: number
  isLoading: boolean
}

export function KeyMetrics({ totalValue, ytdReturn, isLoading }: KeyMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-card/50 border-2 hover:border-primary/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
            <DollarSign className="h-4 w-4 text-primary-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="animate-pulse space-y-2">
              <div className="h-8 bg-muted rounded w-32" />
              <div className="h-4 bg-muted rounded w-24" />
            </div>
          ) : (
            <>
              <div className="text-2xl font-bold">
                $
                {totalValue.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
              <div className="flex items-center text-sm text-green-600">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                +2.4% (24h)
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card className="hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-card/50 border-2 hover:border-primary/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">YTD Return</CardTitle>
          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-400 rounded-lg flex items-center justify-center">
            <TrendingUp className="h-4 w-4 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+{ytdReturn.toFixed(1)}%</div>
          <div className="flex items-center text-sm text-green-600">
            <ArrowUpRight className="h-4 w-4 mr-1" />
            vs 4.2% benchmark
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-card/50 border-2 hover:border-primary/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Current Yield</CardTitle>
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-400 rounded-lg flex items-center justify-center">
            <Activity className="h-4 w-4 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">5.2%</div>
          <div className="flex items-center text-sm text-muted-foreground">Annualized</div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-card/50 border-2 hover:border-primary/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
          <Badge variant="secondary" className="bg-gradient-to-r from-green-500/20 to-green-400/10 border-green-500/30">
            Low
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2.1</div>
          <Progress value={21} className="mt-2 bg-gradient-to-r from-muted to-muted/50" />
        </CardContent>
      </Card>
    </div>
  )
}
