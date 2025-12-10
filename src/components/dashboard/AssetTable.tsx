"use client";
import React from "react";
import Image from "next/image";
import { Search, Filter, MoreHorizontal } from "lucide-react";

const assets = [
  { id: "PROP-432", name: "Penthouse 432", type: "Real Estate", amount: "50.00", value: "$2,500", yield: "+12.4%", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop" },
  { id: "WATCH-DAY", name: "Rolex Daytona", type: "Luxury", amount: "5.00", value: "$600", yield: "+8.1%", img: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=2080&auto=format&fit=crop" },
  { id: "ART-BNKS", name: "Girl w/ Balloon", type: "Art", amount: "100.00", value: "$3,000", yield: "+15.2%", img: "https://images.unsplash.com/photo-1579783902614-a3fb39279623?q=80&w=1974&auto=format&fit=crop" },
  { id: "SOLAR-TX", name: "Texas Solar 01", type: "Infra", amount: "250.00", value: "$2,500", yield: "+11.0%", img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop" },
];

export const AssetTable = () => {
  return (
    <div className="w-full">
      {/* 1. Toolbar */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-[family-name:var(--font-serif)] text-white">Your Assets</h3>
        <div className="flex gap-2">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8F98] group-focus-within:text-white transition-colors" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-[#0F1115] border border-white/10 rounded-lg py-2 pl-9 pr-4 text-sm text-white placeholder-[#8A8F98] focus:outline-none focus:border-white/20 transition-all w-48 focus:w-64"
            />
          </div>
          <button className="p-2 rounded-lg bg-[#0F1115] border border-white/10 text-[#8A8F98] hover:text-white hover:border-white/20 transition-all">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. The Table Container */}
      <div className="rounded-2xl border border-white/5 bg-[#0F1115]/40 overflow-hidden backdrop-blur-sm">
        
        {/* Header Row */}
        <div className="grid grid-cols-12 px-6 py-3 border-b border-white/5 text-[10px] uppercase font-mono text-[#8A8F98] tracking-wider">
          <div className="col-span-5">Asset Name</div>
          <div className="col-span-2 text-right">Shares</div>
          <div className="col-span-2 text-right">Value</div>
          <div className="col-span-2 text-right">Yield</div>
          <div className="col-span-1"></div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-white/5">
          {assets.map((asset, i) => (
            <div 
              key={i} 
              className="group grid grid-cols-12 px-6 py-4 items-center hover:bg-white/[0.02] transition-colors relative"
            >
              {/* Left Hover Accent */}
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Col 1: Name + Image */}
              <div className="col-span-5 flex items-center gap-4">
                <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-white/10">
                  <Image src={asset.img} alt={asset.name} fill className="object-cover" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">{asset.name}</div>
                  <div className="text-xs text-[#8A8F98] font-mono">{asset.id}</div>
                </div>
              </div>

              {/* Col 2: Shares */}
              <div className="col-span-2 text-right text-sm text-[#ECECEC] font-mono">
                {asset.amount}
              </div>

              {/* Col 3: Value */}
              <div className="col-span-2 text-right text-sm text-white font-medium">
                {asset.value}
              </div>

              {/* Col 4: Yield */}
              <div className="col-span-2 text-right">
                <span className="text-xs font-medium text-green-400 bg-green-400/10 border border-green-400/20 px-2 py-1 rounded-md">
                  {asset.yield}
                </span>
              </div>

              {/* Col 5: Actions */}
              <div className="col-span-1 flex justify-end">
                <button className="p-1.5 rounded-md hover:bg-white/10 text-[#8A8F98] hover:text-white transition-colors">
                   <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>
        
        {/* Footer Row */}
        <div className="px-6 py-3 bg-white/[0.02] border-t border-white/5 text-xs text-[#8A8F98] flex justify-between">
           <span>Showing 4 of 4 assets</span>
           <span className="font-mono">Total Value: $8,600</span>
        </div>

      </div>
    </div>
  );
};