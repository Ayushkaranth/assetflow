"use client";
import React from "react";
import { ArrowUpRight, ArrowDownLeft, RefreshCcw } from "lucide-react";

const activities = [
  { type: "deposit", asset: "USDC", amount: "+$2,400.00", date: "Today, 10:23 AM", status: "Completed" },
  { type: "buy", asset: "Penthouse 432", amount: "-$50.00", date: "Yesterday", status: "Processing" },
  { type: "yield", asset: "Rolex Yield", amount: "+$12.40", date: "Mon, Jun 12", status: "Completed" },
  { type: "buy", asset: "Solar Farm", amount: "-$250.00", date: "Mon, Jun 12", status: "Completed" },
];

export const ActivityFeed = () => {
  return (
    <div className="w-full">
      <h3 className="text-lg font-[family-name:var(--font-serif)] text-white mb-4">Recent Activity</h3>
      
      <div className="rounded-2xl border border-white/5 bg-[#0F1115]/40 backdrop-blur-sm overflow-hidden">
        <div className="divide-y divide-white/5">
          {activities.map((item, i) => (
            <div key={i} className="p-4 flex items-center gap-4 hover:bg-white/[0.02] transition-colors group cursor-pointer">
              
              {/* Icon Box */}
              <div className={`
                 p-2 rounded-lg border border-white/5 
                 ${item.type === 'deposit' || item.type === 'yield' ? 'bg-green-500/10 text-green-400' : 'bg-white/5 text-white'}
              `}>
                 {item.type === 'deposit' || item.type === 'yield' ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
              </div>

              {/* Details */}
              <div className="flex-1">
                 <div className="flex justify-between items-center mb-0.5">
                    <span className="text-sm font-medium text-white">{item.type === 'yield' ? 'Yield Payout' : item.asset}</span>
                    <span className={`text-sm font-medium font-mono ${item.type === 'buy' ? 'text-white' : 'text-green-400'}`}>
                       {item.amount}
                    </span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-xs text-[#8A8F98]">{item.date}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded border ${item.status === 'Processing' ? 'text-yellow-400 border-yellow-400/20 bg-yellow-400/10' : 'text-[#8A8F98] border-white/5 bg-white/5'}`}>
                       {item.status}
                    </span>
                 </div>
              </div>

            </div>
          ))}
        </div>
        
        {/* Footer Link */}
        <button className="w-full py-3 text-xs text-[#8A8F98] hover:text-white border-t border-white/5 flex items-center justify-center gap-2 transition-colors">
           <RefreshCcw className="w-3 h-3" />
           View All Transactions
        </button>
      </div>
    </div>
  );
};