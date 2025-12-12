import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Web3Provider } from "@/providers/Web3Provider";
import { Toaster } from "sonner"; // <--- 1. Import this

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "AssetFlow",
  description: "RWA Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-[#08090A] text-white`}>
        <Web3Provider>
          {children}
          {/* 2. Add this line here */}
          <Toaster position="bottom-right" theme="dark" richColors /> 
        </Web3Provider>
      </body>
    </html>
  );
}