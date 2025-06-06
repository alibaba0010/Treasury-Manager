import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const shortenAddress = (address: string) => {
  if (address) return address.slice(0, 6) + "..." + address.slice(-4);
};
// Hardcoded prices for common tokens when API fails
export const fallbackPrices: Record<string, number> = {
  // Native token prices
  ethereum: 1850.0, // ETH price
  sepolia: 1850.0, // Sepolia ETH (same as mainnet)
  arbitrum: 1850.0, // Arbitrum ETH
  optimism: 1850.0, // Optimism ETH
  base: 1850.0, // Base ETH
  avalanche: 11.5, // AVAX price
  "avalanche fuji": 11.5, // Fuji AVAX
  polygon: 0.62, // MATIC price
  "bnb smart chain": 240.0, // BNB price

  // USDC addresses
  "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": 0.998, // Ethereum USDC
  "0x1c7d4b196cb0c7b01d743fbc6116a902379c7238": 0.998, // Sepolia USDC
  "0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e": 0.998, // Avalanche USDC
  "0x5425890298aed601595a70ab815c96711a31bc65": 0.998, // Fuji USDC
  // Add other stable tokens as needed
  "0xdac17f958d2ee523a2206206994597c13d831ec7": 0.998, // USDT
};
