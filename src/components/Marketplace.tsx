"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Loader2, TrendingUp } from "lucide-react";
import { useReadContract } from 'wagmi';
import { FACTORY_ADDRESS, FACTORY_ABI, ASSET_TOKEN_ABI } from '@/constants/contracts';
import { formatEther } from "viem";

export const Marketplace = () => {
  // 1. Fetch Real Asset List
  const { data: assetAddresses, isLoading } = useReadContract({
    address: FACTORY_ADDRESS,
    abi: FACTORY_ABI,
    functionName: 'getDeployedAssets',
  });

  // Get only the first 3 assets for the preview
  const trendingAssets = assetAddresses ? (assetAddresses as string[]).slice(0, 3) : [];

  return (
    <section className="py-24 px-4 max-w-7xl mx-auto border-t border-white/5">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <div className="flex items-center gap-2 text-blue-400 font-medium mb-2">
             <TrendingUp className="w-4 h-4" /> Trending Now
          </div>
          <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-serif)] text-white">
            Live on the Market
          </h2>
        </div>
        <Link href="/market" className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-sm font-medium hover:bg-white/10 transition-colors flex items-center gap-2 group">
           View All Assets <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Dynamic Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {isLoading ? (
            // Loading Skeletons
            [1, 2, 3].map((i) => (
                <div key={i} className="aspect-[4/3] rounded-2xl bg-[#0F1115] animate-pulse border border-white/5" />
            ))
         ) : trendingAssets.length > 0 ? (
            // Real Assets
            trendingAssets.map((address) => (
                <TrendingCard key={address} address={address as `0x${string}`} />
            ))
         ) : (
            // Empty State
            <div className="col-span-3 text-center py-12 text-[#8A8F98] border border-dashed border-white/10 rounded-2xl">
                No assets listed yet. Be the first to launch one!
            </div>
         )}
      </div>
    </section>
  );
};

// --- Sub-Component for Individual Cards ---
const TrendingCard = ({ address }: { address: `0x${string}` }) => {
    // Fetch details for this specific card
    const { data: name } = useReadContract({ address, abi: ASSET_TOKEN_ABI, functionName: 'name' });
    const { data: price } = useReadContract({ address, abi: ASSET_TOKEN_ABI, functionName: 'spotPrice' });
    const { data: imageURI } = useReadContract({ address, abi: ASSET_TOKEN_ABI, functionName: 'metadataURI' });

    const displayImage = imageURI ? String(imageURI) : "https://images.unsplash.com/photo-1600596542815-27b88e5422d3";

    return (
        <Link href={`/asset/${address}`} className="group relative aspect-[4/3] rounded-2xl bg-[#0F1115] border border-white/10 overflow-hidden hover:border-white/20 transition-all hover:shadow-2xl">
            <Image 
                src={displayImage}
                alt="Asset"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                unoptimized
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#08090A] via-transparent to-transparent opacity-90" />
            
            <div className="absolute bottom-0 left-0 p-6 w-full">
                <h3 className="text-xl font-medium text-white mb-1">{name ? String(name) : "Loading..."}</h3>
                <div className="flex justify-between items-center">
                    <div className="text-sm text-[#8A8F98] font-mono">
                        {price ? formatEther(price as bigint) : "..."} ETH
                    </div>
                    <span className="text-xs font-bold bg-white text-black px-2 py-1 rounded">
                        BUY
                    </span>
                </div>
            </div>
        </Link>
    )
}