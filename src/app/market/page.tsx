"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Search, SlidersHorizontal, MapPin, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- Mock Data ---
const allAssets = [
  { id: "penthouse", name: "Penthouse 432", category: "Real Estate", price: "$50", apy: "12.4%", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop", location: "New York" },
  { id: "rolex", name: "Rolex Daytona", category: "Luxury", price: "$120", apy: "8.1%", image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=2080&auto=format&fit=crop", location: "London Vault" },
  { id: "banksy", name: "Girl w/ Balloon", category: "Art", price: "$30", apy: "15.2%", image: "https://images.unsplash.com/photo-1579783902614-a3fb39279623?q=80&w=1974&auto=format&fit=crop", location: "Zurich" },
  { id: "solar", name: "Solar Farm TX", category: "Infrastructure", price: "$10", apy: "11.0%", image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop", location: "Texas" },
  { id: "wine", name: "Chateau Margaux '09", category: "Luxury", price: "$85", apy: "9.4%", image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2070&auto=format&fit=crop", location: "Bordeaux" },
  { id: "ferrari", name: "Ferrari F40", category: "Luxury", price: "$200", apy: "14.5%", image: "https://images.unsplash.com/photo-1583121274602-3e2820c698d2?q=80&w=2076&auto=format&fit=crop", location: "Miami" },
];

const categories = ["All", "Real Estate", "Art", "Luxury", "Infrastructure"];

export default function MarketPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  // Filter Logic
  const filteredAssets = activeCategory === "All" 
    ? allAssets 
    : allAssets.filter(a => a.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#08090A] text-[#ECECEC] selection:bg-blue-500/30">
      <Navbar />
      
      {/* Global Background */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none bg-noise" />
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-blue-900/5 to-transparent pointer-events-none" />

      <main className="relative z-10 pt-32 px-4 md:px-8 max-w-[1400px] mx-auto pb-20">
        
        {/* 1. Header & Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
           <div>
              <h1 className="text-4xl font-[family-name:var(--font-serif)] text-white mb-2">Marketplace</h1>
              <p className="text-[#8A8F98]">Explore {allAssets.length} verified assets available for fractional investment.</p>
           </div>
           
           <div className="flex gap-3">
              <div className="relative group">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8F98]" />
                 <input 
                   type="text" 
                   placeholder="Search assets..." 
                   className="bg-[#0F1115] border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-white/20 w-64"
                 />
              </div>
              <button className="p-2.5 rounded-full bg-[#0F1115] border border-white/10 text-white hover:bg-white/5 transition-colors">
                 <SlidersHorizontal className="w-4 h-4" />
              </button>
           </div>
        </div>

        {/* 2. Category Tabs */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar">
           {categories.map((cat) => (
             <button
               key={cat}
               onClick={() => setActiveCategory(cat)}
               className={`
                 px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap
                 ${activeCategory === cat 
                   ? "bg-white text-black" 
                   : "bg-[#0F1115] border border-white/10 text-[#8A8F98] hover:text-white hover:border-white/20"}
               `}
             >
               {cat}
             </button>
           ))}
        </div>

        {/* 3. The Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
           <AnimatePresence>
             {filteredAssets.map((asset) => (
               <AssetCard key={asset.id} asset={asset} />
             ))}
           </AnimatePresence>
        </motion.div>

      </main>
    </div>
  );
}

// --- Sub-Component: The Market Asset Card ---
const AssetCard = ({ asset }: { asset: any }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className="group relative bg-[#0F1115] border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition-all hover:-translate-y-1"
    >
       <Link href={`/asset/${asset.id}`} className="block h-full">
         
         {/* Image Area */}
         <div className="relative h-64 w-full overflow-hidden">
            <Image 
              src={asset.image} 
              alt={asset.name} 
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F1115] via-transparent to-transparent opacity-80" />
            
            {/* Floating Badge */}
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-medium text-white uppercase tracking-wide">
               {asset.category}
            </div>
         </div>

         {/* Content Area */}
         <div className="p-5 relative">
            {/* Yield Badge (Overlapping image) */}
            <div className="absolute -top-4 right-4 px-3 py-1 rounded-full bg-green-500 text-black text-xs font-bold shadow-lg shadow-green-900/20">
               {asset.apy} APY
            </div>

            <div className="mb-4">
               <h3 className="text-lg font-medium text-white mb-1 group-hover:text-blue-400 transition-colors">
                 {asset.name}
               </h3>
               <div className="flex items-center gap-1 text-xs text-[#8A8F98]">
                  <MapPin className="w-3 h-3" />
                  {asset.location}
               </div>
            </div>

            {/* Footer Stats */}
            <div className="flex items-center justify-between pt-4 border-t border-white/5">
               <div>
                  <div className="text-[10px] text-[#8A8F98] uppercase">Token Price</div>
                  <div className="text-sm font-medium text-white">{asset.price}</div>
               </div>
               <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
               </div>
            </div>
         </div>
       
       </Link>
    </motion.div>
  );
};