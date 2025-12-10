"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp, Wallet, Activity } from "lucide-react";

export const PortfolioHeader = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      
      {/* CARD 1: NET WORTH (The Big One) */}
      <div className="relative group p-6 rounded-2xl bg-[#0F1115]/60 border border-white/5 backdrop-blur-xl overflow-hidden md:col-span-1">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col justify-between h-full gap-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-md bg-white/5 border border-white/10">
                <Wallet className="w-4 h-4 text-[#8A8F98]" />
              </div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#8A8F98]">Total Equity</span>
            </div>
            <div className="px-2 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-[10px] font-medium text-green-400 flex items-center gap-1">
              +12.4% <ArrowUpRight className="w-3 h-3" />
            </div>
          </div>

          <div>
            <div className="text-4xl md:text-5xl font-[family-name:var(--font-serif)] text-white tracking-tight mb-1">
              $24,592<span className="text-white/40">.00</span>
            </div>
            <div className="text-xs text-[#8A8F98] font-mono">
              ≈ 12.4 ETH
            </div>
          </div>
        </div>

        {/* Decorative Chart Line in Background */}
        <div className="absolute bottom-0 left-0 right-0 h-16 opacity-20 group-hover:opacity-30 transition-opacity">
           <svg viewBox="0 0 100 20" className="w-full h-full" preserveAspectRatio="none">
             <path d="M0 20 L0 15 L20 12 L40 16 L60 8 L80 12 L100 2 V 20 Z" fill="url(#blueGradient)" />
             <path d="M0 15 L20 12 L40 16 L60 8 L80 12 L100 2" stroke="#3B82F6" strokeWidth="0.5" fill="none" />
             <defs>
               <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                 <stop offset="0%" stopColor="#3B82F6" />
                 <stop offset="100%" stopColor="transparent" />
               </linearGradient>
             </defs>
           </svg>
        </div>
      </div>

      {/* CARD 2: LIVE YIELD (The Activity Monitor) */}
      <div className="relative p-6 rounded-2xl bg-[#0F1115]/60 border border-white/5 backdrop-blur-xl flex flex-col justify-between">
         <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-md bg-white/5 border border-white/10">
                <Activity className="w-4 h-4 text-[#8A8F98]" />
              </div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#8A8F98]">Active Yield</span>
            </div>
            {/* Pulsing Beacon */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
         </div>

         <div className="space-y-4">
            <div>
               <div className="text-2xl font-medium text-white font-[family-name:var(--font-serif)]">$142.50</div>
               <div className="text-[10px] text-[#8A8F98] uppercase font-mono mt-1">Earned this month</div>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: "65%" }}
                 className="h-full bg-gradient-to-r from-green-500 to-teal-500"
               />
            </div>
            <div className="text-[10px] text-[#8A8F98] flex justify-between">
               <span>Next payout</span>
               <span className="text-white font-mono">2d 14h</span>
            </div>
         </div>
      </div>

      {/* CARD 3: QUICK ACTIONS (The Control Pad) */}
      <div className="p-1 rounded-2xl bg-[#0F1115]/60 border border-white/5 backdrop-blur-xl flex flex-col gap-1">
         <button className="flex-1 rounded-xl bg-[#1A1D21] hover:bg-[#202328] border border-white/5 transition-colors flex flex-col items-center justify-center gap-2 group">
            <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
               <ArrowUpRight className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-medium text-[#8A8F98] group-hover:text-white">Deposit USDC</span>
         </button>
         <button className="flex-1 rounded-xl hover:bg-[#1A1D21] border border-transparent hover:border-white/5 transition-colors flex flex-col items-center justify-center gap-2 group">
            <span className="text-xs font-medium text-[#8A8F98] group-hover:text-white">Withdraw Funds</span>
         </button>
      </div>

    </div>
  );
};