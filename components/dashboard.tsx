"use client";

import { useState, useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useWallet } from "@/contexts/WalletContext";
import { useTokenBalances } from "@/hooks/useTokenBalances";

// Import sub-components
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { KeyMetrics } from "@/components/dashboard/key-metrics";
import { TokenBalances } from "@/components/dashboard/token-balances";
import { InvestmentSection } from "@/components/dashboard/investment-section";
import { ChartsSection } from "@/components/dashboard/charts-section";
import { PositionsActivity } from "@/components/dashboard/positions-activity";

export function Dashboard() {
  const [isActive, setIsActive] = useState(true);
  const [ytdReturn, setYtdReturn] = useState(8.7);
  const [selectedInvestments, setSelectedInvestments] = useState<{
    [key: string]: number;
  }>({});
  const { isConnected, walletAddress } = useWallet();
  const { balances, isLoading, totalValue, nativeBalances } =
    useTokenBalances();
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
    let amount = Number.parseFloat(value);
    if (isNaN(amount) || amount < 0) amount = 0;
    if (amount > max) amount = max;
    setSelectedInvestments((prev) => ({
      ...prev,
      [address]: amount,
    }));
  };

  const calculateTotalInvestmentValue = () => {
    let total = 0;

    // Calculate from ERC-20 tokens
    balances.forEach((balance) => {
      const amount = selectedInvestments[balance.address] || 0;
      total += amount * (balance.value / Number.parseFloat(balance.balance));
    });

    // Calculate from native tokens
    nativeBalances.forEach((balance) => {
      const amount = selectedInvestments[balance.address] || 0;
      total += amount * (balance.value / Number.parseFloat(balance.balance));
    });

    return total;
  };

  // const handleInvest = async () => {
  //   setIsInvesting(true);
  //   try {
  //     const totalInvestmentValue = calculateTotalInvestmentValue();

  //     // Simulate investment process
  //     console.log("Converting tokens to USDC...");
  //     console.log("Total investment value:", totalInvestmentValue);
  //     console.log("Selected investments:", selectedInvestments);

  //     // Here you would implement the actual token swapping logic
  //     // This could involve calling smart contracts or DEX APIs

  //     await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call

  //     alert(
  //       `Successfully invested $${totalInvestmentValue.toFixed(
  //         2
  //       )} worth of tokens and converted to USDC!`
  //     );
  //     setSelectedInvestments({});
  //   } catch (error) {
  //     console.error("Investment failed:", error);
  //     alert("Investment failed. Please try again.");
  //   } finally {
  //     setIsInvesting(false);
  //   }
  // };

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
      <DashboardHeader isActive={isActive} toggleTrading={toggleTrading} />

      {/* Key Metrics */}
      <KeyMetrics
        totalValue={totalValue}
        ytdReturn={ytdReturn}
        isLoading={isLoading}
      />

      {/* Token Balances Section */}
      <TokenBalances
        balances={balances}
        nativeBalances={nativeBalances}
        isLoading={isLoading}
      />

      {/* Investment Selection Section */}
      <InvestmentSection
        balances={balances}
        nativeBalances={nativeBalances}
        selectedInvestments={selectedInvestments}
        setSelectedInvestments={setSelectedInvestments}
        handleInvestmentChange={handleInvestmentChange}
        calculateTotalInvestmentValue={calculateTotalInvestmentValue}
      />

      {/* Charts Section */}
      <ChartsSection />

      {/* Positions and Activity */}
      <PositionsActivity />
    </div>
  );
}
