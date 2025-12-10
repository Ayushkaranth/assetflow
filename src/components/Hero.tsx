"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight, ArrowUpRight, LineChart, Wallet } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-4 perspective-2000 overflow-hidden">
      
      {/* 1. Background Atmosphere */}
      <div className="absolute inset-0 bg-[#08090A]">
        <div className="absolute top-[-20%] left-[50%] -translate-x-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
             backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`,
             backgroundSize: '40px 40px',
             maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
          }}
        />
      </div>

      {/* 2. Text Content (Top Half) */}
      <div className="relative z-10 text-center space-y-6 mb-16 mt-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[11px] font-medium text-blue-200 backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Protocol V2 Live
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-8xl font-[family-name:var(--font-serif)] tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40"
        >
          Tangible <br /> Wealth.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-[17px] text-[#8A8F98] max-w-[480px] mx-auto leading-relaxed"
        >
          The operating system for real-world assets.
          Fractionalize, Trade, and Borrow against reality.
        </motion.p>
      </div>

      {/* 3. THE FLIPPABLE ASSET SLAB (Wide & Rectangular) */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="relative z-20 w-full max-w-4xl h-[300px] group perspective-2000"
      >
        {/* The Flipper Container */}
        <div className="relative w-full h-full transition-transform duration-700 transform-style-3d group-hover:rotate-y-180">
          
          {/* --- FRONT SIDE (Cinematic) --- */}
          <div className="absolute inset-0 w-full h-full rounded-3xl border border-white/10 overflow-hidden backface-hidden shadow-2xl shadow-blue-900/20 bg-[#0F1115]">
            <Image 
               src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop"
               alt="Penthouse"
               fill
               className="object-cover opacity-80 scale-105 group-hover:scale-100 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F1115] via-[#0F1115]/60 to-transparent" />
            
            {/* Front Content */}
            <div className="absolute inset-0 p-10 flex flex-col justify-between z-10">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/5 text-xs font-medium text-white mb-4">
                  Real Estate · Core Fund
                </div>
                <h3 className="text-4xl font-[family-name:var(--font-serif)] text-white mb-2">
                  432 Park Ave Penthouse
                </h3>
                <p className="text-[#8A8F98] max-w-md">
                  Own a fraction of the tallest residential tower in the Western Hemisphere. 
                  Instant liquidity via our AMM.
                </p>
              </div>

              <div className="flex items-end justify-between border-t border-white/10 pt-6">
                <div className="flex gap-12">
                   <div>
                     <div className="text-xs text-[#8A8F98] uppercase font-mono tracking-wider mb-1">Token Price</div>
                     <div className="text-2xl font-medium text-white">$50.00</div>
                   </div>
                   <div>
                     <div className="text-xs text-[#8A8F98] uppercase font-mono tracking-wider mb-1">Net APY</div>
                     <div className="text-2xl font-medium text-green-400 flex items-center gap-1">
                       12.4% <ArrowUpRight className="w-4 h-4" />
                     </div>
                   </div>
                </div>
                {/* A visual cue to flip */}
                <div className="flex items-center gap-2 text-sm text-white/60 bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm">
                   <ChevronRight className="w-4 h-4" />
                   Hover to view Terminal
                </div>
              </div>
            </div>
          </div>

          {/* --- BACK SIDE (Terminal View) --- */}
          <div className="absolute inset-0 w-full h-full rounded-3xl border border-white/10 overflow-hidden backface-hidden rotate-y-180 shadow-2xl shadow-blue-900/20 bg-[#0F1115] p-8 flex gap-8">
             
             {/* Left: Chart Area */}
             <div className="flex-1 bg-[#15171B] rounded-2xl border border-white/5 p-6 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-500/5 blur-[60px] pointer-events-none" />
                <div className="flex justify-between items-center mb-4">
                   <div className="text-sm font-medium text-white flex items-center gap-2">
                     <LineChart className="w-4 h-4 text-blue-400" />
                     Price History (24h)
                   </div>
                   <div className="text-xs text-[#8A8F98] font-mono">+2.1% today</div>
                </div>
                
                {/* Fake Chart Visualization (SVG) */}
                <div className="flex-1 relative">
                   <svg viewBox="0 0 400 100" className="w-full h-full overflow-visible">
                     <defs>
                       <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                         <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2"/>
                         <stop offset="100%" stopColor="transparent" stopOpacity="0"/>
                       </linearGradient>
                     </defs>
                     <path 
                       d="M0 80 C50 80, 100 40, 150 50 C200 60, 250 20, 300 30 S350 0, 400 10 V 100 H 0 Z"
                       fill="url(#chartGradient)"
                     />
                     <path 
                       d="M0 80 C50 80, 100 40, 150 50 C200 60, 250 20, 300 30 S350 0, 400 10"
                       fill="none"
                       stroke="#3B82F6"
                       strokeWidth="2"
                     />
                   </svg>
                </div>
             </div>

             {/* Right: Action Area */}
             <div className="w-72 flex flex-col justify-between">
                <div className="space-y-4">
                   <div className="p-4 rounded-xl bg-[#15171B] border border-white/5">
                      <div className="text-xs text-[#8A8F98] mb-1">Available Liquidity</div>
                      <div className="text-lg font-medium text-white flex items-center gap-2">
                        <Wallet className="w-4 h-4 text-[#8A8F98]" />
                        $14.2M USDC
                      </div>
                   </div>
                   <div className="p-4 rounded-xl bg-[#15171B] border border-white/5">
                      <div className="text-xs text-[#8A8F98] mb-1">Your Balance</div>
                      <div className="text-lg font-medium text-white">0.00 PARK</div>
                   </div>
                </div>

                <button className="w-full py-4 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                  Connect Wallet to Trade
                  <ArrowUpRight className="w-4 h-4" />
                </button>
             </div>

          </div>
        </div>
      </motion.div>
      
      {/* Glow under the slab */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[500px] h-[100px] bg-blue-500/20 blur-[120px] pointer-events-none" />

    </section>
  );
};