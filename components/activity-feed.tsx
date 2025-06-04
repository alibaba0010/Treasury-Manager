"use client"

import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { RefreshCw, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "rebalance",
    title: "Portfolio Rebalanced",
    description: "Moved $500K from USDY to OUSG",
    time: "2 hours ago",
    status: "completed",
    icon: RefreshCw,
  },
  {
    id: 2,
    type: "ai_decision",
    title: "AI Analysis Complete",
    description: "Market conditions favor OUSG allocation",
    time: "4 hours ago",
    status: "info",
    icon: TrendingUp,
  },
  {
    id: 3,
    type: "alert",
    title: "Risk Threshold Alert",
    description: "Portfolio deviation exceeded 5%",
    time: "6 hours ago",
    status: "warning",
    icon: AlertTriangle,
  },
  {
    id: 4,
    type: "transaction",
    title: "Transaction Confirmed",
    description: "OUSG purchase of $250K completed",
    time: "8 hours ago",
    status: "completed",
    icon: CheckCircle,
  },
  {
    id: 5,
    type: "rebalance",
    title: "Auto-Rebalance Triggered",
    description: "Allocation drift detected, rebalancing initiated",
    time: "12 hours ago",
    status: "completed",
    icon: RefreshCw,
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-500"
    case "warning":
      return "bg-yellow-500"
    case "info":
      return "bg-blue-500"
    default:
      return "bg-gray-500"
  }
}

export function ActivityFeed() {
  return (
    <ScrollArea className="h-80">
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon
          return (
            <div
              key={activity.id}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className={`p-2 rounded-full ${getStatusColor(activity.status)}/10`}>
                <Icon className={`h-4 w-4 ${getStatusColor(activity.status).replace("bg-", "text-")}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{activity.title}</p>
                <p className="text-xs text-muted-foreground">{activity.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
              </div>
              <Badge variant="outline" className="text-xs">
                {activity.type.replace("_", " ")}
              </Badge>
            </div>
          )
        })}
      </div>
    </ScrollArea>
  )
}
