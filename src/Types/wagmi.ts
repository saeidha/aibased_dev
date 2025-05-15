import { createConfig, http } from "wagmi";
import "@rainbow-me/rainbowkit/styles.css";
import { base } from "wagmi/chains";
import "@rainbow-me/rainbowkit/styles.css";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { coinbaseWallet } from "@rainbow-me/rainbowkit/wallets";

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [coinbaseWallet],
    },
  ],
  {
    appName: "AI Based",
    projectId: import.meta.env.VITE_PROJECT_ID,
  }
);

export const config = createConfig({
  connectors,
  chains: [base],
  transports: {
    [base.id]: http(), // HTTP provider for Ethereum Mainnet
  },
});
