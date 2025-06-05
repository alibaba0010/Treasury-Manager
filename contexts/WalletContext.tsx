"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { useAccount, useDisconnect } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";

interface WalletContextType {
  isConnected: boolean;
  isConnecting: boolean;
  handleConnectWallet: () => void;
  handleDisconnectWallet: () => void;
  walletAddress?: string | null;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const { isConnected, address, status, chain } = useAccount();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const { disconnect } = useDisconnect();
  const { openConnectModal } = useConnectModal();

  const handleConnectWallet = async () => {
    if (openConnectModal) {
      openConnectModal();
    }
  };

  const handleDisconnectWallet = () => {
    disconnect();
  };
  useEffect(() => {
    if (!isConnected) return;
    setWalletAddress(address || null);
  }, [isConnected]);

  const value = {
    isConnected,
    handleConnectWallet,
    handleDisconnectWallet,
    isConnecting: false,
    walletAddress: walletAddress || null,
  };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}
//   useEffect(() => {
//     if (account.isConnected) {
//       const { address, addresses, status, chain } = account;
//       dispatch(setWalletAdress({ address, addresses, status }));
//       if (chain?.name === "Electroneum Mainnet") {
//         setHasAccess(true);
//         if (url && !hasNavigated) {
//           navigate(url);
//           setHasNavigated(true);
//         }
//       }
//     } else {
//       navigate("/");
//     }
//   }, [account, url, hasNavigated]);
