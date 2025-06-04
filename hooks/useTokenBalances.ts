import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { formatUnits } from "viem";

interface TokenBalance {
  chain: string;
  symbol: string;
  balance: string;
  value: number;
  address: string;
}

export function useTokenBalances() {
  const { address, isConnected } = useAccount();
  const [balances, setBalances] = useState<TokenBalance[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    if (!isConnected || !address) {
      setBalances([]);
      setIsLoading(false);
      return;
    }

    async function fetchBalances() {
      try {
        const networks = [
          { name: "Ethereum", url: "eth-mainnet" },
          { name: "Polygon", url: "polygon-mainnet" },
          { name: "Arbitrum", url: "arb-mainnet" },
          { name: "Avalanche", url: "avalanche-mainnet" },
        ];

        const allBalances = await Promise.all(
          networks.map(async (network) => {
            const response = await fetch(
              `https://${network.url}.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}/token/balances/${address}`
            );
            const data = await response.json();
            return data.tokenBalances?.map((token: any) => ({
              chain: network.name,
              symbol: token.metadata?.symbol || "Unknown",
              balance: formatUnits(
                BigInt(token.tokenBalance),
                token.metadata?.decimals || 18
              ),
              value: 0,
              address: token.contractAddress,
            }));
          })
        );

        const flattenedBalances = allBalances.flat().filter(Boolean);
        setBalances(flattenedBalances);

        // Calculate total value (mock for now)
        const total = flattenedBalances.reduce(
          (acc, token) => acc + Number(token.balance),
          0
        );
        setTotalValue(total);
      } catch (error) {
        console.error("Error fetching balances:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBalances();
  }, [address, isConnected]);

  return { balances, isLoading, totalValue };
}
