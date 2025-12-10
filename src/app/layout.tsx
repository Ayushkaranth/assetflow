import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import { Inter } from "next/font/google"; // Using standard Inter for ease
import "./globals.css";
import { cn } from "@/utils/cn"; // Ensure you created this util in the previous step
import { Web3Provider } from "@/providers/Web3Provider";

const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", variable: "--font-serif" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "AssetFlow",
  description: "Tangible Wealth Marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(serif.variable, sans.variable, "font-sans antialiased relative")}>
        
        {/* The Noise Overlay - Just a simple div using the CSS class */}
        <div className="bg-noise" />

        <main className="relative z-10">
          <Web3Provider>
            {children}
        </Web3Provider>
        </main>
      </body>
    </html>
  );
}