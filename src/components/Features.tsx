"use client";
import React from "react";
import { ShieldCheck, Zap, Globe, Lock, BarChart3, Users } from "lucide-react";

export const Features = () => {
  return (
    <section className="py-24 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-serif)] text-white mb-4">
          Built for the future of finance.
        </h2>
        <p className="text-[#8A8F98] max-w-2xl mx-auto">
           A full-stack protocol combining the security of Ethereum with the speed of Next.js.
        </p>
      </div>

      {/* THE BENTO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-4 h-auto md:h-[600px]">
         
         {/* Item 1: Large Left */}
         <div className="md:col-span-2 md:row-span-2 rounded-3xl bg-[#0F1115] border border-white/10 p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 blur-[80px] group-hover:bg-blue-500/30 transition-colors" />
            <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                   <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6">
                      <BarChart3 className="w-6 h-6 text-blue-400" />
                   </div>
                   <h3 className="text-2xl font-bold text-white mb-2">Algorithmic Bonding Curves</h3>
                   <p className="text-[#8A8F98] max-w-md">
                      Unlike traditional real estate, AssetFlow provides <strong>instant liquidity</strong>. 
                      Our smart contracts use a linear bonding curve to guarantee a buyer or seller is always available, 24/7.
                   </p>
                </div>
                {/* Fake Graph UI */}
                <div className="mt-8 h-32 w-full border-t border-r border-white/10 bg-white/5 rounded-tl-xl relative">
                    <svg className="absolute bottom-0 left-0 w-full h-full" preserveAspectRatio="none">
                       <path d="M0,128 C100,100 200,80 300,40 L400,0" stroke="#60A5FA" strokeWidth="2" fill="none" />
                    </svg>
                </div>
            </div>
         </div>

         {/* Item 2: Top Right */}
         <div className="md:col-span-1 md:row-span-1 rounded-3xl bg-[#0F1115] border border-white/10 p-8 relative overflow-hidden group hover:border-white/20 transition-colors">
            <ShieldCheck className="w-8 h-8 text-green-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Verifiable Ownership</h3>
            <p className="text-sm text-[#8A8F98]">
               Every share is an ERC-20 token minted on Sepolia. You own the keys, you own the asset.
            </p>
         </div>

         {/* Item 3: Bottom Right */}
         <div className="md:col-span-1 md:row-span-1 rounded-3xl bg-[#0F1115] border border-white/10 p-8 relative overflow-hidden group hover:border-white/20 transition-colors">
            <Zap className="w-8 h-8 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Real Yield</h3>
            <p className="text-sm text-[#8A8F98]">
               Rent payments are deposited in ETH and distributed pro-rata to all token holders instantly.
            </p>
         </div>

      </div>
      
      {/* Tech Stack Strip */}
      <div className="mt-20 pt-10 border-t border-white/5 flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
         <span className="text-lg font-bold text-white">Next.js 15</span>
         <span className="text-lg font-bold text-white">Tailwind</span>
         <span className="text-lg font-bold text-white">Solidity</span>
         <span className="text-lg font-bold text-white">Wagmi</span>
         <span className="text-lg font-bold text-white">IPFS</span>
         <span className="text-lg font-bold text-white">Hardhat</span>
      </div>
    </section>
  );
};