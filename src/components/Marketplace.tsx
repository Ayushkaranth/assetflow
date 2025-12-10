"use client";
import React from "react";
import { AssetCard } from "./AssetCard";

const assets = [
  {
    name: "Penthouse 432",
    category: "Real Estate",
    price: "$50.00 / Share",
    yieldRate: "8.5% APY",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
    colSpan: "md:col-span-2 md:row-span-2 h-[500px]", // Big Feature Card
  },
  {
    name: "Rolex Daytona '68",
    category: "Luxury Watch",
    price: "$120.00 / Share",
    yieldRate: "+12% 1Y",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=2080&auto=format&fit=crop",
    colSpan: "col-span-1 h-[240px]",
  },
  {
    name: "Banksy 'Girl with Balloon'",
    category: "Fine Art",
    price: "$30.00 / Share",
    yieldRate: "+15% 1Y",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb39279623?q=80&w=1974&auto=format&fit=crop",
    colSpan: "col-span-1 h-[240px]",
  },
  {
    name: "Solar Farm TX-01",
    category: "Infrastructure",
    price: "$10.00 / Share",
    yieldRate: "11% APY",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop",
    colSpan: "md:col-span-2 h-[240px]", // Wide bottom card
  },
];

export const Marketplace = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-24">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-12">
        <div>
          <h2 className="text-4xl font-[family-name:var(--font-serif)] text-white mb-2">
            Trending Assets
          </h2>
          <p className="text-[#8A8F98]">
            Curated opportunities available for fractional investment.
          </p>
        </div>
        <button className="hidden md:block text-sm text-white hover:text-gray-300 border-b border-white/20 pb-0.5">
          View all 24 assets
        </button>
      </div>

      {/* The Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {assets.map((asset, idx) => (
          <AssetCard key={idx} {...asset} />
        ))}
      </div>
    </section>
  );
};