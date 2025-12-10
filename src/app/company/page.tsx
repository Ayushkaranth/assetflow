"use client";
import React from "react";
import { Navbar } from "@/components/Navbar";
import { Building2, Users, Globe, ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function CompanyPage() {
  return (
    <div className="min-h-screen bg-[#08090A] text-[#ECECEC] selection:bg-purple-500/30">
      <Navbar />
      
      {/* Texture */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none bg-noise" />
      
      <main className="relative z-10 pt-32 px-4 md:px-8 max-w-5xl mx-auto pb-20">

        {/* 1. Hero */}
        <div className="text-center mb-24">
           <h1 className="text-5xl md:text-7xl font-[family-name:var(--font-serif)] text-white mb-6">
              The Operating System <br /> for Value.
           </h1>
           <p className="text-xl text-[#8A8F98] max-w-2xl mx-auto leading-relaxed">
              We are building the infrastructure to make the world's wealth accessible, liquid, and programmable.
           </p>
        </div>

        {/* 2. Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
           {[
              { label: "Assets Tokenized", val: "$42M+" },
              { label: "Active Investors", val: "14,200" },
              { label: "Countries", val: "84" },
              { label: "Team Members", val: "12" },
           ].map((stat, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#0F1115]/50 border border-white/5 text-center">
                 <div className="text-3xl font-[family-name:var(--font-serif)] text-white mb-1">{stat.val}</div>
                 <div className="text-xs text-[#8A8F98] uppercase tracking-wider">{stat.label}</div>
              </div>
           ))}
        </div>

        {/* 3. The Manifesto (Values) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
           <div className="space-y-4">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4">
                 <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-medium text-white">Access for All</h3>
              <p className="text-[#8A8F98] leading-relaxed">
                 Wealth has been gated by accredited investor laws for too long. We use code to lower the barrier to entry to just $50.
              </p>
           </div>
           <div className="space-y-4">
              <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4">
                 <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-medium text-white">Global Liquidity</h3>
              <p className="text-[#8A8F98] leading-relaxed">
                 Real estate is illiquid. Tokens are instant. We are merging the stability of bricks with the speed of bytes.
              </p>
           </div>
           <div className="space-y-4">
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-400 mb-4">
                 <Users className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-medium text-white">radical Transparency</h3>
              <p className="text-[#8A8F98] leading-relaxed">
                 No hidden fees. No backroom deals. Every transaction is verifiable on the Ethereum blockchain forever.
              </p>
           </div>
        </div>

        {/* 4. Team Section */}
        <div className="border-t border-white/5 pt-20">
           <div className="flex justify-between items-end mb-12">
              <h2 className="text-3xl font-[family-name:var(--font-serif)] text-white">Builders</h2>
              <a href="#" className="text-sm text-[#8A8F98] hover:text-white flex items-center gap-1">
                 Join us <ArrowUpRight className="w-3 h-3" />
              </a>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                 { name: "Alex V.", role: "Founder & CEO", prev: "Ex-BlackRock" },
                 { name: "Sarah J.", role: "Head of Protocol", prev: "Ex-Consensys" },
                 { name: "David L.", role: "Lead Engineer", prev: "Ex-Stripe" },
              ].map((member, i) => (
                 <div key={i} className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 border border-white/10" />
                    <div>
                       <div className="font-medium text-white group-hover:text-blue-400 transition-colors">{member.name}</div>
                       <div className="text-xs text-[#8A8F98]">{member.role}</div>
                       <div className="text-[10px] text-white/40 mt-1">{member.prev}</div>
                    </div>
                 </div>
              ))}
           </div>
        </div>

      </main>
    </div>
  );
}