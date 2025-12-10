"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

// Mock Data Points
const data = [10, 25, 18, 30, 22, 45, 35, 55, 48, 65, 58, 80];

export const PerformanceChart = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Calculate SVG Path
  const width = 100;
  const height = 40;
  const maxVal = Math.max(...data);
  
  // Create the line path
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - (val / maxVal) * height * 0.8; // Use 80% height
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="w-full p-6 rounded-2xl bg-[#0F1115]/60 border border-white/5 backdrop-blur-xl mb-6 relative group overflow-hidden">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
           <h3 className="text-sm font-medium text-white">Performance</h3>
           <p className="text-xs text-[#8A8F98] font-mono">May 01 - May 31</p>
        </div>
        <div className="flex gap-1">
           {["1D", "1W", "1M", "1Y", "ALL"].map(period => (
              <button 
                key={period} 
                className={`px-3 py-1 rounded-md text-[10px] font-medium transition-colors ${period === "1M" ? "bg-white/10 text-white" : "text-[#8A8F98] hover:text-white"}`}
              >
                {period}
              </button>
           ))}
        </div>
      </div>

      {/* THE CHART */}
      <div className="relative h-48 w-full">
         <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible" preserveAspectRatio="none">
            <defs>
              <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </linearGradient>
            </defs>
            
            {/* The Area Fill */}
            <path 
              d={`M0,${height} L0,${height} ${points.split(" ")[0]} L ${points} L ${width},${height} Z`} 
              fill="url(#chartFill)" 
            />
            
            {/* The Line */}
            <motion.path 
               initial={{ pathLength: 0 }}
               animate={{ pathLength: 1 }}
               transition={{ duration: 1.5, ease: "easeInOut" }}
               d={`M ${points}`} 
               fill="none" 
               stroke="#3B82F6" 
               strokeWidth="0.5" 
               strokeLinecap="round"
               vectorEffect="non-scaling-stroke"
            />

            {/* Interactive Points */}
            {data.map((val, i) => {
               const x = (i / (data.length - 1)) * width;
               const y = height - (val / maxVal) * height * 0.8;
               return (
                  <g key={i}>
                    {/* Invisible Hit Area for Hover */}
                    <rect 
                       x={x - 2} y={0} width={4} height={height} 
                       fill="transparent" 
                       onMouseEnter={() => setHoveredIndex(i)}
                       onMouseLeave={() => setHoveredIndex(null)}
                       className="cursor-crosshair"
                    />
                    {/* The Dot (Only visible on hover) */}
                    {hoveredIndex === i && (
                       <>
                         <line x1={x} y1={0} x2={x} y2={height} stroke="white" strokeOpacity="0.1" strokeWidth="0.2" vectorEffect="non-scaling-stroke" />
                         <circle cx={x} cy={y} r="1" fill="#3B82F6" stroke="white" strokeWidth="0.2" vectorEffect="non-scaling-stroke" />
                       </>
                    )}
                  </g>
               )
            })}
         </svg>
         
         {/* Tooltip Overlay */}
         {hoveredIndex !== null && (
            <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#15171B] border border-white/10 px-3 py-1.5 rounded-lg shadow-xl"
            >
               <div className="text-xs font-mono text-[#8A8F98]">Valuation</div>
               <div className="text-sm font-bold text-white">${(data[hoveredIndex] * 100).toLocaleString()}</div>
            </motion.div>
         )}
      </div>
    </div>
  );
};