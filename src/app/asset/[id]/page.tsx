"use client";
import React, { useState, useEffect, use } from "react"; 
import { Navbar } from "@/components/Navbar";
import Image from "next/image";
import { ArrowLeft, MapPin, ShieldCheck, Globe, Info } from "lucide-react";
import Link from "next/link";
import { useWriteContract, useWaitForTransactionReceipt, useAccount, useReadContract } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { ASSET_TOKEN_ABI } from '@/constants/contracts';

export default function AssetPage({ params }: { params: Promise<{ id: string }> }) {
  // 1. Unwrap params (Next.js 15)
  const { id } = use(params);
  const assetAddress = id as `0x${string}`;

  // 2. Read Contract Data
  const { data: name } = useReadContract({
     address: assetAddress, abi: ASSET_TOKEN_ABI, functionName: 'name',
  });

  const { data: symbol } = useReadContract({
    address: assetAddress, abi: ASSET_TOKEN_ABI, functionName: 'symbol',
 });

  const { data: sharePrice } = useReadContract({
     address: assetAddress, abi: ASSET_TOKEN_ABI, functionName: 'sharePrice',
  });

  const { data: assetPrice } = useReadContract({
    address: assetAddress, abi: ASSET_TOKEN_ABI, functionName: 'assetPrice',
 });

  // NEW: Read Image from IPFS
  const { data: imageURI } = useReadContract({
    address: assetAddress, abi: ASSET_TOKEN_ABI, functionName: 'metadataURI',
 });

  // Fallback if no image found
  const displayImage = imageURI 
    ? String(imageURI) 
    : "https://images.unsplash.com/photo-1600596542815-27b88e5422d3?q=80&w=2674&auto=format&fit=crop";

  // --- TRADING WIDGET COMPONENT ---
  const OrderTicket = () => {
     const [amount, setAmount] = useState(""); 
     const { data: hash, writeContract, isPending, error: writeError } = useWriteContract();
     const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });
     const { isConnected } = useAccount();

     useEffect(() => {
        if (isConfirmed) alert("Success! You have purchased shares. 🚀");
        if (writeError) alert("Error: " + writeError.message);
     }, [isConfirmed, writeError]);

     const handleBuy = () => {
        if (!isConnected) return alert("Please Connect Wallet");
        if (!amount) return alert("Enter amount of shares");
        
        writeContract({
          address: assetAddress, 
          abi: ASSET_TOKEN_ABI,
          functionName: 'buyShares',
          args: [BigInt(amount)],
          value: (sharePrice as bigint) * BigInt(amount),
        });
     };

     return (
        <div className="p-6 rounded-2xl bg-[#15171B] border border-white/10 shadow-2xl">
           <div className="flex justify-between items-center mb-6">
              <h3 className="font-medium text-white">Buy {symbol ? String(symbol) : "Shares"}</h3>
              <span className="text-xs text-[#8A8F98] bg-white/5 px-2 py-1 rounded">
                 Balance: Connected
              </span>
           </div>

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
                    <div className="text-sm font-medium text-white/50">SHARES</div>
                 </div>
              </div>
           </div>

           <div className="flex justify-between text-sm mb-6 text-[#8A8F98]">
              <span>Total Cost:</span>
              <span className="text-white">
                 {!sharePrice ? (
                    <span className="animate-pulse text-yellow-500">Loading Price...</span>
                 ) : (
                    amount ? formatEther((sharePrice as bigint) * BigInt(amount)) : "0.00"
                 )} 
                 {" ETH"}
              </span>
           </div>

           <button 
              onClick={handleBuy}
              disabled={isPending || isConfirming}
              className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 disabled:opacity-50 transition-all"
           >
              {isPending ? "Check Wallet..." : isConfirming ? "Confirming..." : "Confirm Transaction"}
           </button>
           
           {hash && (
               <div className="mt-4 text-center text-xs text-blue-400">
                   <a href={`https://sepolia.etherscan.io/tx/${hash}`} target="_blank" className="hover:underline">
                      View Transaction ↗
                   </a>
               </div>
           )}
        </div>
     );
  };

  return (
    <div className="min-h-screen bg-[#08090A] text-[#ECECEC] selection:bg-blue-500/30">
      <Navbar />
      
      {/* 1. HERO SECTION (Dynamic Image) */}
      <div className="relative h-[60vh] w-full">
        <Image 
          src={displayImage}
          alt="Asset"
          fill
          className="object-cover"
          priority 
          unoptimized // <--- FIX FOR PINATA 429 ERROR
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090A] via-[#08090A]/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 p-8 md:p-12 max-w-7xl mx-auto w-full">
           <Link href="/market" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Market
           </Link>
           <h1 className="text-5xl md:text-6xl font-[family-name:var(--font-serif)] text-white mb-2">
              {name ? String(name) : "Loading Asset..."}
           </h1>
           <div className="flex items-center gap-4 text-[#8A8F98] text-lg">
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Global Asset</span>
              <span className="bg-white/10 px-3 py-1 rounded-full text-sm text-white border border-white/5">
                 Valuation: {assetPrice ? formatEther(assetPrice as bigint) : "0"} ETH
              </span>
           </div>
        </div>
      </div>

      {/* 2. CONTENT GRID */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
         
         {/* Left Column: Info */}
         <div className="lg:col-span-2 space-y-12">
            <section>
               <h3 className="text-xl font-[family-name:var(--font-serif)] text-white mb-4">Asset Details</h3>
               <p className="text-[#8A8F98] leading-relaxed text-lg">
                  This is a verified Real World Asset tokenized on the Ethereum Sepolia network. 
                  Ownership is recorded immutably on the blockchain.
               </p>
               <div className="mt-6 p-4 bg-[#0F1115] border border-white/10 rounded-xl font-mono text-sm text-blue-400 break-all">
                  Contract: {assetAddress}
               </div>
            </section>
         </div>

         {/* Right Column: Trading Ticket */}
         <div className="lg:col-span-1">
            <div className="sticky top-24">
               <OrderTicket />
               
               <div className="mt-6 flex flex-col gap-3">
                  <div className="flex items-center gap-3 text-xs text-[#8A8F98]">
                     <ShieldCheck className="w-4 h-4 text-green-400" />
                     <span>Verified Smart Contract</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#8A8F98]">
                     <Globe className="w-4 h-4 text-blue-400" />
                     <span>On-Chain Settlement</span>
                  </div>
               </div>
            </div>
         </div>

      </div>
    </div>
  );
}