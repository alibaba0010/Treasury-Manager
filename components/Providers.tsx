"use client";

import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { type State, WagmiProvider } from "wagmi";
import { type ReactNode, useState } from "react";

import { config as getConfig, chains } from "@/config/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WalletProvider } from "@/contexts/WalletContext";

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;
if (!projectId) {
  throw new Error("Missing NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID");
}
const { wallets } = getDefaultWallets({
  appName: "Treasury Manager",
  projectId,
});

export function Providers(props: {
  children: ReactNode;
  initialState?: State;
}) {
  const [config] = useState(() => getConfig());
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config} initialState={props.initialState}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          modalSize="compact"
          showRecentTransactions={false}
          initialChain={chains[0]}
        >
          <WalletProvider>{props.children}</WalletProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
