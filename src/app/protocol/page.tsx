"use client";
import React from "react";
import { Navbar } from "@/components/Navbar";
import { Shield, Code, FileKey, Network, Lock, Terminal } from "lucide-react";

export default function ProtocolPage() {
  return (
    <div className="min-h-screen bg-[#08090A] text-[#ECECEC] selection:bg-blue-500/30">
      <Navbar />
      
      {/* Background Grid */}
      <div 
        className="fixed inset-0 z-0 opacity-20 pointer-events-none"
        style={{
             backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`,
             backgroundSize: '40px 40px',
             maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
        }}
      />

      <main className="relative z-10 pt-32 px-4 md:px-8 max-w-5xl mx-auto pb-20">
        
        {/* 1. Header */}
        <div className="mb-20">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 text-[11px] font-medium text-blue-400 mb-6">
              <Code className="w-3 h-3" />
              <span>Technical Documentation</span>
           </div>
           <h1 className="text-5xl md:text-7xl font-[family-name:var(--font-serif)] text-white mb-6">
              Trust through Code.
           </h1>
           <p className="text-xl text-[#8A8F98] max-w-2xl leading-relaxed">
              AssetFlow removes the middleman by replacing legal intermediaries with self-executing smart contracts.
           </p>
        </div>

        {/* 2. Architecture Diagram (CSS Only) */}
        <div className="mb-24">
           <h3 className="text-sm font-mono text-[#8A8F98] uppercase tracking-wider mb-8">System Architecture</h3>
           
           <div className="p-8 md:p-12 rounded-3xl bg-[#0F1115]/50 border border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-blue-500/5 blur-[100px]" />
              
              {/* The Flow Chart */}
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
                 
                 {/* Node 1: Real World */}
                 <div className="flex flex-col items-center gap-4">
                    <div className="w-24 h-24 rounded-2xl bg-[#15171B] border border-white/10 flex items-center justify-center shadow-2xl">
                       <FileKey className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-center">
                       <div className="text-sm font-bold text-white">SPV Wrapper</div>
                       <div className="text-xs text-[#8A8F98]">Delaware C-Corp</div>
                    </div>
                 </div>

                 {/* Arrow */}
                 <div className="h-16 w-0.5 md:h-0.5 md:w-24 bg-gradient-to-b md:bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />

                 {/* Node 2: Oracle */}
                 <div className="flex flex-col items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-[#15171B] border border-blue-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                       <Network className="w-8 h-8 text-blue-400" />
                    </div>
                    <div className="text-center">
                       <div className="text-sm font-bold text-white">Chainlink Oracle</div>
                       <div className="text-xs text-[#8A8F98]">Data Verification</div>
                    </div>
                 </div>

                 {/* Arrow */}
                 <div className="h-16 w-0.5 md:h-0.5 md:w-24 bg-gradient-to-b md:bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />

                 {/* Node 3: Protocol */}
                 <div className="flex flex-col items-center gap-4">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 border border-white/20 flex items-center justify-center shadow-2xl">
                       <Lock className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-center">
                       <div className="text-sm font-bold text-white">AssetFlow Vault</div>
                       <div className="text-xs text-[#8A8F98]">ERC-4626 Standard</div>
                    </div>
                 </div>

              </div>
           </div>
        </div>

        {/* 3. Smart Contracts Terminal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
           <div>
              <h3 className="text-sm font-mono text-[#8A8F98] uppercase tracking-wider mb-6">Deployed Contracts (Sepolia)</h3>
              <div className="rounded-xl bg-[#0F1115] border border-white/10 overflow-hidden font-mono text-sm">
                 <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                    <div className="ml-2 text-xs text-[#8A8F98]">bash — 80x24</div>
                 </div>
                 <div className="p-6 space-y-4 text-[#8A8F98]">
                    <div>
                       <span className="text-blue-400">$</span> address --contract <span className="text-white">AssetFactory</span>
                       <div className="mt-1 text-green-400/80">0x83A2...91B2</div>
                    </div>
                    <div>
                       <span className="text-blue-400">$</span> address --contract <span className="text-white">YieldController</span>
                       <div className="mt-1 text-green-400/80">0x19B2...88A1</div>
                    </div>
                    <div>
                       <span className="text-blue-400">$</span> address --contract <span className="text-white">USDC_Vault</span>
                       <div className="mt-1 text-green-400/80">0x77C1...00A2</div>
                    </div>
                 </div>
              </div>
           </div>

           <div>
              <h3 className="text-sm font-mono text-[#8A8F98] uppercase tracking-wider mb-6">Security Audits</h3>
              <div className="space-y-4">
                 {[
                    { firm: "Trail of Bits", date: "Oct 2024", status: "Passed", score: "100%" },
                    { firm: "OpenZeppelin", date: "Sept 2024", status: "Passed", score: "98%" },
                    { firm: "Certik", date: "Aug 2024", status: "Passed", score: "99%" },
                 ].map((audit, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-[#0F1115] hover:border-blue-500/30 transition-colors cursor-pointer group">
                       <div className="flex items-center gap-4">
                          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                             <Shield className="w-5 h-5" />
                          </div>
                          <div>
                             <div className="text-sm font-medium text-white">{audit.firm}</div>
                             <div className="text-xs text-[#8A8F98]">{audit.date}</div>
                          </div>
                       </div>
                       <div className="flex items-center gap-4">
                          <div className="px-2 py-1 rounded bg-green-500/10 text-green-400 text-xs font-medium border border-green-500/20">
                             {audit.status}
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>

      </main>
    </div>
  );
}