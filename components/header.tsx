"use client";

import { useState } from "react";
import {
  Bell,
  Menu,
  Search,
  User,
  LogOut,
  X,
  Wallet,
  Settings,
  Shield,
  Copy,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import { useWallet } from "@/contexts/WalletContext";
import { notifications } from "@/utils/notifications";
import { shortenAddress } from "@/lib/utils";
interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function Header({ sidebarOpen, setSidebarOpen }: HeaderProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notificationList, setNotificationList] = useState(notifications);
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  const {
    isConnected,
    handleDisconnectWallet,
    handleConnectWallet,
    walletAddress,
  } = useWallet();

  const handleCopyAddress = async () => {
    if (!walletAddress) return;
    await navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const markAsRead = (id: number) => {
    setNotificationList((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const markAllAsRead = () => {
    setNotificationList((prev) =>
      prev.map((notif) => ({ ...notif, read: true }))
    );
  };

  const unreadCount = notificationList.filter((n) => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return "🟢";
      case "warning":
        return "🟡";
      case "info":
        return "🔵";
      default:
        return "⚪";
    }
  };

  return (
    <header className="border-b header-gradient">
      <div className="flex h-16 items-center px-6 gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div className="flex-1 flex items-center gap-4">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search portfolio, transactions..."
              className="pl-10 bg-gradient-to-r from-background/50 to-muted/20 border-border/50 hover-glow"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground">Live</span>
          </div>

          {/* Notifications Dropdown */}
          <DropdownMenu
            open={notificationsOpen}
            onOpenChange={setNotificationsOpen}
          >
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative hover-glow"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-gradient-to-r from-red-500 to-red-600 animate-pulse">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-96 p-0 notification-panel"
            >
              <Card className="border-0 shadow-none bg-transparent">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                      Notifications
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      {unreadCount > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={markAllAsRead}
                          className="text-xs hover-glow"
                        >
                          Mark all read
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setNotificationsOpen(false)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-96">
                    <div className="space-y-1">
                      {notificationList.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-border/50 hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/10 cursor-pointer transition-all duration-200 ${
                            !notification.read
                              ? "bg-gradient-to-r from-primary/10 to-primary/5"
                              : ""
                          }`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-lg">
                              {getNotificationIcon(notification.type)}
                            </span>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="font-medium text-sm">
                                  {notification.title}
                                </p>
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-muted-foreground mt-2">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </DropdownMenuContent>
          </DropdownMenu>

          <ThemeToggle />

          {/* Enhanced Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 hover:from-primary/30 hover:to-primary/20 hover-glow"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                  <User className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background animate-pulse" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-80 p-0 profile-dropdown"
            >
              <div className="p-6">
                {/* User Profile Section */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                      <User className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                      Treasury Manager
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Administrator
                    </p>
                    <Badge
                      variant="secondary"
                      className="mt-1 text-xs bg-gradient-to-r from-green-500/20 to-green-400/10 border-green-500/30"
                    >
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-1" />
                      Active
                    </Badge>
                  </div>
                </div>

                {/* Wallet Information */}
                <div className="bg-gradient-to-r from-muted/50 to-muted/20 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium flex items-center gap-2">
                      <Wallet className="h-4 w-4" />
                      Connected Wallet
                    </span>
                    <Badge variant="outline" className="text-xs">
                      Ethereum
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <code className="text-sm font-mono bg-background/50 px-2 py-1 rounded">
                      {shortenAddress(walletAddress!)}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCopyAddress}
                      className="h-6 w-6 p-0 hover-glow"
                    >
                      {copied ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Portfolio Summary */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-primary">$12.8M</div>
                    <div className="text-xs text-muted-foreground">
                      Portfolio Value
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-green-500/10 to-green-400/5 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-green-600">
                      +8.7%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      YTD Return
                    </div>
                  </div>
                </div>

                <DropdownMenuSeparator className="my-4" />

                {/* Menu Items */}
                <div className="space-y-1">
                  <DropdownMenuItem className="cursor-pointer hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 rounded-lg">
                    <User className="h-4 w-4 mr-3" />
                    <span>Profile Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 rounded-lg">
                    <Settings className="h-4 w-4 mr-3" />
                    <span>Preferences</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 rounded-lg">
                    <Shield className="h-4 w-4 mr-3" />
                    <span>Security</span>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="my-2" />
                  {isConnected ? (
                    <DropdownMenuItem
                      onClick={handleDisconnectWallet}
                      className="cursor-pointer text-destructive hover:bg-gradient-to-r hover:from-destructive/10 hover:to-destructive/5 rounded-lg"
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      <span>Disconnect Wallet</span>
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem
                      onClick={handleConnectWallet}
                      className="cursor-pointer text-primary hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 rounded-lg"
                    >
                      <Wallet className="h-4 w-4 mr-3" />
                      <span>Connect Wallet</span>
                    </DropdownMenuItem>
                  )}
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
