"use client";

import React, { useEffect } from "react";
import { WagmiProvider, createConfig, http } from "wagmi";
import { sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getDefaultConfig, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { toast } from "sonner"; // <--- Import Sonner

// 1. Config Setup (Same as you had)
const config = getDefaultConfig({
  appName: 'AssetFlow',
  projectId: 'YOUR_WALLETCONNECT_ID', // Replace if you have one, or leave generic
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(process.env.NEXT_PUBLIC_ALCHEMY_SEPOLIA_URL),
  },
  ssr: true,
});

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  
  // 2. THE MAGIC INTERCEPTOR
  useEffect(() => {
    // Save the original alert just in case
    const originalAlert = window.alert;

    // Overwrite it
    window.alert = (message: any) => {
      const msg = String(message);
      
      // Auto-detect error messages
      if (msg.toLowerCase().includes("error") || msg.toLowerCase().includes("fail") || msg.toLowerCase().includes("reject")) {
        toast.error("Action Failed", {
          description: msg,
        });
      } 
      // Auto-detect warning messages
      else if (msg.toLowerCase().includes("connect") || msg.toLowerCase().includes("please")) {
        toast.warning("Attention", {
          description: msg,
        });
      }
      // Default to Success
      else {
        toast.success("Success", {
          description: msg,
        });
      }
    };

    // Cleanup when app closes (optional)
    return () => {
      window.alert = originalAlert;
    };
  }, []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

// Export config for use in other files
export { config };