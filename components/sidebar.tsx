"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { BarChart3, Bot, RefreshCw, Shield, TrendingUp, Settings, ChevronLeft, Wallet } from "lucide-react"

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const navigation = [
  { id: "dashboard", name: "Dashboard", icon: BarChart3 },
  { id: "ai-interface", name: "AI Agent", icon: Bot },
  { id: "rebalancing", name: "Rebalancing", icon: RefreshCw },
  { id: "risk", name: "Risk Management", icon: Shield },
  { id: "market", name: "Market Data", icon: TrendingUp },
  { id: "settings", name: "Settings", icon: Settings },
]

export function Sidebar({ activeTab, setActiveTab, isOpen, setIsOpen }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setIsOpen(false)} />}

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 sidebar-gradient border-r border-border/50 transform duration-200 ease-in-out md:relative md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between px-6 border-b border-border/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
              <Wallet className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Treasury AI
            </span>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="md:hidden">
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </div>

        <nav className="p-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 duration-200",
                  activeTab === item.id
                    ? "bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/20 shadow-sm"
                    : "hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/10",
                )}
                onClick={() => {
                  setActiveTab(item.id)
                  setIsOpen(false)
                }}
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </Button>
            )
          })}
        </nav>
      </div>
    </>
  )
}
