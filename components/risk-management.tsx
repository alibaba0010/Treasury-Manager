"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Shield, TrendingDown, Activity, Target } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const varData = [
  { period: "1 Day", var95: 0.8, var99: 1.2 },
  { period: "1 Week", var95: 2.1, var99: 3.2 },
  { period: "1 Month", var95: 4.5, var99: 6.8 },
]

const stressTestData = [
  { scenario: "Market Crash", impact: -8.5 },
  { scenario: "Rate Spike", impact: -3.2 },
  { scenario: "Liquidity Crisis", impact: -5.1 },
  { scenario: "Credit Event", impact: -2.8 },
]

export function RiskManagement() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Risk Management</h1>
          <p className="text-muted-foreground">Monitor and analyze portfolio risk metrics</p>
        </div>
        <Badge variant="secondary" className="gap-1">
          <Shield className="h-3 w-3" />
          Risk Level: Low
        </Badge>
      </div>

      {/* Risk Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio VaR (1-day)</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$102,400</div>
            <div className="text-sm text-muted-foreground">95% confidence</div>
            <Progress value={15} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Volatility</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.1%</div>
            <div className="text-sm text-muted-foreground">30-day annualized</div>
            <Progress value={21} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Max Drawdown</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-1.8%</div>
            <div className="text-sm text-muted-foreground">YTD maximum</div>
            <Progress value={18} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sharpe Ratio</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.47</div>
            <div className="text-sm text-muted-foreground">Risk-adjusted return</div>
            <Progress value={82} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Value at Risk Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={varData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="period" className="text-muted-foreground" fontSize={12} />
                  <YAxis className="text-muted-foreground" fontSize={12} />
                  <Tooltip
                    formatter={(value: number) => [`${value}%`, "VaR"]}
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px",
                    }}
                  />
                  <Bar dataKey="var95" fill="hsl(var(--primary))" name="95% VaR" />
                  <Bar dataKey="var99" fill="hsl(var(--destructive))" name="99% VaR" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Stress Test Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stressTestData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis type="number" className="text-muted-foreground" fontSize={12} />
                  <YAxis dataKey="scenario" type="category" className="text-muted-foreground" fontSize={12} />
                  <Tooltip
                    formatter={(value: number) => [`${value}%`, "Impact"]}
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px",
                    }}
                  />
                  <Bar dataKey="impact" fill="hsl(var(--destructive))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Metrics Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Risk Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Market Risk</span>
                <div className="flex items-center gap-2">
                  <Progress value={25} className="w-20" />
                  <span className="text-sm">Low</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Credit Risk</span>
                <div className="flex items-center gap-2">
                  <Progress value={15} className="w-20" />
                  <span className="text-sm">Very Low</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Liquidity Risk</span>
                <div className="flex items-center gap-2">
                  <Progress value={10} className="w-20" />
                  <span className="text-sm">Very Low</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Concentration Risk</span>
                <div className="flex items-center gap-2">
                  <Progress value={30} className="w-20" />
                  <span className="text-sm">Low</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Operational Risk</span>
                <div className="flex items-center gap-2">
                  <Progress value={20} className="w-20" />
                  <span className="text-sm">Low</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Compliance Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {[
                { metric: "Portfolio Concentration", status: "Compliant", value: "65% max single asset" },
                { metric: "Liquidity Requirements", status: "Compliant", value: "95% liquid assets" },
                { metric: "Risk Limits", status: "Compliant", value: "Within all thresholds" },
                { metric: "Regulatory Capital", status: "Compliant", value: "125% of minimum" },
                { metric: "Audit Trail", status: "Current", value: "All transactions logged" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="text-sm font-medium">{item.metric}</p>
                    <p className="text-xs text-muted-foreground">{item.value}</p>
                  </div>
                  <Badge
                    variant={item.status === "Compliant" || item.status === "Current" ? "secondary" : "destructive"}
                  >
                    {item.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
