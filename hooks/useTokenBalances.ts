"use client";

import { useState, useEffect } from "react";
import { formatUnits } from "viem";
import { useWallet } from "@/contexts/WalletContext";
import { networks } from "@/utils/networks";
import { TokenBalance } from "@/types/token";
import { getTokenLogo } from "@/utils/tokenLogos";
import { fallbackPrices } from "@/lib/utils";

interface Network {
  name: string;
  url: string;
  isTestnet: boolean;
}

// Native token price mapping for CoinGecko
const nativeTokenIds: Record<string, string> = {
  ethereum: "ethereum",
  polygon: "matic-network",
  arbitrum: "ethereum", // ARB uses ETH
  optimism: "ethereum", // OP uses ETH
  avalanche: "avalanche-2",
  "bnb smart chain": "binancecoin",
  base: "ethereum", // Base uses ETH
  sepolia: "ethereum",
  "arb-sepolia": "ethereum",
  "avalanche fuji": "avalanche-2",
};
const nativeTokenLogos: Record<string, string> = {
  ethereum: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
  polygon:
    "https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png",
  arbitrum: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
  optimism: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
  avalanche:
    "https://assets.coingecko.com/coins/images/12559/small/coin-round-red.png",
  "bnb smart chain":
    "https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png",
  base: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
  sepolia: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
  "arb-sepolia":
    "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
};

// Native token symbols
const nativeTokenSymbols: Record<string, string> = {
  ethereum: "ETH",
  polygon: "MATIC",
  arbitrum: "ETH",
  optimism: "ETH",
  avalanche: "AVAX",
  "bnb smart chain": "BNB",
  base: "ETH",
  "eth-sepolia": "ETH",
  "arb-sepolia": "ETH",
};

const fetchTokenPriceUSD = async (
  contractAddress: string,
  chain: string
): Promise<number> => {
  try {
    // Handle native token prices
    if (contractAddress === "native") {
      return fetchNativePriceUSD(chain);
    }

    // Map network name to CoinGecko platform id
    const platformMap: Record<string, string> = {
      ethereum: "ethereum",
      polygon: "polygon-pos",
      arbitrum: "arbitrum-one",
      optimism: "optimistic-ethereum",
      avalanche: "avalanche",
      "bnb smart chain": "binance-smart-chain",
      base: "base",
      sepolia: "ethereum",
      "arb-sepolia": "arbitrum-one",
      "avalanche fuji": "avalanche",
      "avax-fuji": "avalanche",
    };

    const normalizedAddress = contractAddress.toLowerCase();

    // console.log(
    //   "Fetching token price for:",
    //   contractAddress,
    //   "on chain:",
    //   chain
    // );
    const platformId = platformMap[chain.toLowerCase()];
    // console.log("Platform ID for chain:", platformId);

    if (!platformId) {
      return fallbackPrices[normalizedAddress] || 0;
    }

    const url = `https://api.coingecko.com/api/v3/simple/token_price/${platformId}?contract_addresses=${contractAddress}&vs_currencies=usd`;
    const res = await fetch(url);

    if (!res.ok) {
      console.warn(
        `Failed to fetch price for ${contractAddress} on ${chain}, using fallback price`
      );
      return fallbackPrices[normalizedAddress] || 0;
    }

    const data = await res.json();
    const price = data[normalizedAddress]?.usd;
    // console.log("Fetched price:", price, "for address:", normalizedAddress);
    return price ? Number(price) : fallbackPrices[normalizedAddress] || 0;
  } catch (e) {
    console.error("Error fetching token price:", e);
    // Return fallback price if available, otherwise 0
    return fallbackPrices[contractAddress.toLowerCase()] || 0;
  }
};

const fetchNativePriceUSD = async (chain: string): Promise<number> => {
  try {
    console.log("Fetching native price for chain:", chain);
    const tokenId = nativeTokenIds[chain.toLowerCase()];
    if (!tokenId) return 0;
    console.log(chain, tokenId);
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${tokenId}&vs_currencies=usd`;
    const res = await fetch(url);

    if (!res.ok) {
      console.warn(
        `Failed to fetch native price for ${chain}, using fallback price`
      );
      // Use fallback price for native token
      return fallbackPrices[`native-${chain.toLowerCase()}`] || 0;
    }

    const data = await res.json();
    const price = data[tokenId]?.usd;
    return price
      ? Number(price)
      : fallbackPrices[`native-${chain.toLowerCase()}`] || 0;
  } catch (e) {
    console.error("Error fetching native token price:", e);
    // Return fallback price for native token
    return fallbackPrices[`native-${chain.toLowerCase()}`] || 0;
  }
};

const fetchNativeBalance = async (
  network: Network,
  walletAddress: string
): Promise<TokenBalance | null> => {
  try {
    const url = getAlchemyUrl(network.url);
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: 1,
        jsonrpc: "2.0",
        method: "eth_getBalance",
        params: [walletAddress, "latest"],
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(`API error: ${data.error.message}`);
    }

    const balance = formatUnits(BigInt(data.result), 18);
    const amount = Number(balance);

    if (amount <= 0) return null;

    // Fetch USD price for native token
    const price = await fetchNativePriceUSD(network.name);
    const value = amount * price;

    const symbol =
      nativeTokenSymbols[network.name.toLowerCase()] ||
      network.name.toUpperCase();
    return {
      chain: network.name,
      symbol,
      balance,
      value,
      address: "native",
      decimals: 18,
      logo: nativeTokenLogos[network.name.toLowerCase()] || "", // You can add native token logos here
      name: `${network.name} Native Token`,
    };
  } catch (error) {
    console.error(`Error fetching native balance for ${network.name}:`, error);
    return null;
  }
};

const getAlchemyUrl = (networkUrl: string): string => {
  const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;

  if (!ALCHEMY_API_KEY) {
    throw new Error("Alchemy API key is not configured");
  }

  return `https://${networkUrl}.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;
};

const fetchTokenMetadata = async (
  network: Network,
  tokenAddress: string
): Promise<any> => {
  try {
    const url = getAlchemyUrl(network.url);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: 1,
        jsonrpc: "2.0",
        method: "alchemy_getTokenMetadata",
        params: [tokenAddress],
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      console.warn(
        `Error fetching metadata for ${tokenAddress}:`,
        data.error.message
      );
      return null;
    }

    return data.result;
  } catch (error) {
    console.error(`Error fetching token metadata:`, error);
    return null;
  }
};

const fetchNetworkBalances = async (
  network: Network,
  walletAddress: string
): Promise<TokenBalance[]> => {
  try {
    const url = getAlchemyUrl(network.url);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: 1,
        jsonrpc: "2.0",
        method: "alchemy_getTokenBalances",
        params: [walletAddress, "erc20"],
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(`API error: ${data.error.message}`);
    }

    // Fetch metadata and price for all tokens with non-zero balance
    const tokenBalances = await Promise.all(
      data.result.tokenBalances
        .filter((token: any) => token.tokenBalance !== "0x0")
        .map(async (token: any) => {
          const metadata = await fetchTokenMetadata(
            network,
            token.contractAddress
          );
          if (!metadata) return null;

          const balance = formatUnits(
            BigInt(token.tokenBalance),
            metadata.decimals || 18
          );
          const amount = Number(balance);
          if (amount <= 0) return null; // Only show tokens with amount > 0

          // Fetch USD price
          const price = await fetchTokenPriceUSD(
            token.contractAddress,
            network.name
          );
          const value = amount * price;

          return {
            chain: network.name,
            symbol: metadata.symbol || "Unknown",
            balance,
            value,
            address: token.contractAddress,
            decimals: metadata.decimals,
            logo: getTokenLogo(
              network.name,
              token.contractAddress,
              network.isTestnet
            ),
            name: metadata.name,
          };
        })
    );

    return tokenBalances.filter(Boolean);
  } catch (error) {
    console.error(`Error fetching balances for ${network.name}:`, error);
    return [];
  }
};

export function useTokenBalances() {
  const { walletAddress, isConnected } = useWallet();
  const [balances, setBalances] = useState<TokenBalance[]>([]);
  const [nativeBalances, setNativeBalances] = useState<TokenBalance[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalValue, setTotalValue] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isConnected || !walletAddress) {
      setBalances([]);
      setNativeBalances([]);
      setIsLoading(false);
      return;
    }

    async function fetchBalances() {
      setIsLoading(true);
      setError(null);

      try {
        if (!walletAddress) return;

        // Fetch ERC-20 token balances
        const allBalances = await Promise.all(
          networks.map((network) =>
            fetchNetworkBalances(network, walletAddress)
          )
        );

        // Fetch native token balances
        const allNativeBalances = await Promise.all(
          networks.map((network) => fetchNativeBalance(network, walletAddress))
        );

        const flattenedBalances = allBalances.flat().filter(Boolean);
        const flattenedNativeBalances = allNativeBalances.filter(
          (balance): balance is TokenBalance => balance !== null
        );
        setBalances(flattenedBalances);
        setNativeBalances(flattenedNativeBalances);

        // Calculate total value from both ERC-20 and native tokens
        const erc20Total = flattenedBalances.reduce(
          (acc, token) => acc + token.value,
          0
        );
        const nativeTotal = flattenedNativeBalances.reduce(
          (acc, token) => acc + token.value,
          0
        );

        setTotalValue(erc20Total + nativeTotal);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
        console.error("Error fetching balances:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBalances();
  }, [walletAddress, isConnected]);

  return { balances, nativeBalances, isLoading, totalValue, error };
}
