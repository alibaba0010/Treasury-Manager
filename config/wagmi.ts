import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { http } from "viem";
import { mainnet, polygon, avalanche, arbitrum } from "wagmi/chains";
import { createConfig } from "wagmi";

const alchemyApiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;
if (!projectId) {
  throw new Error("Missing NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID");
}

if (!alchemyApiKey) {
  throw new Error("Missing ALCHEMY_API_KEY");
}

// const { wallets } = getDefaultWallets({
//   appName: "AI Treasury Manager",
//   projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "",
// });

export const chains = [mainnet, polygon, avalanche, arbitrum] as const;

export function config() {
  return createConfig({
    chains,
    transports: {
      [mainnet.id]: http(
        `https://eth-mainnet.g.alchemy.com/v2/${alchemyApiKey}`
      ),
      [polygon.id]: http(
        `https://polygon-mainnet.g.alchemy.com/v2/${alchemyApiKey}`
      ),
      [avalanche.id]: http(
        `https://avalanche-mainnet.g.alchemy.com/v2/${alchemyApiKey}`
      ),
      [arbitrum.id]: http(
        `https://arb-mainnet.g.alchemy.com/v2/${alchemyApiKey}`
      ),
    },
  });
}
declare module "wagmi" {
  interface Register {
    config: ReturnType<typeof config>;
  }
}
