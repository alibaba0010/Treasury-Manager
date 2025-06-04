"use client"

import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts"

const data = [
  { date: "Jan", value: 12000000, benchmark: 11800000 },
  { date: "Feb", value: 12150000, benchmark: 11900000 },
  { date: "Mar", value: 12080000, benchmark: 11950000 },
  { date: "Apr", value: 12300000, benchmark: 12100000 },
  { date: "May", value: 12450000, benchmark: 12200000 },
  { date: "Jun", value: 12600000, benchmark: 12350000 },
  { date: "Jul", value: 12750000, benchmark: 12400000 },
  { date: "Aug", value: 12680000, benchmark: 12450000 },
  { date: "Sep", value: 12820000, benchmark: 12500000 },
  { date: "Oct", value: 12900000, benchmark: 12600000 },
  { date: "Nov", value: 12847392, benchmark: 12650000 },
]

export function PortfolioChart() {
  return (
    <div className="h-80 chart-container relative overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-chart-2/5 rounded-2xl" />

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <defs>
            {/* Enhanced portfolio gradient */}
            <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
              <stop offset="25%" stopColor="hsl(var(--primary))" stopOpacity={0.6} />
              <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
              <stop offset="75%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.05} />
            </linearGradient>

            {/* Enhanced benchmark gradient */}
            <linearGradient id="benchmarkGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--chart-2))" stopOpacity={0.6} />
              <stop offset="25%" stopColor="hsl(var(--chart-2))" stopOpacity={0.4} />
              <stop offset="50%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
              <stop offset="75%" stopColor="hsl(var(--chart-2))" stopOpacity={0.15} />
              <stop offset="100%" stopColor="hsl(var(--chart-2))" stopOpacity={0.02} />
            </linearGradient>

            {/* Glow effects */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} strokeWidth={1} />

          <XAxis
            dataKey="date"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tick={{ fill: "hsl(var(--muted-foreground))" }}
          />

          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
            tickLine={false}
            axisLine={false}
            tick={{ fill: "hsl(var(--muted-foreground))" }}
          />

          <Tooltip
            formatter={(value: number, name: string) => [
              `$${value.toLocaleString()}`,
              name === "value" ? "Portfolio" : "Benchmark",
            ]}
            labelFormatter={(label) => `Month: ${label}`}
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "12px",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
              backdropFilter: "blur(20px)",
              padding: "12px 16px",
            }}
            labelStyle={{
              color: "hsl(var(--foreground))",
              fontWeight: "600",
              marginBottom: "8px",
            }}
          />

          {/* Benchmark area */}
          <Area
            type="monotone"
            dataKey="benchmark"
            stroke="hsl(var(--chart-2))"
            strokeWidth={2}
            fill="url(#benchmarkGradient)"
            strokeDasharray="8 4"
            dot={false}
            activeDot={{
              r: 4,
              stroke: "hsl(var(--chart-2))",
              strokeWidth: 2,
              fill: "hsl(var(--background))",
              filter: "url(#glow)",
            }}
          />

          {/* Portfolio area */}
          <Area
            type="monotone"
            dataKey="value"
            stroke="hsl(var(--primary))"
            strokeWidth={3}
            fill="url(#portfolioGradient)"
            dot={false}
            activeDot={{
              r: 6,
              stroke: "hsl(var(--primary))",
              strokeWidth: 3,
              fill: "hsl(var(--background))",
              filter: "url(#glow)",
              style: {
                boxShadow: "0 0 20px hsl(var(--primary))",
              },
            }}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="absolute top-4 right-4 flex items-center gap-4 bg-background/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-border/50">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-primary/60" />
          <span className="text-xs font-medium">Portfolio</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-1 bg-chart-2 rounded-full opacity-60" style={{ borderStyle: "dashed" }} />
          <span className="text-xs font-medium">Benchmark</span>
        </div>
      </div>
    </div>
  )
}
