"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Pause, Play } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

interface DashboardHeaderProps {
  isActive: boolean;
  toggleTrading: () => void;
}

export function DashboardHeader({
  isActive,
  toggleTrading,
}: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Portfolio Dashboard
        </h1>
        <p className="text-muted-foreground">
          Real-time treasury management overview
        </p>
      </div>
      <div className="flex items-center gap-4">
        <ConnectButton />
        <Badge
          variant="secondary"
          className={cn(
            "gap-1 transition-all duration-300",
            isActive
              ? "bg-gradient-to-r from-green-500/20 to-green-400/10 border-green-500/30"
              : "bg-gradient-to-r from-red-500/20 to-red-400/10 border-red-500/30"
          )}
        >
          <div
            className={cn(
              "h-2 w-2 rounded-full",
              isActive ? "bg-green-500 animate-pulse" : "bg-red-500"
            )}
          />
          {isActive ? "Active" : "Paused"}
        </Badge>
        <Button
          variant="outline"
          size="sm"
          onClick={toggleTrading}
          className="bg-gradient-to-r from-background to-muted/20 hover:from-muted/20 hover:to-muted/40"
        >
          {isActive ? (
            <>
              <Pause className="h-4 w-4 mr-2" />
              Pause Trading
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" />
              Resume Trading
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
