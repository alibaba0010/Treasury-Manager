"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { RefreshCw, Pause, CheckCircle, Clock } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function RebalancingDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Rebalancing Dashboard</h1>
          <p className="text-muted-foreground">Monitor and control portfolio rebalancing</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="destructive" size="sm">
            <Pause className="h-4 w-4 mr-2" />
            Emergency Stop
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Force Rebalance
          </Button>
        </div>
      </div>

      {/* Current Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rebalancing Status</CardTitle>
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Idle</div>
            <div className="flex items-center gap-2 mt-2">
              <div className="h-2 w-2 bg-green-500 rounded-full" />
              <span className="text-sm text-muted-foreground">Ready for next rebalance</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Rebalance</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2h ago</div>
            <div className="flex items-center gap-2 mt-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm text-muted-foreground">Successful</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Scheduled</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6h</div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm text-muted-foreground">Auto-rebalance check</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Manual Rebalancing Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Manual Rebalancing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">OUSG Target Allocation</label>
                <div className="mt-2">
                  <Slider defaultValue={[60]} max={100} step={1} />
                  <div className="flex justify-between text-sm text-muted-foreground mt-1">
                    <span>0%</span>
                    <span>60%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">USDY Target Allocation</label>
                <div className="mt-2">
                  <Slider defaultValue={[40]} max={100} step={1} />
                  <div className="flex justify-between text-sm text-muted-foreground mt-1">
                    <span>0%</span>
                    <span>40%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Rebalancing Preview</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>OUSG: Sell $250,000</span>
                    <span className="text-red-600">-$250K</span>
                  </div>
                  <div className="flex justify-between">
                    <span>USDY: Buy $250,000</span>
                    <span className="text-green-600">+$250K</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span>Estimated Gas Fees</span>
                    <span>$45</span>
                  </div>
                </div>
              </div>

              <Button className="w-full">Execute Rebalance</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rebalancing History */}
      <Card>
        <CardHeader>
          <CardTitle>Rebalancing History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Trigger</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Gas Fees</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Impact</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  date: "2024-11-30 14:30",
                  trigger: "Allocation Drift",
                  action: "OUSG → USDY",
                  amount: "$500,000",
                  gasFees: "$42",
                  status: "Completed",
                  impact: "+0.12%",
                },
                {
                  date: "2024-11-29 09:15",
                  trigger: "Market Signal",
                  action: "USDY → OUSG",
                  amount: "$750,000",
                  gasFees: "$38",
                  status: "Completed",
                  impact: "+0.08%",
                },
                {
                  date: "2024-11-28 16:45",
                  trigger: "Scheduled",
                  action: "No Action",
                  amount: "-",
                  gasFees: "-",
                  status: "Completed",
                  impact: "0.00%",
                },
              ].map((rebalance, index) => (
                <TableRow key={index}>
                  <TableCell className="font-mono text-sm">{rebalance.date}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{rebalance.trigger}</Badge>
                  </TableCell>
                  <TableCell>{rebalance.action}</TableCell>
                  <TableCell>{rebalance.amount}</TableCell>
                  <TableCell>{rebalance.gasFees}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      {rebalance.status}
                    </Badge>
                  </TableCell>
                  <TableCell className={rebalance.impact.startsWith("+") ? "text-green-600" : "text-muted-foreground"}>
                    {rebalance.impact}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
