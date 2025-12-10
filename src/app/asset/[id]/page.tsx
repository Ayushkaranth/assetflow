"use client";
import React from "react";
import Image from "next/image";
import { ArrowLeft, MapPin, FileText, Globe, ShieldCheck, Info } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar"; // Reusing landing navbar for now

export default function AssetPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-[#08090A] text-[#ECECEC] selection:bg-blue-500/30">
      <Navbar />
      
      {/* 1. Global Texture */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none bg-noise" />

      {/* 2. THE HERO HEADER (Cinematic) */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <Image 
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop"
          alt="Penthouse"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090A] via-[#08090A]/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 max-w-7xl mx-auto">
           <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
           </Link>
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                 <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-medium border border-blue-500/20">
                       Core Real Estate
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/5 text-[#8A8F98] text-xs font-medium border border-white/5 flex items-center gap-1">
                       <MapPin className="w-3 h-3" /> New York, NY
                    </span>
                 </div>
                 <h1 className="text-5xl md:text-6xl font-[family-name:var(--font-serif)] text-white mb-2">
                    432 Park Ave Penthouse
                 </h1>
                 <p className="text-[#8A8F98] max-w-xl text-lg">
                    Fractionalized ownership of the highest residential outdoor space in the Western Hemisphere.
                 </p>
              </div>
              
              {/* Key Stats Row */}
              <div className="flex gap-8 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                 <div>
                    <div className="text-xs text-[#8A8F98] uppercase tracking-wider mb-1">Net APY</div>
                    <div className="text-2xl font-medium text-green-400">12.4%</div>
                 </div>
                 <div className="w-px bg-white/10" />
                 <div>
                    <div className="text-xs text-[#8A8F98] uppercase tracking-wider mb-1">Token Price</div>
                    <div className="text-2xl font-medium text-white">$50.00</div>
                 </div>
                 <div className="w-px bg-white/10" />
                 <div>
                    <div className="text-xs text-[#8A8F98] uppercase tracking-wider mb-1">Valuation</div>
                    <div className="text-2xl font-medium text-white">$42.5M</div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* 3. MAIN CONTENT GRID */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
         
         {/* LEFT COLUMN: Deep Dive Data */}
         <div className="lg:col-span-2 space-y-12">
            
            {/* Description */}
            <section>
               <h3 className="text-xl font-[family-name:var(--font-serif)] text-white mb-4">Investment Thesis</h3>
               <div className="prose prose-invert prose-lg text-[#8A8F98] leading-relaxed">
                  <p>
                     The 432 Park Avenue Penthouse represents a trophy asset in the Manhattan skyline. 
                     By tokenizing this asset, we unlock liquidity for a property type that typically requires 
                     a $40M+ entry ticket.
                  </p>
                  <p>
                     Investors receive monthly yield distributions derived from short-term luxury rentals 
                     and event hosting. The property is managed by a top-tier operator, ensuring consistent occupancy.
                  </p>
               </div>
            </section>

            {/* Financials Table */}
            <section>
               <h3 className="text-xl font-[family-name:var(--font-serif)] text-white mb-4">Financial Breakdown</h3>
               <div className="rounded-xl border border-white/10 bg-[#0F1115]/40 overflow-hidden">
                  {[
                     { label: "Gross Rent Multiplier", val: "14.2x" },
                     { label: "Occupancy Rate (TTM)", val: "94%" },
                     { label: "Management Fee", val: "1.5%" },
                     { label: "Projected IRR", val: "15-18%" },
                  ].map((row, i) => (
                     <div key={i} className="flex justify-between p-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                        <span className="text-sm text-[#8A8F98]">{row.label}</span>
                        <span className="text-sm font-medium text-white font-mono">{row.val}</span>
                     </div>
                  ))}
               </div>
            </section>

            {/* Document Vault */}
            <section>
               <h3 className="text-xl font-[family-name:var(--font-serif)] text-white mb-4">Legal & Due Diligence</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                     { name: "Property Appraisal.pdf", size: "2.4 MB" },
                     { name: "SPV Operating Agreement.pdf", size: "1.1 MB" },
                     { name: "Title Deed - 432 Park.pdf", size: "840 KB" },
                     { name: "Smart Contract Audit.pdf", size: "3.2 MB" },
                  ].map((doc, i) => (
                     <div key={i} className="group p-4 rounded-xl border border-white/10 bg-[#0F1115] hover:border-blue-500/30 transition-all cursor-pointer flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                           <FileText className="w-5 h-5" />
                        </div>
                        <div>
                           <div className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">{doc.name}</div>
                           <div className="text-xs text-[#8A8F98]">{doc.size}</div>
                        </div>
                     </div>
                  ))}
               </div>
            </section>

         </div>

         {/* RIGHT COLUMN: The Sticky Trading Terminal */}
         <div className="lg:col-span-1">
            <div className="sticky top-24">
               {/* Order Ticket Component */}
               <OrderTicket />
               
               {/* Trust Badges */}
               <div className="mt-6 flex flex-col gap-3">
                  <div className="flex items-center gap-3 text-xs text-[#8A8F98]">
                     <ShieldCheck className="w-4 h-4 text-green-400" />
                     <span>Audited by Trail of Bits</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#8A8F98]">
                     <Globe className="w-4 h-4 text-blue-400" />
                     <span>Reg D Compliant Offering</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#8A8F98]">
                     <Info className="w-4 h-4 text-yellow-400" />
                     <span>24h Lock-up period applies</span>
                  </div>
               </div>
            </div>
         </div>

      </div>
    </div>
  );
}

// --- SUB COMPONENT: The Trading Widget ---
const OrderTicket = () => {
   return (
      <div className="p-6 rounded-2xl bg-[#15171B] border border-white/10 shadow-2xl">
         <div className="flex justify-between items-center mb-6">
            <h3 className="font-medium text-white">Buy Fractions</h3>
            <span className="text-xs text-[#8A8F98] bg-white/5 px-2 py-1 rounded">
               Balance: $14,200
            </span>
         </div>

         {/* Input Area */}
         <div className="space-y-4 mb-6">
            <div className="p-4 rounded-xl bg-black/40 border border-white/5 hover:border-white/10 transition-colors group">
               <div className="flex justify-between mb-1">
                  <span className="text-xs text-[#8A8F98]">You Pay</span>
                  <span className="text-xs text-blue-400 cursor-pointer">Max</span>
               </div>
               <div className="flex justify-between items-center">
                  <input 
                     type="text" 
                     placeholder="0.00" 
                     className="bg-transparent text-2xl font-medium text-white focus:outline-none w-1/2 placeholder-white/20"
                  />
                  <div className="flex items-center gap-2 bg-white/5 px-2 py-1 rounded-full border border-white/5">
                     <div className="w-5 h-5 rounded-full bg-blue-500"></div>
                     <span className="text-sm font-medium">USDC</span>
                  </div>
               </div>
            </div>

            <div className="flex justify-center -my-2 relative z-10">
               <div className="bg-[#15171B] border border-white/10 p-1.5 rounded-full text-[#8A8F98]">
                  <ArrowLeft className="w-4 h-4 rotate-90" />
               </div>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/5">
               <div className="flex justify-between mb-1">
                  <span className="text-xs text-[#8A8F98]">You Receive</span>
               </div>
               <div className="flex justify-between items-center">
                  <span className="text-2xl font-medium text-white/50">0.00</span>
                  <div className="flex items-center gap-2 px-2 py-1">
                     <div className="w-5 h-5 rounded-md bg-white"></div>
                     <span className="text-sm font-medium">PROP</span>
                  </div>
               </div>
            </div>
         </div>

         {/* Summary */}
         <div className="space-y-2 mb-6">
            <div className="flex justify-between text-xs">
               <span className="text-[#8A8F98]">Exchange Rate</span>
               <span className="text-white">1 PROP = $50.00 USDC</span>
            </div>
            <div className="flex justify-between text-xs">
               <span className="text-[#8A8F98]">Network Fee</span>
               <span className="text-white">~$2.40</span>
            </div>
         </div>

         <button className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors">
            Confirm Transaction
         </button>
      </div>
   )
}