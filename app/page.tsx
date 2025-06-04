"use client"

import { useState, useEffect } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Wallet,
  Bot,
  Shield,
  TrendingUp,
  RefreshCw,
  BarChart3,
  Zap,
  Lock,
  Globe,
  ArrowRight,
  CheckCircle,
} from "lucide-react"
import { useRouter } from "next/navigation"

const features = [
  {
    icon: Bot,
    title: "AI-Powered Decisions",
    description: "Advanced AI algorithms analyze market conditions and optimize portfolio allocation in real-time.",
  },
  {
    icon: RefreshCw,
    title: "Automated Rebalancing",
    description: "Intelligent rebalancing based on market signals, risk parameters, and yield optimization strategies.",
  },
  {
    icon: Shield,
    title: "Risk Management",
    description: "Comprehensive risk analytics including VaR calculations, stress testing, and compliance monitoring.",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "Live market data, performance metrics, and detailed reporting for institutional-grade insights.",
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    description: "Bank-grade security with multi-factor authentication, audit trails, and regulatory compliance.",
  },
  {
    icon: Globe,
    title: "Multi-Asset Support",
    description: "Support for tokenized treasury assets including OUSG, USDY, and other institutional instruments.",
  },
]

const benefits = [
  "Maximize yield while maintaining capital preservation",
  "Reduce operational overhead with automated management",
  "Ensure regulatory compliance with built-in monitoring",
  "Access institutional-grade treasury products",
  "Real-time risk assessment and mitigation",
  "Transparent AI decision-making process",
]

export default function HomePage() {
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const router = useRouter()

  // useEffect(() => {
  //   const connected = localStorage.getItem("wallet-connected") === "true"
  //   setIsConnected(connected)
  // }, [])

  const handleConnectWallet = async () => {
    setIsConnecting(true)
    localStorage.setItem("wallet-connected", "true")
    setIsConnected(true)
    setIsConnecting(false)
  }

  const handleOpenDashboard = () => {
    router.push("/dashboard")
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      storageKey="treasury-theme"
      disableTransitionOnChange
    >
      <div className="min-h-screen">
        {/* Header */}
        <header className="border-b header-gradient sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
                  <Wallet className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="font-bold text-xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Treasury AI
                </span>
              </div>

              <div className="flex items-center gap-4">
                <ThemeToggle />
                {isConnected ? (
                  <Button
                    onClick={handleOpenDashboard}
                    className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                  >
                    Open Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleConnectWallet}
                    disabled={isConnecting}
                    className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                  >
                    {isConnecting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Connecting...
                      </>
                    ) : (
                      <>
                        <Wallet className="mr-2 h-4 w-4" />
                        Connect Wallet
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
              <Zap className="w-3 h-3 mr-1" />
              Next-Generation Treasury Management
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
              AI-Powered Treasury
              <span className="block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Management
              </span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Institutional-grade treasury management powered by artificial intelligence. Optimize your portfolio
              allocation across tokenized assets with automated rebalancing, risk management, and real-time market
              analysis.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!isConnected ? (
                <Button
                  size="lg"
                  onClick={handleConnectWallet}
                  disabled={isConnecting}
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-lg px-8 py-6"
                >
                  {isConnecting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                      Connecting Wallet...
                    </>
                  ) : (
                    <>
                      <Wallet className="mr-2 h-5 w-5" />
                      Connect Wallet to Start
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  size="lg"
                  onClick={handleOpenDashboard}
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-lg px-8 py-6"
                >
                  Open Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              )}

              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 border-2 hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/10"
              >
                Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage institutional treasury portfolios with confidence and precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card
                  key={index}
                  className="group hover:shadow-xl duration-300 border-2 hover:border-primary/20 card-gradient-light"
                >
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 duration-300">
                      <Icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Why Choose Treasury AI?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Transform your treasury operations with cutting-edge technology designed for institutional investors.
              </p>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <Card className="p-8 card-gradient-light border-primary/20">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="h-10 w-10 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Portfolio Performance</h3>
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-primary">8.7%</div>
                    <div className="text-sm text-muted-foreground">Average YTD Return</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary">2.1%</div>
                    <div className="text-sm text-muted-foreground">Risk Score</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary">99.9%</div>
                    <div className="text-sm text-muted-foreground">Uptime</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary">$12M+</div>
                    <div className="text-sm text-muted-foreground">Assets Managed</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-6 py-20">
          <Card className="p-12 text-center card-gradient-light border-primary/20">
            <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join leading institutions using AI-powered treasury management to optimize their portfolios.
            </p>

            {!isConnected ? (
              <Button
                size="lg"
                onClick={handleConnectWallet}
                disabled={isConnecting}
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-lg px-12 py-6"
              >
                {isConnecting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Wallet className="mr-2 h-5 w-5" />
                    Connect Your Wallet
                  </>
                )}
              </Button>
            ) : (
              <Button
                size="lg"
                onClick={handleOpenDashboard}
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-lg px-12 py-6"
              >
                Access Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            )}
          </Card>
        </section>

        {/* Footer */}
        <footer className="border-t header-gradient">
          <div className="container mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center gap-2 mb-4 md:mb-0">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
                  <Wallet className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Treasury AI
                </span>
              </div>
              <p className="text-sm text-muted-foreground">© 2024 Treasury AI. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  )
}
