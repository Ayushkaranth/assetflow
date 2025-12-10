"use client";
import React from "react";
import { motion } from "framer-motion";

const stats = [
  "Total Value Locked: $14.2M",
  "•",
  "Active Investors: 8,430",
  "•",
  "Average Yield: 11.4%",
  "•",
  "Assets Tokenized: 142",
  "•",
];

export const TrustTicker = () => {
  return (
    <div className="w-full border-y border-white/5 bg-[#0B0C0E]/50 backdrop-blur-sm overflow-hidden py-4">
      <div className="flex whitespace-nowrap mask-linear-fade">
        {/* We duplicate the list to create a seamless loop */}
        {[...stats, ...stats, ...stats, ...stats].map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="inline-block px-6 text-sm font-medium text-[#8A8F98] tracking-widest uppercase"
          >
            {item}
          </motion.div>
        ))}
      </div>
    </div>
  );
};