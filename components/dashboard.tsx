"use client";

import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  DollarSign,
  Activity,
  ArrowUpRight,
  Pause,
  Play,
} from "lucide-react";
import { PortfolioChart } from "@/components/portfolio-chart";
import { AllocationChart } from "@/components/allocation-chart";
import { PositionsTable } from "@/components/positions-table";
import { ActivityFeed } from "@/components/activity-feed";
import { useTokenBalances } from "@/hooks/useTokenBalances";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useWallet } from "@/contexts/WalletContext";

export function Dashboard() {
  const [isActive, setIsActive] = useState(true);
  const [ytdReturn, setYtdReturn] = useState(8.7);
  const [selectedInvestments, setSelectedInvestments] = useState<{
    [key: string]: number;
  }>({});
  const [selectedChains, setSelectedChains] = useState<string[]>([]);
  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);
  const { isConnected, walletAddress } = useWallet();
  const { balances, isLoading, totalValue } = useTokenBalances();
  // console.log("Balances:", balances);
  // Simulate real-time updates for other metrics
  useEffect(() => {
    const interval = setInterval(() => {
      if (isActive) {
        setYtdReturn((prev) => prev + (Math.random() * 0.1 - 0.05));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isActive]);

  const toggleTrading = () => {
    setIsActive(!isActive);
  };
  const handleInvestmentChange = (
    address: string,
    max: number,
    value: string
  ) => {
    let amount = parseFloat(value);
    if (isNaN(amount) || amount < 0) amount = 0;
    if (amount > max) amount = max;
    setSelectedInvestments((prev) => ({
      ...prev,
      [address]: amount,
    }));
  };
  if (!isConnected || !walletAddress) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <h1 className="text-3xl font-bold text-center">Connect Your Wallet</h1>
        <p className="text-muted-foreground text-center">
          Connect your wallet to view your treasury portfolio
        </p>
        <ConnectButton />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
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

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-card/50 border-2 hover:border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Portfolio Value
            </CardTitle>
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
                  ${totalValue.toLocaleString()}
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
            <div className="flex items-center text-sm text-muted-foreground">
              Annualized
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-card/50 border-2 hover:border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
            <Badge
              variant="secondary"
              className="bg-gradient-to-r from-green-500/20 to-green-400/10 border-green-500/30"
            >
              Low
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.1</div>
            <Progress
              value={21}
              className="mt-2 bg-gradient-to-r from-muted to-muted/50"
            />
          </CardContent>
        </Card>
      </div>

      {/* Add Token Balances Section */}
      <Card className="bg-gradient-to-br from-card to-card/50 border-2 hover:border-primary/20 transition-all duration-300">
        <CardHeader>
          <CardTitle className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Token Balances
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="animate-pulse space-y-2 p-4 border rounded-lg"
                >
                  <div className="h-4 bg-muted rounded w-20" />
                  <div className="h-6 bg-muted rounded w-24" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {balances.map((balance, i) => (
                <div
                  key={i}
                  className="p-4 border rounded-lg bg-card/50 hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {balance.logo && (
                        <img
                          src={balance.logo}
                          alt={balance.symbol}
                          className="w-6 h-6 rounded-full"
                        />
                      )}
                      <div>
                        <span className="font-medium">{balance.symbol}</span>
                        <div className="text-xs text-muted-foreground">
                          {balance.name}
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary">{balance.chain}</Badge>
                  </div>
                  <div className="mt-2 text-lg font-bold">
                    {parseFloat(balance.balance).toFixed(
                      Math.min(balance.decimals || 18, 2)
                    )}
                    <span className="ml-2 text-xs text-muted-foreground">
                      {balance.symbol}
                    </span>
                  </div>
                  <div className="text-sm text-green-700 font-semibold mt-1">
                    $
                    {balance.value.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      {/* Add below the Token Balances section */}
      <Card className="bg-gradient-to-br from-card to-card/50 border-2 hover:border-primary/20 transition-all duration-300">
        <CardHeader>
          <CardTitle className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Select Tokens to Invest
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {balances.map((balance, i) => (
              <div key={i} className="p-4 border rounded-lg bg-card/50">
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    checked={selectedInvestments[balance.address] > 0}
                    onChange={(e) =>
                      setSelectedInvestments((prev) => ({
                        ...prev,
                        [balance.address]: e.target.checked ? 0.01 : 0,
                      }))
                    }
                  />
                  <span className="font-medium">{balance.symbol}</span>
                  <Badge variant="secondary">{balance.chain}</Badge>
                </div>
                <input
                  type="number"
                  min={0}
                  max={parseFloat(balance.balance)}
                  step="any"
                  disabled={
                    !selectedInvestments[balance.address] &&
                    selectedInvestments[balance.address] !== 0
                  }
                  value={selectedInvestments[balance.address] || ""}
                  onChange={(e) =>
                    handleInvestmentChange(
                      balance.address,
                      parseFloat(balance.balance),
                      e.target.value
                    )
                  }
                  className="w-full border rounded px-2 py-1"
                  placeholder={`Max: ${parseFloat(balance.balance).toFixed(4)}`}
                />
                <div className="text-xs text-muted-foreground mt-1">
                  Available: {parseFloat(balance.balance).toFixed(4)}{" "}
                  {balance.symbol}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-gradient-to-br from-card to-card/50 border-2 hover:border-primary/20 transition-all duration-300">
          <CardHeader>
            <CardTitle className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Portfolio Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PortfolioChart />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-card/50 border-2 hover:border-primary/20 transition-all duration-300">
          <CardHeader>
            <CardTitle className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Asset Allocation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AllocationChart />
          </CardContent>
        </Card>
      </div>

      {/* Positions and Activity */}
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
    </div>
  );
}
