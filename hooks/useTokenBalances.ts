import { useState, useEffect } from "react";
import { formatUnits } from "viem";
import { useWallet } from "@/contexts/WalletContext";
import { networks } from "@/utils/networks";

interface TokenBalance {
  chain: string;
  symbol: string;
  balance: string;
  value: number;
  address: string;
  logo: string;
  name: string;
  decimals: number;
}

interface Network {
  name: string;
  url: string;
  isTestnet: boolean;
}
const fetchTokenPriceUSD = async (
  contractAddress: string,
  chain: string
): Promise<number> => {
  try {
    // Map network name to CoinGecko platform id
    const platformMap: Record<string, string> = {
      ethereum: "ethereum",
      polygon: "polygon-pos",
      arbitrum: "arbitrum-one",
      optimism: "optimism",
      avalanche: "avalanche-2",
      "bnb smart chain": "binance-smart-chain",
      base: "base",
      "eth-sepolia": "ethereum",
      "arb-sepolia": "arbitrum-one",
    };
    const platformId = platformMap[chain.toLowerCase()];
    if (!platformId) return 0;

    const url = `https://api.coingecko.com/api/v3/simple/token_price/${platformId}?contract_addresses=${contractAddress}&vs_currencies=usd`;
    const res = await fetch(url);
    const data = await res.json();
    const price = data[contractAddress.toLowerCase()]?.usd;
    return price ? Number(price) : 0;
  } catch (e) {
    console.error("Error fetching token price:", e);
    return 0;
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
    const data = await response.json();
    const balance = formatUnits(BigInt(data.result), 18);
    const amount = Number(balance);
    if (amount <= 0) return null;

    // Fetch USD price for native token
    const price = await fetchTokenPriceUSD(
      network.name === "ethereum" ? "ethereum" : network.name, // Use network name for native
      network.name
    );
    const value = amount * price;

    return {
      chain: network.name,
      symbol: network.name === "ethereum" ? "ETH" : network.name.toUpperCase(),
      balance,
      value,
      address: "native",
      decimals: 18,
      logo: "", // You can add a logo URL if you want
      name: `${network.name} Native`,
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

    const data = await response.json();
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
            logo: metadata.logo,
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

export function useTokenBalances(includeTestnets: boolean = false) {
  const { walletAddress, isConnected } = useWallet();
  const [balances, setBalances] = useState<TokenBalance[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalValue, setTotalValue] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isConnected || !walletAddress) {
      setBalances([]);
      setIsLoading(false);
      return;
    }

    async function fetchBalances() {
      setIsLoading(true);
      setError(null);

      try {
        if (!walletAddress) return;

        const allBalances = await Promise.all(
          networks.map((network) =>
            fetchNetworkBalances(network, walletAddress)
          )
        );

        const flattenedBalances = allBalances.flat().filter(Boolean);
        setBalances(flattenedBalances);

        const total = flattenedBalances.reduce(
          (acc, token) => acc + Number(token.balance),
          0
        );
        setTotalValue(total);
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
  }, [walletAddress, isConnected, includeTestnets]);

  return { balances, isLoading, totalValue, error };
}
