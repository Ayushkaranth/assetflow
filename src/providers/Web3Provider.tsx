"use client";
import React from "react";
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, base, sepolia } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// 1. Configure Chains & WalletConnect Project ID
// (You can get a free Project ID at cloud.walletconnect.com, or leave strictly local for now)
const config = getDefaultConfig({
  appName: 'AssetFlow',
  projectId: 'YOUR_PROJECT_ID', // Replace this later for production
  chains: [mainnet, polygon, base, sepolia],
  ssr: true, // If your dApp uses server-side rendering (Next.js)
});

// 2. Setup React Query Client
const queryClient = new QueryClient();

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider 
          theme={darkTheme({
             accentColor: '#3B82F6', // Matches our Blue/Teal vibe
             accentColorForeground: 'white',
             borderRadius: 'medium',
             overlayBlur: 'small',
          })}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}