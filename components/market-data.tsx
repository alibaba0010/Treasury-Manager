"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const treasuryData = [
  { date: "2024-11-25", rate: 4.25 },
  { date: "2024-11-26", rate: 4.28 },
  { date: "2024-11-27", rate: 4.22 },
  { date: "2024-11-28", rate: 4.3 },
  { date: "2024-11-29", rate: 4.35 },
  { date: "2024-11-30", rate: 4.32 },
]

export function MarketData() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Market Data</h1>
          <p className="text-muted-foreground">Real-time market information and analysis</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm text-muted-foreground">Live Data</span>
        </div>
      </div>

      {/* Asset Prices */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">OUSG Price</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1.0012</div>
            <div className="flex items-center text-sm text-green-600">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              +0.12% (24h)
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">USDY Price</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$0.9998</div>
            <div className="flex items-center text-sm text-red-600">
              <ArrowDownRight className="h-4 w-4 mr-1" />
              -0.05% (24h)
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">10Y Treasury</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.32%</div>
            <div className="flex items-center text-sm text-red-600">
              <ArrowDownRight className="h-4 w-4 mr-1" />
              -3 bps
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fed Funds Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5.25%</div>
            <div className="flex items-center text-sm text-muted-foreground">Unchanged</div>
          </CardContent>
        </Card>
      </div>

      {/* Treasury Yield Chart */}
      <Card>
        <CardHeader>
          <CardTitle>10-Year Treasury Yield Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={treasuryData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-muted-foreground" fontSize={12} />
                <YAxis className="text-muted-foreground" fontSize={12} tickFormatter={(value) => `${value}%`} />
                <Tooltip
                  formatter={(value: number) => [`${value}%`, "Yield"]}
                  labelFormatter={(label) => `Date: ${label}`}
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Market Intelligence */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Market News</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                title: "Fed Signals Cautious Approach to Rate Cuts",
                time: "2 hours ago",
                impact: "Positive for OUSG",
                sentiment: "Bullish",
              },
              {
                title: "Treasury Auction Shows Strong Demand",
                time: "4 hours ago",
                impact: "Neutral",
                sentiment: "Neutral",
              },
              {
                title: "Inflation Data Meets Expectations",
                time: "6 hours ago",
                impact: "Positive for both assets",
                sentiment: "Bullish",
              },
              {
                title: "Corporate Bond Spreads Tighten",
                time: "8 hours ago",
                impact: "Slight negative for USDY",
                sentiment: "Bearish",
              },
            ].map((news, index) => (
              <div key={index} className="border rounded-lg p-3 space-y-2">
                <div className="flex items-start justify-between">
                  <h4 className="font-medium text-sm">{news.title}</h4>
                  <span className="text-xs text-muted-foreground">{news.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {news.impact}
                  </Badge>
                  <Badge
                    variant={
                      news.sentiment === "Bullish"
                        ? "default"
                        : news.sentiment === "Bearish"
                          ? "destructive"
                          : "secondary"
                    }
                    className="text-xs"
                  >
                    {news.sentiment}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Economic Calendar</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                date: "Dec 2, 2024",
                event: "ISM Manufacturing PMI",
                time: "10:00 AM EST",
                importance: "High",
                forecast: "48.5",
                impact: "Treasury yields",
              },
              {
                date: "Dec 6, 2024",
                event: "Non-Farm Payrolls",
                time: "8:30 AM EST",
                importance: "High",
                forecast: "200K",
                impact: "Fed policy expectations",
              },
              {
                date: "Dec 11, 2024",
                event: "CPI Release",
                time: "8:30 AM EST",
                importance: "Very High",
                forecast: "2.7% YoY",
                impact: "Rate cut probability",
              },
              {
                date: "Dec 18, 2024",
                event: "FOMC Meeting",
                time: "2:00 PM EST",
                importance: "Very High",
                forecast: "25 bps cut",
                impact: "All treasury assets",
              },
            ].map((event, index) => (
              <div key={index} className="border rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">{event.event}</h4>
                  <Badge
                    variant={
                      event.importance === "Very High"
                        ? "destructive"
                        : event.importance === "High"
                          ? "default"
                          : "secondary"
                    }
                    className="text-xs"
                  >
                    {event.importance}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground">
                  <div>
                    {event.date} at {event.time}
                  </div>
                  <div>Forecast: {event.forecast}</div>
                  <div>Impact: {event.impact}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Market Indicators */}
      <Card>
        <CardHeader>
          <CardTitle>Key Market Indicators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "VIX", value: "16.2", change: "-0.8", positive: false },
              { name: "DXY", value: "104.25", change: "+0.15", positive: true },
              { name: "2Y-10Y Spread", value: "42 bps", change: "+2 bps", positive: true },
              { name: "MOVE Index", value: "118.5", change: "-2.1", positive: false },
            ].map((indicator, index) => (
              <div key={index} className="border rounded-lg p-3">
                <div className="text-sm font-medium">{indicator.name}</div>
                <div className="text-lg font-bold">{indicator.value}</div>
                <div className={`text-sm flex items-center ${indicator.positive ? "text-green-600" : "text-red-600"}`}>
                  {indicator.positive ? (
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                  )}
                  {indicator.change}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
