interface Network {
  name: string;
  url: string;
  isTestnet: boolean;
}

export const networks = [
  { name: "Ethereum", url: "eth-mainnet", isTestnet: false },
  { name: "Polygon", url: "polygon-mainnet", isTestnet: false },
  { name: "Avalanche", url: "avax-mainnet", isTestnet: false },
  { name: "Arbitrum", url: "arb-mainnet", isTestnet: false },
  { name: "BNB Smart Chain", url: "bnb-mainnet", isTestnet: false },
  { name: "Optimism", url: "opt-mainnet", isTestnet: false },
  { name: "Base", url: "base-mainnet", isTestnet: false },
  // Test networks
  { name: "Sepolia", url: "eth-sepolia", isTestnet: true },
  { name: "Arbitrum Sepolia", url: "arb-sepolia", isTestnet: true },
  { name: "Avalanche Fuji", url: "avax-fuji", isTestnet: true },
  { name: "BNB Smart Chain Testnet", url: "bnb-testnet", isTestnet: true },
  { name: "Optimism Sepolia", url: "opt-sepolia", isTestnet: true },
  { name: "Base Sepolia", url: "base-sepolia", isTestnet: true },
];
