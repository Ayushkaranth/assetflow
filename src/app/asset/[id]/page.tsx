"use client";
import React, { useState, useEffect, use } from "react"; 
import { Navbar } from "@/components/Navbar";
import Image from "next/image";
import { ArrowLeft, MapPin, ShieldCheck, TrendingUp, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useWriteContract, useWaitForTransactionReceipt, useAccount, useReadContract } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { ASSET_TOKEN_ABI } from '@/constants/contracts';

export default function AssetPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const assetAddress = id as `0x${string}`;

  // Read Metadata
  const { data: name } = useReadContract({ address: assetAddress, abi: ASSET_TOKEN_ABI, functionName: 'name' });
  const { data: symbol } = useReadContract({ address: assetAddress, abi: ASSET_TOKEN_ABI, functionName: 'symbol' });
  const { data: imageURI } = useReadContract({ address: assetAddress, abi: ASSET_TOKEN_ABI, functionName: 'metadataURI' });
  
  // Read Dynamic Price
  const { data: spotPrice } = useReadContract({ 
      address: assetAddress, abi: ASSET_TOKEN_ABI, functionName: 'spotPrice', 
      query: { refetchInterval: 5000 } 
  });

  const displayImage = imageURI ? String(imageURI) : "https://images.unsplash.com/photo-1600596542815-27b88e5422d3";

  // --- TRADING WIDGET ---
  const TradingTerminal = () => {
     const [amount, setAmount] = useState("1"); 
     const [mode, setMode] = useState<"BUY" | "SELL">("BUY"); // Toggle
     const { isConnected } = useAccount();

     // Write Hook
     const { data: hash, writeContract, isPending, error: writeError } = useWriteContract();
     const { isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

     // Dynamic Quote Fetching
     const { data: quotePrice } = useReadContract({
        address: assetAddress,
        abi: ASSET_TOKEN_ABI,
        functionName: mode === "BUY" ? 'getBuyPrice' : 'getSellPrice',
        args: [amount ? BigInt(amount) : BigInt(0)],
     });

     useEffect(() => {
        if (isConfirmed) alert(`Success! ${mode} Complete.`);
        if (writeError) alert("Error: " + (writeError as any).shortMessage || writeError.message);
     }, [isConfirmed, writeError]);

     const handleTrade = () => {
        if (!isConnected) return alert("Connect Wallet");
        if (!amount || Number(amount) <= 0) return alert("Enter amount");
        
        if (mode === "BUY") {
            // For buying, we must send ETH value
            writeContract({
                address: assetAddress, 
                abi: ASSET_TOKEN_ABI,
                functionName: 'buyShares',
                args: [BigInt(amount)],
                value: quotePrice as bigint, // Calculated cost
            });
        } else {
            // For selling, no ETH sent (only gas)
            writeContract({
                address: assetAddress, 
                abi: ASSET_TOKEN_ABI,
                functionName: 'sellShares',
                args: [BigInt(amount)],
            });
        }
     };

     return (
        <div className="p-6 rounded-2xl bg-[#15171B] border border-white/10 shadow-2xl">
           
           {/* Tab Switcher */}
           <div className="flex p-1 bg-black/40 rounded-lg mb-6 border border-white/5">
              <button 
                onClick={() => setMode("BUY")}
                className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${mode === "BUY" ? "bg-green-500 text-black shadow-lg" : "text-[#8A8F98] hover:text-white"}`}
              >
                BUY
              </button>
              <button 
                onClick={() => setMode("SELL")}
                className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${mode === "SELL" ? "bg-red-500 text-black shadow-lg" : "text-[#8A8F98] hover:text-white"}`}
              >
                SELL
              </button>
           </div>

           {/* Price Info */}
           <div className="flex justify-between items-center mb-6">
              <div>
                  <div className="text-xs text-[#8A8F98]">Current Share Price</div>
                  <div className="text-xl font-mono text-white">
                      {spotPrice ? formatEther(spotPrice as bigint) : "..."} ETH
                  </div>
              </div>
              <div className="text-xs px-2 py-1 bg-blue-500/10 text-blue-400 rounded border border-blue-500/20">
                 Market Open
              </div>
           </div>

           {/* Input */}
           <div className="space-y-4 mb-6">
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 hover:border-white/10 transition-colors">
                 <div className="flex justify-between mb-1">
                    <span className="text-xs text-[#8A8F98]">Quantity</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <input 
                        type="number" 
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="bg-transparent text-2xl font-medium text-white w-full focus:outline-none"
                        placeholder="0"
                    />
                    <div className="text-sm font-medium text-white/50">{symbol ? String(symbol) : "SHARES"}</div>
                 </div>
              </div>
           </div>

           {/* Quote Summary */}
           <div className="space-y-2 mb-6">
               <div className="flex justify-between text-sm text-[#8A8F98]">
                  <span>{mode === "BUY" ? "Total Cost" : "Estimated Refund"}</span>
                  <span className={`font-mono ${mode === "BUY" ? "text-white" : "text-green-400"}`}>
                     {quotePrice ? formatEther(quotePrice as bigint) : "0.00"} ETH
                  </span>
               </div>
               {/* Slippage Warning */}
               {Number(amount) > 10 && (
                   <div className="flex items-center gap-1 text-[10px] text-yellow-500 bg-yellow-500/10 p-2 rounded">
                       <AlertTriangle className="w-3 h-3" />
                       High Slippage: Large orders impact price significantly.
                   </div>
               )}
           </div>

           <button 
              onClick={handleTrade}
              disabled={isPending}
              className={`w-full py-4 font-bold rounded-xl transition-all ${
                  mode === "BUY" ? "bg-green-500 hover:bg-green-400 text-black" : "bg-red-500 hover:bg-red-400 text-black"
              }`}
           >
              {isPending ? "Confirming..." : mode}
           </button>
           
           {hash && <div className="mt-4 text-center text-xs text-blue-400">Tx: {hash.slice(0,10)}...</div>}
        </div>
     );
  };

  return (
    <div className="min-h-screen bg-[#08090A] text-[#ECECEC] selection:bg-blue-500/30">
      <Navbar />
      
      {/* 1. HERO */}
      <div className="relative h-[60vh] w-full">
        <Image src={displayImage} alt="Asset" fill className="object-cover" priority unoptimized />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090A] via-[#08090A]/40 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 md:p-12 max-w-7xl mx-auto w-full">
           <Link href="/market" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white mb-6">
              <ArrowLeft className="w-4 h-4" /> Back
           </Link>
           <h1 className="text-5xl md:text-6xl font-[family-name:var(--font-serif)] text-white mb-2">
              {name ? String(name) : "Loading..."}
           </h1>
           <div className="flex items-center gap-4 text-[#8A8F98] text-lg">
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Scarcity Model</span>
              <span className="bg-white/10 px-3 py-1 rounded-full text-sm text-white border border-white/5 flex items-center gap-2">
                 <TrendingUp className="w-3 h-3 text-green-400" /> Dynamic Pricing Active
              </span>
           </div>
        </div>
      </div>

      {/* 2. CONTENT GRID */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
         <div className="lg:col-span-2 space-y-8">
            <h3 className="text-xl font-[family-name:var(--font-serif)] text-white">Market Mechanics</h3>
            <p className="text-[#8A8F98] leading-relaxed text-lg">
               This asset utilizes a <strong>Linear Bonding Curve</strong>. 
               Prices increase as supply decreases, rewarding early adopters. 
               You can sell shares back to the contract at any time for instant liquidity.
            </p>
            <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-xl">
                <div className="text-sm text-blue-200 mb-1">💎 Scarcity Premium</div>
                <div className="text-xs text-blue-400/60">
                    Each share purchased increases the price of the next share by 0.1% (slope).
                </div>
            </div>
         </div>

         <div className="lg:col-span-1">
            <div className="sticky top-24">
               <TradingTerminal />
               <div className="mt-6 flex flex-col gap-3">
                  <div className="flex items-center gap-3 text-xs text-[#8A8F98]">
                     <ShieldCheck className="w-4 h-4 text-green-400" />
                     <span>Instant Liquidity (Sell Anytime)</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}