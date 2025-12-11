"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Search, MapPin, ArrowUpRight, Loader2 } from "lucide-react";
import { useReadContract } from 'wagmi';
import { FACTORY_ADDRESS, FACTORY_ABI, ASSET_TOKEN_ABI } from '@/constants/contracts';
import { formatEther } from "viem";

export default function MarketPage() {
  // 1. Get list of all asset addresses from Factory
  const { data: assetAddresses, isLoading } = useReadContract({
    address: FACTORY_ADDRESS,
    abi: FACTORY_ABI,
    functionName: 'getDeployedAssets',
  });

  return (
    <div className="min-h-screen bg-[#08090A] text-[#ECECEC] selection:bg-blue-500/30">
      <Navbar />
      <div className="fixed inset-0 -z-10 opacity-20 pointer-events-none bg-noise" />

      <main className="relative z-10 pt-32 px-4 md:px-8 max-w-[1400px] mx-auto pb-20">
        <div className="flex justify-between items-end mb-8">
            <h1 className="text-4xl font-[family-name:var(--font-serif)] text-white">Marketplace</h1>
            <div className="text-sm text-[#8A8F98]">
                {assetAddresses ? (assetAddresses as any[]).length : 0} Assets Listed
            </div>
        </div>

        {isLoading ? (
           <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-blue-500" /></div>
        ) : (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* Map through addresses and render a smart card for each */}
              {assetAddresses && (assetAddresses as string[]).map((address) => (
                 <AssetCard key={address} address={address as `0x${string}`} />
              ))}
           </div>
        )}
        
        {/* Empty State */}
        {assetAddresses && (assetAddresses as any[]).length === 0 && (
            <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl">
                <p className="text-[#8A8F98]">No assets found. Go to /create to launch one.</p>
            </div>
        )}
      </main>
    </div>
  );
}

// --- SUB-COMPONENT: Smart Card ---
const AssetCard = ({ address }: { address: `0x${string}` }) => {
  // Fetch Name
  const { data: name } = useReadContract({
     address: address, abi: ASSET_TOKEN_ABI, functionName: 'name',
  });

  // Fetch Share Price
  const { data: sharePrice } = useReadContract({
     address: address, abi: ASSET_TOKEN_ABI, functionName: 'sharePrice',
  });
  
  // Fetch Real IPFS Image
  const { data: imageURI } = useReadContract({
     address: address, abi: ASSET_TOKEN_ABI, functionName: 'metadataURI',
  });

  // Fallback image if IPFS is missing (for legacy assets)
  const displayImage = imageURI 
    ? String(imageURI) 
    : "https://images.unsplash.com/photo-1600596542815-27b88e5422d3?q=80&w=2674&auto=format&fit=crop";

  return (
    <div className="group relative bg-[#0F1115] border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition-all hover:-translate-y-1">
       <Link href={`/asset/${address}`} className="block h-full">
         <div className="relative h-64 w-full bg-white/5">
            <Image 
                src={displayImage}
                alt="Asset Cover" 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                unoptimized // <--- FIX FOR PINATA 429 ERROR
            />
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-medium text-white uppercase">
               Verified Asset
            </div>
         </div>
         <div className="p-5">
            <h3 className="text-lg font-medium text-white mb-1 group-hover:text-blue-400 transition-colors truncate">
              {name ? String(name) : "Loading..."}
            </h3>
            <div className="flex items-center gap-1 text-xs text-[#8A8F98] mb-4">
               <MapPin className="w-3 h-3" /> Global Listing
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-white/5">
               <div>
                  <div className="text-[10px] text-[#8A8F98] uppercase">Share Price</div>
                  <div className="text-sm font-medium text-white">
                     {sharePrice ? formatEther(sharePrice as bigint) : "..."} ETH
                  </div>
               </div>
               <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
               </div>
            </div>
         </div>
       </Link>
    </div>
  );
};