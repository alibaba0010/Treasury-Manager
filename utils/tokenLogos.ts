interface TokenLogoMap {
  [network: string]: {
    native: string;
    tokens: {
      [address: string]: string;
    };
  };
}

// Common token logos that are the same across all networks
const COMMON_TOKEN_LOGOS = {
  USDC: "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png",
  USDT: "https://assets.coingecko.com/coins/images/325/small/Tether.png",
  WBTC: "https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png",
  WETH: "https://assets.coingecko.com/coins/images/2518/small/weth.png",
};

// Network-specific token addresses and their logos
export const TOKEN_LOGOS: TokenLogoMap = {
  ethereum: {
    native: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
    tokens: {
      "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": COMMON_TOKEN_LOGOS.USDC, // Mainnet USDC
      "0xdac17f958d2ee523a2206206994597c13d831ec7": COMMON_TOKEN_LOGOS.USDT, // Mainnet USDT
    },
  },
  sepolia: {
    native: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
    tokens: {
      "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238": COMMON_TOKEN_LOGOS.USDC, // Sepolia USDC
    },
  },
  avalanche: {
    native:
      "https://assets.coingecko.com/coins/images/12559/small/coin-round-red.png",
    tokens: {
      "0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e": COMMON_TOKEN_LOGOS.USDC, // Avalanche USDC
    },
  },
  "avalanche fuji": {
    native:
      "https://assets.coingecko.com/coins/images/12559/small/coin-round-red.png",
    tokens: {
      "0x5425890298aed601595a70ab815c96711a31bc65": COMMON_TOKEN_LOGOS.USDC, // Fuji USDC
    },
  },
  // Add other networks...
};

export function getTokenLogo(
  network: string,
  address: string,
  isTestnet: boolean
): string {
  const normalizedNetwork = network.toLowerCase();
  const normalizedAddress = address.toLowerCase();

  // Handle native token
  if (address === "native") {
    return (
      TOKEN_LOGOS[normalizedNetwork]?.native || TOKEN_LOGOS.ethereum.native
    );
  }

  // Check for network-specific token logo
  const networkTokens = TOKEN_LOGOS[normalizedNetwork]?.tokens;

  // Debug logging to help track the issue
  console.log("Looking up token:", {
    network: normalizedNetwork,
    address: normalizedAddress,
    availableTokens: networkTokens,
  });

  // Make sure networkTokens exists before accessing it
  if (networkTokens && normalizedAddress in networkTokens) {
    return networkTokens[normalizedAddress];
  }

  // For well-known tokens, check common logos
  if (
    address.toLowerCase() ===
    "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238".toLowerCase()
  ) {
    return COMMON_TOKEN_LOGOS.USDC;
  }

  const fallbackLogo =
    "https://assets.coingecko.com/coins/images/12242/small/unknown.png";
  return fallbackLogo;
}
