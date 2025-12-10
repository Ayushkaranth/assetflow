"use client";
import React from "react";
import { ShieldCheck, Zap, Globe } from "lucide-react";

export const Features = () => {
  return (
    <section className="py-32 px-4 max-w-7xl mx-auto">
      <div className="mb-16">
        <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-serif)] text-white mb-4">
          The Operating System <br /> for Reality.
        </h2>
        <p className="text-[#8A8F98] max-w-xl">
          We replaced lawyers, brokers, and banks with smart contracts. 
          The result is a platform that is 10x faster and 100x cheaper.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Security (Large Vertical) */}
        <div className="md:col-span-1 md:row-span-2 p-8 rounded-3xl bg-[#15171B] border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-32 bg-blue-500/10 blur-[80px] rounded-full group-hover:bg-blue-500/20 transition-colors" />
          <ShieldCheck className="w-10 h-10 text-white mb-6 relative z-10" />
          <h3 className="text-2xl font-medium text-white mb-4 relative z-10">Bank-Grade Security</h3>
          <p className="text-[#8A8F98] relative z-10 leading-relaxed">
            Assets are held in a bankruptcy-remote SPV. Ownership is recorded on Ethereum. 
            Audited by Trail of Bits.
          </p>
          {/* Decorative Code Snippet */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-black/20 font-mono text-[10px] text-blue-200/50 opacity-50">
             0x12...a93 verified
          </div>
        </div>

        {/* Card 2: Liquidity (Wide Horizontal) */}
        <div className="md:col-span-2 p-8 rounded-3xl bg-[#15171B] border border-white/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          <div className="flex items-start justify-between">
            <div>
              <Zap className="w-10 h-10 text-yellow-400 mb-6" />
              <h3 className="text-2xl font-medium text-white mb-2">Instant Liquidity</h3>
              <p className="text-[#8A8F98] max-w-sm">
                Don't wait months to sell your house. Swap your real estate tokens for USDC instantly on our AMM.
              </p>
            </div>
            {/* Visual Graph Placeholder */}
            <div className="hidden md:flex gap-1 items-end h-32 opacity-50">
              <div className="w-4 bg-green-500/20 h-12 rounded-t" />
              <div className="w-4 bg-green-500/40 h-16 rounded-t" />
              <div className="w-4 bg-green-500/60 h-24 rounded-t" />
              <div className="w-4 bg-green-500 h-20 rounded-t" />
            </div>
          </div>
        </div>

        {/* Card 3: Global Access */}
        <div className="md:col-span-2 p-8 rounded-3xl bg-[#15171B] border border-white/5 flex items-center gap-8 relative overflow-hidden">
           <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-purple-500/10 blur-[60px] rounded-full" />
           <div className="flex-1">
             <Globe className="w-10 h-10 text-purple-400 mb-6" />
             <h3 className="text-2xl font-medium text-white mb-2">Global Access</h3>
             <p className="text-[#8A8F98]">
               Invest from anywhere. No accredited investor status required for Tier 1 assets.
             </p>
           </div>
        </div>

      </div>
    </section>
  );
};