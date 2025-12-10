"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface AssetProps {
  name: string;
  category: string;
  price: string;
  yieldRate: string;
  image: string;
  colSpan?: string; 
}

export const AssetCard = ({ name, category, price, yieldRate, image, colSpan }: AssetProps) => {
  return (
    <motion.div
      whileHover="hover"
      initial="idle"
      className={`relative overflow-hidden rounded-3xl bg-[#15171B] border border-white/5 group ${colSpan || "col-span-1"}`}
    >
      {/* 1. The "Drone" Image Animation */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="relative w-full h-full"
          variants={{
            idle: { scale: 1, x: 0 },
            hover: { scale: 1.1, x: -10 } // Slow pan + zoom
          }}
          transition={{ duration: 3, ease: "easeOut" }} // Smooth, slow movement
        >
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover opacity-60 group-hover:opacity-50 transition-opacity"
          />
        </motion.div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-[#0B0C0E]/20 to-transparent" />
      </div>

      {/* 2. Top Badge */}
      <div className="relative z-10 p-5 flex justify-between items-start">
        <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/5 text-xs font-medium text-white/90">
          {category}
        </div>
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center opacity-0 translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-lg shadow-white/20">
          <ArrowUpRight className="w-4 h-4 text-black" />
        </div>
      </div>

      {/* 3. Bottom Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <h3 className="text-2xl font-[family-name:var(--font-serif)] text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          {name}
        </h3>
        
        {/* Details Reveal */}
        <motion.div
          variants={{
            hover: { height: "auto", opacity: 1, marginTop: 8 },
            idle: { height: 0, opacity: 0, marginTop: 0 }
          }}
          className="overflow-hidden"
        >
          <div className="flex items-center justify-between py-3 border-t border-white/10">
            <div>
              <p className="text-xs text-[#8A8F98]">Price</p>
              <p className="text-sm font-medium text-white">{price}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-[#8A8F98]">Yield</p>
              <p className="text-sm font-medium text-green-400">{yieldRate}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};