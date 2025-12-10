"use client";
import React from "react";
import { motion } from "framer-motion";

const trades = [
  "New Listing: 432 Park Ave ($12M)",
  "•",
  "0x83...192 purchased 50 shares of Rolex Daytona",
  "•",
  "Yield Distrubution: $42,000 paid to stakers",
  "•",
  "New Listing: Banksy 'Girl with Balloon'",
  "•",
  "0x11...842 purchased 200 shares of Solar Farm",
  "•",
];

export const LiveFeed = () => {
  return (
    <div className="w-full border-y border-white/5 bg-[#0B0C0E]/50 backdrop-blur-sm overflow-hidden py-3">
      <div className="flex whitespace-nowrap mask-linear-fade">
        <motion.div 
          animate={{ x: "-50%" }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex gap-8"
        >
          {/* Duplicate list for seamless loop */}
          {[...trades, ...trades, ...trades].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs font-mono text-[#8A8F98] uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
              {item}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};