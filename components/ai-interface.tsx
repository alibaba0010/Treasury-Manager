"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, Send, Brain } from "lucide-react"

export function AIInterface() {
  const [message, setMessage] = useState("")
  const [chatHistory, setChatHistory] = useState([
    {
      type: "ai",
      content:
        "Hello! I'm your AI Treasury Manager. I can explain my decisions, analyze market conditions, and answer questions about your portfolio. How can I help you today?",
      timestamp: new Date().toLocaleTimeString(),
    },
  ])

  const handleSendMessage = () => {
    if (!message.trim()) return

    setChatHistory((prev) => [
      ...prev,
      {
        type: "user",
        content: message,
        timestamp: new Date().toLocaleTimeString(),
      },
    ])

    // Simulate AI response
    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        {
          type: "ai",
          content:
            "Based on current market conditions and your risk parameters, I recommend maintaining the current OUSG allocation. The yield spread remains favorable and volatility is within acceptable ranges.",
          timestamp: new Date().toLocaleTimeString(),
        },
      ])
    }, 1000)

    setMessage("")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">AI Agent Interface</h1>
          <p className="text-muted-foreground">Interact with your AI treasury manager</p>
        </div>
        <Badge variant="secondary" className="gap-1">
          <Bot className="h-3 w-3" />
          AI Active
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              Ask the AI
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ScrollArea className="h-96 border rounded-lg p-4">
              <div className="space-y-4">
                {chatHistory.map((msg, index) => (
                  <div key={index} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        msg.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <p className="text-xs opacity-70 mt-1">{msg.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="flex gap-2">
              <Input
                placeholder="Ask about portfolio decisions, market analysis..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* AI Status & Quick Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Confidence Level</span>
                  <Badge variant="secondary">High (87%)</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Market Sentiment</span>
                  <Badge variant="outline">Neutral</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Risk Assessment</span>
                  <Badge variant="secondary">Low</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start text-sm">
                Why did you rebalance yesterday?
              </Button>
              <Button variant="outline" className="w-full justify-start text-sm">
                What's your market outlook?
              </Button>
              <Button variant="outline" className="w-full justify-start text-sm">
                Explain current allocation
              </Button>
              <Button variant="outline" className="w-full justify-start text-sm">
                Risk assessment summary
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent AI Decisions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent AI Decisions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                time: "2 hours ago",
                decision: "Increased OUSG allocation by 3%",
                reasoning: "Treasury yields showed upward momentum, favoring OUSG over USDY for yield optimization",
                confidence: 85,
                outcome: "Positive",
              },
              {
                time: "1 day ago",
                decision: "Maintained current allocation",
                reasoning: "Market volatility within acceptable ranges, no rebalancing needed",
                confidence: 92,
                outcome: "Neutral",
              },
              {
                time: "3 days ago",
                decision: "Reduced USDY exposure by 2%",
                reasoning: "Fed policy signals suggested rate environment favoring OUSG strategy",
                confidence: 78,
                outcome: "Positive",
              },
            ].map((decision, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{decision.decision}</h4>
                  <div className="flex items-center gap-2">
                    <Badge variant={decision.outcome === "Positive" ? "default" : "secondary"}>
                      {decision.outcome}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{decision.time}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{decision.reasoning}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs">Confidence:</span>
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: `${decision.confidence}%` }} />
                  </div>
                  <span className="text-xs">{decision.confidence}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
