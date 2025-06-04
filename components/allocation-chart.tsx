"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { useState, useEffect } from "react"
import { TrendingUp, Target, DollarSign } from "lucide-react"

const data = [
  { name: "OUSG", value: 65, color: "hsl(var(--primary))", target: 60, amount: "$8.35M" },
  { name: "USDY", value: 35, color: "hsl(var(--chart-2))", target: 40, amount: "$4.50M" },
]

const RADIAN = Math.PI / 180

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={18}
      fontWeight="bold"
      style={{
        filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.4))",
        textShadow: "0 2px 4px rgba(0,0,0,0.6)",
      }}
      className="animate-fade-in animate-delayed-2"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl p-6 shadow-2xl animate-fade-in">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-5 h-5 rounded-full shadow-lg animate-sparkle" style={{ backgroundColor: data.color }} />
          <span className="font-bold text-xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            {data.name}
          </span>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between gap-6">
            <span className="text-muted-foreground">Current:</span>
            <span className="font-semibold text-lg">{data.value}%</span>
          </div>
          <div className="flex justify-between gap-6">
            <span className="text-muted-foreground">Target:</span>
            <span className="font-semibold text-lg">{data.target}%</span>
          </div>
          <div className="flex justify-between gap-6">
            <span className="text-muted-foreground">Amount:</span>
            <span className="font-semibold text-lg text-green-500">{data.amount}</span>
          </div>
          <div className="flex justify-between gap-6">
            <span className="text-muted-foreground">Deviation:</span>
            <span className={`font-semibold text-lg ${data.value > data.target ? "text-red-500" : "text-green-500"}`}>
              {data.value > data.target ? "+" : ""}
              {data.value - data.target}%
            </span>
          </div>
        </div>
      </div>
    )
  }
  return null
}

export function AllocationChart() {
  const [mounted, setMounted] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="h-80 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  const totalValue = data.reduce(
    (sum, item) => sum + Number.parseFloat(item.amount.replace("$", "").replace("M", "")),
    0,
  )

  return (
    <div className="h-full relative animate-fade-in">
      {/* Header Section */}
      <div className="mb-6 p-6 rounded-2xl bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl border border-border/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Asset Allocation
          </h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Target className="h-4 w-4" />
            <span>Target vs Current</span>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
            <div className="text-2xl font-bold text-primary">${totalValue.toFixed(1)}M</div>
            <div className="text-xs text-muted-foreground">Total Allocated</div>
          </div>
          <div className="text-center p-3 rounded-xl bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20">
            <div className="text-2xl font-bold text-green-500">2</div>
            <div className="text-xs text-muted-foreground">Active Assets</div>
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div className="chart-container relative overflow-hidden animate-float">
        {/* Enhanced background with animated gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-chart-2/10 rounded-2xl" />

        {/* Floating sparkles */}
        <div className="absolute top-4 left-4 w-2 h-2 bg-primary/60 rounded-full animate-sparkle" />
        <div className="absolute top-8 right-6 w-1 h-1 bg-chart-2/60 rounded-full animate-sparkle animate-delayed-1" />
        <div className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-primary/40 rounded-full animate-sparkle animate-delayed-2" />

        <ResponsiveContainer width="100%" height={200}>
          <PieChart className="animate-pie-rotate">
            <defs>
              {/* Enhanced gradients with multiple stops */}
              <radialGradient id="ousgGradient" cx="30%" cy="30%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={1} />
                <stop offset="30%" stopColor="hsl(var(--primary))" stopOpacity={0.9} />
                <stop offset="60%" stopColor="hsl(var(--primary))" stopOpacity={0.7} />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.5} />
              </radialGradient>

              <radialGradient id="usdyGradient" cx="30%" cy="30%">
                <stop offset="0%" stopColor="hsl(var(--chart-2))" stopOpacity={1} />
                <stop offset="30%" stopColor="hsl(var(--chart-2))" stopOpacity={0.9} />
                <stop offset="60%" stopColor="hsl(var(--chart-2))" stopOpacity={0.7} />
                <stop offset="100%" stopColor="hsl(var(--chart-2))" stopOpacity={0.5} />
              </radialGradient>

              {/* Glow effects */}
              <filter id="pieGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Enhanced shadow */}
              <filter id="dropshadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="6" stdDeviation="12" floodColor="rgba(0,0,0,0.4)" />
              </filter>
            </defs>

            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              innerRadius={25}
              fill="#8884d8"
              dataKey="value"
              stroke="hsl(var(--background))"
              strokeWidth={4}
              filter="url(#dropshadow)"
              onMouseEnter={(_, index) => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === 0 ? "url(#ousgGradient)" : "url(#usdyGradient)"}
                  style={{
                    filter: hoveredIndex === index ? "url(#pieGlow)" : "url(#dropshadow)",
                    transform: hoveredIndex === index ? "scale(1.05)" : "scale(1)",
                    transformOrigin: "center",
                    transition: "all 0.3s ease",
                  }}
                  className="animate-pie-slice animate-delayed-1"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Enhanced Legend with detailed cards */}
        <div className="mt-6 space-y-3">
          {data.map((item, index) => (
            <div
              key={item.name}
              className={`
                group relative p-4 rounded-2xl 
                bg-gradient-to-r from-background/90 to-background/50 
                backdrop-blur-xl border border-border/50 
                hover:border-primary/40 transition-all duration-500 
                hover:shadow-2xl hover:scale-[1.02]
                animate-slide-in animate-delayed-${index + 1}
                ${hoveredIndex === index ? "scale-[1.02] shadow-2xl border-primary/40" : ""}
              `}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Animated background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-chart-2/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative">
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div
                        className="w-6 h-6 rounded-full shadow-xl transition-all duration-300 group-hover:scale-110"
                        style={{
                          background:
                            index === 0
                              ? "radial-gradient(circle at 30% 30%, hsl(var(--primary)), hsl(var(--primary)) 50%, hsl(var(--primary)) 80%)"
                              : "radial-gradient(circle at 30% 30%, hsl(var(--chart-2)), hsl(var(--chart-2)) 50%, hsl(var(--chart-2)) 80%)",
                        }}
                      />
                      <div className="absolute inset-0 rounded-full bg-white/30 group-hover:bg-white/40 transition-all duration-300 animate-sparkle" />
                    </div>
                    <div>
                      <span className="font-bold text-lg bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                        {item.name}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-xl bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                      {item.value}%
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div className="text-center p-2 rounded-lg bg-gradient-to-br from-background/60 to-background/30">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <DollarSign className="h-3 w-3 text-green-500" />
                      <span className="text-xs text-muted-foreground">Value</span>
                    </div>
                    <div className="font-semibold text-sm text-green-500">{item.amount}</div>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-gradient-to-br from-background/60 to-background/30">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Target className="h-3 w-3 text-blue-500" />
                      <span className="text-xs text-muted-foreground">Target</span>
                    </div>
                    <div className="font-semibold text-sm text-blue-500">{item.target}%</div>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-gradient-to-br from-background/60 to-background/30">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <TrendingUp className="h-3 w-3 text-orange-500" />
                      <span className="text-xs text-muted-foreground">Diff</span>
                    </div>
                    <div
                      className={`font-semibold text-sm ${item.value > item.target ? "text-red-500" : "text-green-500"}`}
                    >
                      {item.value > item.target ? "+" : ""}
                      {item.value - item.target}%
                    </div>
                  </div>
                </div>

                {/* Enhanced progress bar */}
                <div className="relative">
                  <div className="flex justify-between text-xs text-muted-foreground mb-2">
                    <span className="font-medium">Progress to Target</span>
                    <span className="font-bold">{Math.min(100, (item.value / item.target) * 100).toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-muted/30 rounded-full h-3 overflow-hidden shadow-inner">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                      style={{
                        width: `${Math.min(100, (item.value / item.target) * 100)}%`,
                        background:
                          item.value >= item.target
                            ? "linear-gradient(90deg, hsl(var(--chart-1)), hsl(var(--chart-1)) 50%, hsl(var(--chart-1)) 80%)"
                            : "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary)) 50%, hsl(var(--primary)) 80%)",
                      }}
                    >
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-sparkle" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
