"use client";

import type React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSign } from "lucide-react";
import type { TokenBalance } from "@/types/token";

interface InvestmentSectionProps {
  balances: TokenBalance[];
  nativeBalances: TokenBalance[];
  selectedInvestments: { [key: string]: number };
  setSelectedInvestments: React.Dispatch<
    React.SetStateAction<{ [key: string]: number }>
  >;
  handleInvestmentChange: (address: string, max: number, value: string) => void;
  calculateTotalInvestmentValue: () => number;
  handleInvest: () => void;
  isInvesting: boolean;
}

export function InvestmentSection({
  balances,
  nativeBalances,
  selectedInvestments,
  setSelectedInvestments,
  handleInvestmentChange,
  calculateTotalInvestmentValue,
  handleInvest,
  isInvesting,
}: InvestmentSectionProps) {
  const allTokens = [...balances, ...nativeBalances];

  return (
    <Card className="bg-gradient-to-br from-card to-card/50 border-2 hover:border-primary/20 transition-all duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Select Tokens to Invest
          </CardTitle>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">
              Total Investment Value
            </div>
            <div className="text-xl font-bold text-green-600">
              ${calculateTotalInvestmentValue().toFixed(2)}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {allTokens.map((balance, i) => (
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
                  className="rounded"
                />
                <div className="flex items-center gap-2">
                  {balance.logo && (
                    <img
                      src={balance.logo || "/placeholder.svg"}
                      alt={balance.symbol}
                      className="w-5 h-5 rounded-full"
                    />
                  )}
                  <span className="font-medium">{balance.symbol}</span>
                </div>
                <Badge variant="secondary" className="ml-auto">
                  {balance.chain}
                </Badge>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`amount-${i}`} className="text-xs">
                  Amount to invest
                </Label>
                <Input
                  id={`amount-${i}`}
                  type="number"
                  min={0}
                  max={Number.parseFloat(balance.balance)}
                  step="any"
                  disabled={
                    !selectedInvestments[balance.address] &&
                    selectedInvestments[balance.address] !== 0
                  }
                  value={selectedInvestments[balance.address] || ""}
                  onChange={(e) =>
                    handleInvestmentChange(
                      balance.address,
                      Number.parseFloat(balance.balance),
                      e.target.value
                    )
                  }
                  placeholder={`Max: ${Number.parseFloat(
                    balance.balance
                  ).toFixed(4)}`}
                />
                <div className="text-xs text-muted-foreground">
                  Available: {Number.parseFloat(balance.balance).toFixed(4)}{" "}
                  {balance.symbol}
                  <br />
                  Value: ${balance.value.toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {Object.keys(selectedInvestments).some(
          (key) => selectedInvestments[key] > 0
        ) && (
          <div className="flex justify-center">
            <Button
              onClick={handleInvest}
              disabled={isInvesting}
              size="lg"
              className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600"
            >
              {isInvesting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Converting to USDC...
                </>
              ) : (
                <>
                  <DollarSign className="h-4 w-4 mr-2" />
                  Invest ${calculateTotalInvestmentValue().toFixed(2)} → USDC
                </>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
