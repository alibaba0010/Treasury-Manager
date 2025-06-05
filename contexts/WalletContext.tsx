"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
  useCallback,
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
  const { disconnect } = useDisconnect();
  const { openConnectModal } = useConnectModal();
  const [walletState, setWalletState] = useState({
    isConnecting: false,
    walletAddress: null as string | null,
  });
  const handleConnectWallet = useCallback(() => {
    if (openConnectModal) {
      openConnectModal();
    }
  }, [openConnectModal]);

  const handleDisconnectWallet = useCallback(() => {
    disconnect();
    setWalletState((prev) => ({
      ...prev,
      walletAddress: null,
    }));
  }, [disconnect]);

  useEffect(() => {
    if (isConnected && address) {
      setWalletState((prev) => ({
        ...prev,
        walletAddress: address,
      }));
    } else if (!isConnected) {
      setWalletState((prev) => ({
        ...prev,
        walletAddress: null,
      }));
    }
  }, [isConnected, address]);

  const value = {
    isConnected,
    handleConnectWallet,
    handleDisconnectWallet,
    isConnecting: walletState.isConnecting,
    walletAddress: walletState.walletAddress,
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
