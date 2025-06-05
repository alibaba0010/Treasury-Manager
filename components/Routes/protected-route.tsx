"use client";

import type React from "react";

import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "@/contexts/WalletContext";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isConnected } = useWallet() || {};
  const walletAddress = "0x1234567890abcdef1234567890abcdef12345678"; // Replace with actual wallet address
  const checkAccess = useCallback(async () => {
    if (!isConnected) {
      router.push("/");
      return;
    }

    // Only proceed with fetch if not already loading and profile doesn't exist
    if (!walletAddress) {
      router.push("/");
    }
  }, [isConnected]);

  useEffect(() => {
    checkAccess();
  }, [checkAccess]);

  return <>{children}</>;
}
