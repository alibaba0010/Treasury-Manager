"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownRight, RefreshCw } from "lucide-react"

const positions = [
  {
    symbol: "OUSG",
    holdings: "8,350,000",
    marketValue: "$8,350,000",
    price: "$1.00",
    change24h: "+0.12%",
    allocation: "65.0%",
    target: "60.0%",
    deviation: "+5.0%",
    lastRebalance: "2024-11-28",
    isPositive: true,
  },
  {
    symbol: "USDY",
    holdings: "4,497,392",
    marketValue: "$4,497,392",
    price: "$1.00",
    change24h: "-0.05%",
    allocation: "35.0%",
    target: "40.0%",
    deviation: "-5.0%",
    lastRebalance: "2024-11-28",
    isPositive: false,
  },
]

export function PositionsTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Asset</TableHead>
          <TableHead>Holdings</TableHead>
          <TableHead>Market Value</TableHead>
          <TableHead>24h Change</TableHead>
          <TableHead>Allocation</TableHead>
          <TableHead>Target</TableHead>
          <TableHead>Deviation</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {positions.map((position) => (
          <TableRow key={position.symbol}>
            <TableCell className="font-medium">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  {position.symbol.slice(0, 2)}
                </div>
                {position.symbol}
              </div>
            </TableCell>
            <TableCell>{position.holdings}</TableCell>
            <TableCell>{position.marketValue}</TableCell>
            <TableCell>
              <div className={`flex items-center gap-1 ${position.isPositive ? "text-green-600" : "text-red-600"}`}>
                {position.isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {position.change24h}
              </div>
            </TableCell>
            <TableCell>{position.allocation}</TableCell>
            <TableCell>{position.target}</TableCell>
            <TableCell>
              <Badge variant={position.deviation.startsWith("+") ? "destructive" : "secondary"}>
                {position.deviation}
              </Badge>
            </TableCell>
            <TableCell>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-3 w-3 mr-1" />
                Rebalance
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
