"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wallet } from "lucide-react"
import type { TokenBalance } from "@/types/token"

interface TokenBalancesProps {
  balances: TokenBalance[]
  nativeBalances: TokenBalance[]
  isLoading: boolean
}

export function TokenBalances({ balances, nativeBalances, isLoading }: TokenBalancesProps) {
  const allTokens = [...balances, ...nativeBalances]

  return (
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
              <div key={i} className="animate-pulse space-y-2 p-4 border rounded-lg">
                <div className="h-4 bg-muted rounded w-20" />
                <div className="h-6 bg-muted rounded w-24" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {allTokens.map((balance, i) => (
              <div key={i} className="p-4 border rounded-lg bg-card/50 hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {balance.logo && (
                      <img
                        src={balance.logo || "/placeholder.svg"}
                        alt={balance.symbol}
                        className="w-6 h-6 rounded-full"
                      />
                    )}
                    {balance.address === "native" && <Wallet className="w-6 h-6 text-primary" />}
                    <div>
                      <span className="font-medium">{balance.symbol}</span>
                      <div className="text-xs text-muted-foreground">{balance.name}</div>
                    </div>
                  </div>
                  <Badge variant="secondary">{balance.chain}</Badge>
                </div>
                <div className="mt-2 text-lg font-bold">
                  {Number.parseFloat(balance.balance).toFixed(Math.min(balance.decimals || 18, 4))}
                  <span className="ml-2 text-xs text-muted-foreground">{balance.symbol}</span>
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
  )
}
