"use client";

import { useState, useEffect } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { Dashboard } from "@/components/dashboard";
import { AIInterface } from "@/components/ai-interface";
import { RebalancingDashboard } from "@/components/rebalancing-dashboard";
import { RiskManagement } from "@/components/risk-management";
import { MarketData } from "@/components/market-data";
import { Settings } from "@/components/settings";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // const connected = localStorage.getItem("wallet-connected") === "true"
    const connected = true; // Replace with actual connection logic
    if (!connected) {
      router.push("/");
    } else {
      setIsConnected(true);
    }
    setIsLoading(false);
  }, [router]);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "ai-interface":
        return <AIInterface />;
      case "rebalancing":
        return <RebalancingDashboard />;
      case "risk":
        return <RiskManagement />;
      case "market":
        return <MarketData />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  if (isLoading) {
    return (
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
        storageKey="treasury-theme"
        disableTransitionOnChange
      >
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      </ThemeProvider>
    );
  }

  if (!isConnected) {
    return null;
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      storageKey="treasury-theme"
      disableTransitionOnChange
    >
      <div className="min-h-screen text-foreground">
        <div className="flex h-screen overflow-hidden">
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isOpen={sidebarOpen}
            setIsOpen={setSidebarOpen}
          />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <main className="flex-1 overflow-auto p-6">{renderContent()}</main>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
