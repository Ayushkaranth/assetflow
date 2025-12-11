// import { PortfolioHeader } from "@/components/dashboard/PortfolioHeader";
// import { AssetTable } from "@/components/dashboard/AssetTable";
// import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
// import { ActivityFeed } from "@/components/dashboard/ActivityFeed";

// export default function DashboardPage() {
//   return (
//     <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      
//       {/* 1. The Header spans full width */}
//       <PortfolioHeader />

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
//         {/* LEFT COLUMN (Main Content) */}
//         <div className="lg:col-span-2 space-y-8">
//            <PerformanceChart />
//            <AssetTable />
//         </div>

//         {/* RIGHT COLUMN (Sidebar) */}
//         <div className="lg:col-span-1">
//            {/* Sticky ensures it stays visible while you scroll the table */}
//            <div className="sticky top-24 space-y-8">
//               <ActivityFeed />
              
//               {/* Bonus: Invite Card to fill space */}
//               <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-white relative overflow-hidden">
//                  <div className="relative z-10">
//                     <h3 className="font-serif text-xl mb-2">Invite Friends</h3>
//                     <p className="text-sm text-blue-100 mb-4">Earn 5% of their trading fees forever.</p>
//                     <button className="w-full py-2 bg-white text-blue-600 font-bold rounded-lg text-xs hover:bg-blue-50 transition-colors">
//                        Copy Invite Link
//                     </button>
//                  </div>
//                  {/* Decor */}
//                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
//               </div>
//            </div>
//         </div>

//       </div>
//     </div>
//   );
// }




"use client";
import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { AssetTable } from "@/components/dashboard/AssetTable";
import { ArrowUpRight, Activity, Copy, TrendingUp, Wallet } from "lucide-react";

// Web3 Imports
import { useAccount, useReadContract } from 'wagmi';
import { FACTORY_ADDRESS, FACTORY_ABI, ASSET_TOKEN_ABI } from '@/constants/contracts';
import { readContract } from '@wagmi/core';
import { config } from "@/providers/Web3Provider"; 
import { formatEther } from "viem";

export default function DashboardPage() {
  const { address: userAddress, isConnected } = useAccount();
  
  // --- REAL DATA STATE ---
  const [totalValue, setTotalValue] = useState<number>(0);
  const [assetCount, setAssetCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  // 1. Get List of All Assets
  const { data: assetAddresses } = useReadContract({
    address: FACTORY_ADDRESS,
    abi: FACTORY_ABI,
    functionName: 'getDeployedAssets',
  });

  // 2. Calculate Portfolio Value
  useEffect(() => {
    const calculatePortfolio = async () => {
      if (!assetAddresses || !userAddress) {
        setLoading(false);
        return;
      }

      let sum = 0;
      let count = 0;
      const addresses = assetAddresses as string[];

      for (const address of addresses) {
        try {
            // Fetch Balance
            const balance = await readContract(config, {
                address: address as `0x${string}`,
                abi: ASSET_TOKEN_ABI,
                functionName: 'balanceOf',
                args: [userAddress]
            }) as bigint;

            if (balance > BigInt(0)) {
                count++;
                // Fetch Price
                const price = await readContract(config, {
                    address: address as `0x${string}`,
                    abi: ASSET_TOKEN_ABI,
                    functionName: 'sharePrice',
                }) as bigint;

                // Math: Balance * Price
                const assetValue = Number(formatEther(balance * price));
                sum += assetValue;
            }
        } catch (e) {
            console.error("Error calculating asset:", e);
        }
      }

      setTotalValue(sum);
      setAssetCount(count);
      setLoading(false);
    };

    calculatePortfolio();
  }, [assetAddresses, userAddress]);

  if (!isConnected) {
    return (
       <div className="min-h-screen bg-[#08090A] flex items-center justify-center text-white">
          <Navbar />
          <div className="text-center">
             <Wallet className="w-12 h-12 mx-auto text-[#8A8F98] mb-4" />
             <h2 className="text-xl font-medium">Please connect your wallet</h2>
          </div>
       </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08090A] text-[#ECECEC] selection:bg-blue-500/30">
        <Navbar />
        {/* Global Texture */}
        <div className="fixed inset-0 -z-10 opacity-20 pointer-events-none bg-noise" />

        <div className="pt-32 px-4 md:px-8 max-w-7xl mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
            {/* 1. DYNAMIC HEADER */}
            <PortfolioHeader totalValue={totalValue} loading={loading} assetCount={assetCount} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                
                {/* LEFT COLUMN (Main Content) */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Chart now takes real value */}
                    <PerformanceChart totalValue={totalValue} />
                    
                    {/* Table is already dynamic (It fetches its own data) */}
                    <AssetTable />
                </div>

                {/* RIGHT COLUMN (Sidebar) */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 space-y-8">
                        {/* Feed is semi-dynamic based on asset count */}
                        <ActivityFeed assetCount={assetCount} />
                        
                        {/* Invite Card */}
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-white relative overflow-hidden group cursor-pointer hover:shadow-lg transition-all">
                            <div className="relative z-10">
                                <h3 className="font-[family-name:var(--font-serif)] text-xl mb-2">Invite Friends</h3>
                                <p className="text-sm text-blue-100 mb-4">Earn 5% of their trading fees forever.</p>
                                <button className="w-full py-2 bg-white text-blue-600 font-bold rounded-lg text-xs hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                                    <Copy className="w-3 h-3" /> Copy Invite Link
                                </button>
                            </div>
                            {/* Decor */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/20 transition-colors" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
  );
}

// --- SUB-COMPONENTS (Integrated for single-file copy/paste simplicity) ---

const PortfolioHeader = ({ totalValue, loading, assetCount }: { totalValue: number, loading: boolean, assetCount: number }) => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
            <div>
                <h1 className="text-4xl font-[family-name:var(--font-serif)] text-white mb-2">
                    Portfolio Overview
                </h1>
                <p className="text-[#8A8F98]">
                    You have <span className="text-white font-medium">{assetCount} active investments</span> synced with Sepolia.
                </p>
            </div>
            <div className="flex gap-4">
                <div className="text-right p-4 bg-[#0F1115] border border-white/10 rounded-xl">
                    <div className="text-xs text-[#8A8F98] uppercase tracking-wider mb-1">Total Net Worth</div>
                    <div className="text-3xl font-medium text-white font-mono">
                        {loading ? <span className="animate-pulse">...</span> : `Ξ ${totalValue.toFixed(4)}`}
                    </div>
                </div>
            </div>
        </div>
    )
}

const PerformanceChart = ({ totalValue }: { totalValue: number }) => {
    return (
        <div className="p-6 rounded-2xl bg-[#0F1115] border border-white/10">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="font-medium text-white mb-1">Performance</h3>
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-white">Ξ {totalValue.toFixed(4)}</span>
                        <span className="text-xs font-medium text-green-400 bg-green-500/10 px-2 py-0.5 rounded flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" /> +12.5% (Est.)
                        </span>
                    </div>
                </div>
                {/* Visual Time Controls */}
                <div className="flex bg-white/5 rounded-lg p-1">
                    {['1D', '1W', '1M', '1Y', 'ALL'].map((t, i) => (
                        <button key={t} className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${i === 1 ? 'bg-white text-black shadow-sm' : 'text-[#8A8F98] hover:text-white'}`}>
                            {t}
                        </button>
                    ))}
                </div>
            </div>
            
            {/* The "Chart" Visual (Simulated for MVP) */}
            <div className="h-64 w-full bg-gradient-to-t from-blue-500/5 to-transparent rounded-xl border border-white/5 relative overflow-hidden">
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                    <path d="M0,200 C150,200 150,100 300,100 C450,100 450,150 600,50 L800,0" stroke="url(#gradient)" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="1" />
                        </linearGradient>
                    </defs>
                </svg>
                {/* Grid Lines */}
                <div className="absolute inset-0 grid grid-rows-4 divide-y divide-white/5 pointer-events-none">
                    <div></div><div></div><div></div><div></div>
                </div>
            </div>
        </div>
    )
}

const ActivityFeed = ({ assetCount }: { assetCount: number }) => {
    return (
        <div className="p-6 rounded-2xl bg-[#0F1115] border border-white/10">
            <h3 className="font-medium text-white mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-400" /> Recent Activity
            </h3>
            <div className="space-y-6">
                {assetCount > 0 ? (
                    <>
                        <div className="flex gap-3 relative">
                            <div className="absolute top-2 left-2 bottom-0 w-px bg-white/10 -z-10" />
                            <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-[#0F1115] mt-1 shrink-0" />
                            <div>
                                <div className="text-sm text-white">Purchase Confirmed</div>
                                <div className="text-xs text-[#8A8F98]">You bought shares in a new asset</div>
                                <div className="text-xs text-white/40 mt-1">Just now</div>
                            </div>
                        </div>
                         <div className="flex gap-3 relative">
                            <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-[#0F1115] mt-1 shrink-0" />
                            <div>
                                <div className="text-sm text-white">Wallet Connected</div>
                                <div className="text-xs text-[#8A8F98]">Session synced with Sepolia</div>
                                <div className="text-xs text-white/40 mt-1">2 mins ago</div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-4 text-xs text-[#8A8F98]">
                        No recent activity.
                    </div>
                )}
            </div>
        </div>
    )
}