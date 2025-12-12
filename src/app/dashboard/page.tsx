// // import { PortfolioHeader } from "@/components/dashboard/PortfolioHeader";
// // import { AssetTable } from "@/components/dashboard/AssetTable";
// // import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
// // import { ActivityFeed } from "@/components/dashboard/ActivityFeed";

// // export default function DashboardPage() {
// //   return (
// //     <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      
// //       {/* 1. The Header spans full width */}
// //       <PortfolioHeader />

// //       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
// //         {/* LEFT COLUMN (Main Content) */}
// //         <div className="lg:col-span-2 space-y-8">
// //            <PerformanceChart />
// //            <AssetTable />
// //         </div>

// //         {/* RIGHT COLUMN (Sidebar) */}
// //         <div className="lg:col-span-1">
// //            {/* Sticky ensures it stays visible while you scroll the table */}
// //            <div className="sticky top-24 space-y-8">
// //               <ActivityFeed />
              
// //               {/* Bonus: Invite Card to fill space */}
// //               <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-white relative overflow-hidden">
// //                  <div className="relative z-10">
// //                     <h3 className="font-serif text-xl mb-2">Invite Friends</h3>
// //                     <p className="text-sm text-blue-100 mb-4">Earn 5% of their trading fees forever.</p>
// //                     <button className="w-full py-2 bg-white text-blue-600 font-bold rounded-lg text-xs hover:bg-blue-50 transition-colors">
// //                        Copy Invite Link
// //                     </button>
// //                  </div>
// //                  {/* Decor */}
// //                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
// //               </div>
// //            </div>
// //         </div>

// //       </div>
// //     </div>
// //   );
// // }




// "use client";
// import React, { useState, useEffect } from "react";
// import { Navbar } from "@/components/Navbar";
// import { AssetTable } from "@/components/dashboard/AssetTable";
// import { ArrowUpRight, Activity, Copy, TrendingUp, Wallet } from "lucide-react";

// // Web3 Imports
// import { useAccount, useReadContract } from 'wagmi';
// import { FACTORY_ADDRESS, FACTORY_ABI, ASSET_TOKEN_ABI } from '@/constants/contracts';
// import { readContract } from '@wagmi/core';
// import { config } from "@/providers/Web3Provider"; 
// import { formatEther } from "viem";

// export default function DashboardPage() {
//   const { address: userAddress, isConnected } = useAccount();
  
//   // --- REAL DATA STATE ---
//   const [totalValue, setTotalValue] = useState<number>(0);
//   const [assetCount, setAssetCount] = useState<number>(0);
//   const [loading, setLoading] = useState<boolean>(true);

//   // 1. Get List of All Assets
//   const { data: assetAddresses } = useReadContract({
//     address: FACTORY_ADDRESS,
//     abi: FACTORY_ABI,
//     functionName: 'getDeployedAssets',
//   });

//   // 2. Calculate Portfolio Value
//   useEffect(() => {
//     const calculatePortfolio = async () => {
//       if (!assetAddresses || !userAddress) {
//         setLoading(false);
//         return;
//       }

//       let sum = 0;
//       let count = 0;
//       const addresses = assetAddresses as string[];

//       for (const address of addresses) {
//         try {
//             // Fetch Balance
//             const balance = await readContract(config, {
//                 address: address as `0x${string}`,
//                 abi: ASSET_TOKEN_ABI,
//                 functionName: 'balanceOf',
//                 args: [userAddress]
//             }) as bigint;

//             if (balance > BigInt(0)) {
//                 count++;
//                 // Fetch Price
//                 const price = await readContract(config, {
//                     address: address as `0x${string}`,
//                     abi: ASSET_TOKEN_ABI,
//                     functionName: 'sharePrice',
//                 }) as bigint;

//                 // Math: Balance * Price
//                 const assetValue = Number(formatEther(balance * price));
//                 sum += assetValue;
//             }
//         } catch (e) {
//             console.error("Error calculating asset:", e);
//         }
//       }

//       setTotalValue(sum);
//       setAssetCount(count);
//       setLoading(false);
//     };

//     calculatePortfolio();
//   }, [assetAddresses, userAddress]);

//   if (!isConnected) {
//     return (
//        <div className="min-h-screen bg-[#08090A] flex items-center justify-center text-white">
//           <Navbar />
//           <div className="text-center">
//              <Wallet className="w-12 h-12 mx-auto text-[#8A8F98] mb-4" />
//              <h2 className="text-xl font-medium">Please connect your wallet</h2>
//           </div>
//        </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#08090A] text-[#ECECEC] selection:bg-blue-500/30">
//         <Navbar />
//         {/* Global Texture */}
//         <div className="fixed inset-0 -z-10 opacity-20 pointer-events-none bg-noise" />

//         <div className="pt-32 px-4 md:px-8 max-w-7xl mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
//             {/* 1. DYNAMIC HEADER */}
//             <PortfolioHeader totalValue={totalValue} loading={loading} assetCount={assetCount} />

//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                
//                 {/* LEFT COLUMN (Main Content) */}
//                 <div className="lg:col-span-2 space-y-8">
//                     {/* Chart now takes real value */}
//                     <PerformanceChart totalValue={totalValue} />
                    
//                     {/* Table is already dynamic (It fetches its own data) */}
//                     <AssetTable />
//                 </div>

//                 {/* RIGHT COLUMN (Sidebar) */}
//                 <div className="lg:col-span-1">
//                     <div className="sticky top-24 space-y-8">
//                         {/* Feed is semi-dynamic based on asset count */}
//                         <ActivityFeed assetCount={assetCount} />
                        
//                         {/* Invite Card */}
//                         <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-white relative overflow-hidden group cursor-pointer hover:shadow-lg transition-all">
//                             <div className="relative z-10">
//                                 <h3 className="font-[family-name:var(--font-serif)] text-xl mb-2">Invite Friends</h3>
//                                 <p className="text-sm text-blue-100 mb-4">Earn 5% of their trading fees forever.</p>
//                                 <button className="w-full py-2 bg-white text-blue-600 font-bold rounded-lg text-xs hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
//                                     <Copy className="w-3 h-3" /> Copy Invite Link
//                                 </button>
//                             </div>
//                             {/* Decor */}
//                             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/20 transition-colors" />
//                         </div>
//                     </div>
//                 </div>

//             </div>
//         </div>
//     </div>
//   );
// }

// // --- SUB-COMPONENTS (Integrated for single-file copy/paste simplicity) ---

// const PortfolioHeader = ({ totalValue, loading, assetCount }: { totalValue: number, loading: boolean, assetCount: number }) => {
//     return (
//         <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
//             <div>
//                 <h1 className="text-4xl font-[family-name:var(--font-serif)] text-white mb-2">
//                     Portfolio Overview
//                 </h1>
//                 <p className="text-[#8A8F98]">
//                     You have <span className="text-white font-medium">{assetCount} active investments</span> synced with Sepolia.
//                 </p>
//             </div>
//             <div className="flex gap-4">
//                 <div className="text-right p-4 bg-[#0F1115] border border-white/10 rounded-xl">
//                     <div className="text-xs text-[#8A8F98] uppercase tracking-wider mb-1">Total Net Worth</div>
//                     <div className="text-3xl font-medium text-white font-mono">
//                         {loading ? <span className="animate-pulse">...</span> : `Ξ ${totalValue.toFixed(4)}`}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// const PerformanceChart = ({ totalValue }: { totalValue: number }) => {
//     return (
//         <div className="p-6 rounded-2xl bg-[#0F1115] border border-white/10">
//             <div className="flex justify-between items-center mb-6">
//                 <div>
//                     <h3 className="font-medium text-white mb-1">Performance</h3>
//                     <div className="flex items-center gap-2">
//                         <span className="text-2xl font-bold text-white">Ξ {totalValue.toFixed(4)}</span>
//                         <span className="text-xs font-medium text-green-400 bg-green-500/10 px-2 py-0.5 rounded flex items-center gap-1">
//                             <TrendingUp className="w-3 h-3" /> +12.5% (Est.)
//                         </span>
//                     </div>
//                 </div>
//                 {/* Visual Time Controls */}
//                 <div className="flex bg-white/5 rounded-lg p-1">
//                     {['1D', '1W', '1M', '1Y', 'ALL'].map((t, i) => (
//                         <button key={t} className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${i === 1 ? 'bg-white text-black shadow-sm' : 'text-[#8A8F98] hover:text-white'}`}>
//                             {t}
//                         </button>
//                     ))}
//                 </div>
//             </div>
            
//             {/* The "Chart" Visual (Simulated for MVP) */}
//             <div className="h-64 w-full bg-gradient-to-t from-blue-500/5 to-transparent rounded-xl border border-white/5 relative overflow-hidden">
//                 <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
//                     <path d="M0,200 C150,200 150,100 300,100 C450,100 450,150 600,50 L800,0" stroke="url(#gradient)" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
//                     <defs>
//                         <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
//                             <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.5" />
//                             <stop offset="100%" stopColor="#8B5CF6" stopOpacity="1" />
//                         </linearGradient>
//                     </defs>
//                 </svg>
//                 {/* Grid Lines */}
//                 <div className="absolute inset-0 grid grid-rows-4 divide-y divide-white/5 pointer-events-none">
//                     <div></div><div></div><div></div><div></div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// const ActivityFeed = ({ assetCount }: { assetCount: number }) => {
//     return (
//         <div className="p-6 rounded-2xl bg-[#0F1115] border border-white/10">
//             <h3 className="font-medium text-white mb-4 flex items-center gap-2">
//                 <Activity className="w-4 h-4 text-blue-400" /> Recent Activity
//             </h3>
//             <div className="space-y-6">
//                 {assetCount > 0 ? (
//                     <>
//                         <div className="flex gap-3 relative">
//                             <div className="absolute top-2 left-2 bottom-0 w-px bg-white/10 -z-10" />
//                             <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-[#0F1115] mt-1 shrink-0" />
//                             <div>
//                                 <div className="text-sm text-white">Purchase Confirmed</div>
//                                 <div className="text-xs text-[#8A8F98]">You bought shares in a new asset</div>
//                                 <div className="text-xs text-white/40 mt-1">Just now</div>
//                             </div>
//                         </div>
//                          <div className="flex gap-3 relative">
//                             <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-[#0F1115] mt-1 shrink-0" />
//                             <div>
//                                 <div className="text-sm text-white">Wallet Connected</div>
//                                 <div className="text-xs text-[#8A8F98]">Session synced with Sepolia</div>
//                                 <div className="text-xs text-white/40 mt-1">2 mins ago</div>
//                             </div>
//                         </div>
//                     </>
//                 ) : (
//                     <div className="text-center py-4 text-xs text-[#8A8F98]">
//                         No recent activity.
//                     </div>
//                 )}
//             </div>
//         </div>
//     )
// }




"use client";
import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { AssetTable } from "@/components/dashboard/AssetTable";
import { Activity, Copy, TrendingUp, Wallet, CheckCheck, Loader2 } from "lucide-react";

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
      // Check inputs
      if (!assetAddresses || !userAddress) {
        setLoading(true);
        return;
      }

      console.log("--- Starting Portfolio Calculation ---");
      let sum = 0;
      let count = 0;
      const addresses = assetAddresses as string[];

      for (const address of addresses) {
        try {
            // A. Fetch Balance
            const balance = await readContract(config, {
                address: address as `0x${string}`,
                abi: ASSET_TOKEN_ABI,
                functionName: 'balanceOf',
                args: [userAddress]
            }) as bigint;

            // Only proceed if user owns shares
            if (balance > BigInt(0)) {
                count++;
                
                // B. Fetch Dynamic Spot Price
                const price = await readContract(config, {
                    address: address as `0x${string}`,
                    abi: ASSET_TOKEN_ABI,
                    functionName: 'spotPrice', 
                }) as bigint;

                // C. Calculate Value
                const ethValue = Number(formatEther(balance * price));
                sum += ethValue;
            }
        } catch (e) {
            console.error(`Error processing asset ${address}:`, e);
        }
      }

      console.log(`>>> FINAL NET WORTH: ${sum} ETH`);
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
        <div className="fixed inset-0 -z-10 opacity-20 pointer-events-none bg-noise" />

        <div className="pt-32 px-4 md:px-8 max-w-7xl mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
            {/* 1. DYNAMIC HEADER */}
            <PortfolioHeader totalValue={totalValue} loading={loading} assetCount={assetCount} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                
                {/* LEFT COLUMN */}
                <div className="lg:col-span-2 space-y-8">
                    {/* The New History Chart */}
                    <PerformanceChart totalValue={totalValue} loading={loading} />
                    
                    <AssetTable />
                </div>

                {/* RIGHT COLUMN */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 space-y-8">
                        <ActivityFeed assetCount={assetCount} />
                        <InviteCard userAddress={userAddress || ""} />
                    </div>
                </div>

            </div>
        </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

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
                <div className="text-right p-4 bg-[#0F1115] border border-white/10 rounded-xl min-w-[200px]">
                    <div className="text-xs text-[#8A8F98] uppercase tracking-wider mb-1">Total Net Worth</div>
                    <div className="text-3xl font-medium text-white font-mono">
                        {loading ? <span className="animate-pulse">...</span> : `Ξ ${totalValue.toFixed(4)}`}
                    </div>
                </div>
            </div>
        </div>
    )
}

// --- NEW SMART CHART COMPONENT ---
const PerformanceChart = ({ totalValue, loading }: { totalValue: number, loading: boolean }) => {
    const { address } = useAccount();
    const [history, setHistory] = useState<number[]>([]);

    // 1. History Manager (LocalStorage)
    useEffect(() => {
        if (loading || !address) return;

        // Unique storage key for this wallet
        const storageKey = `assetflow_history_${address}`;
        
        // Retrieve existing data
        const stored = localStorage.getItem(storageKey);
        let dataPoints: number[] = stored ? JSON.parse(stored) : [];

        // Check if value changed significantly before saving (avoids noise)
        const lastPoint = dataPoints[dataPoints.length - 1];
        
        // Logic: If history empty OR value changed > 0.000001, add new point
        if (dataPoints.length === 0 || (lastPoint !== undefined && Math.abs(lastPoint - totalValue) > 0.000001)) {
            console.log("Updating Graph History...", totalValue);
            dataPoints.push(totalValue);
            
            // Limit history length to 50 points to keep graph readable
            if (dataPoints.length > 50) dataPoints.shift();
            
            localStorage.setItem(storageKey, JSON.stringify(dataPoints));
        }

        // Fallback: If only 1 point exists, duplicate it so we can draw a line
        if (dataPoints.length === 1) {
            dataPoints = [dataPoints[0], dataPoints[0]];
        }

        setHistory(dataPoints);
    }, [totalValue, loading, address]);

    // 2. SVG Path Generator
    const generatePath = () => {
        if (history.length === 0) return "M0,150 L800,150";

        // Calculate Scale
        const maxVal = Math.max(...history) * 1.05; // 5% Top padding
        const minVal = Math.min(...history) * 0.95; // 5% Bottom padding
        const range = maxVal - minVal;
        
        // X-Axis Step (Width 800px)
        const stepX = 800 / (history.length - 1); 

        // Map values to coordinates
        const points = history.map((val, i) => {
            const x = i * stepX;
            // Prevent division by zero if flat line
            const normalizedY = range === 0 ? 100 : 200 - ((val - minVal) / range) * 200; 
            return `${x},${normalizedY}`;
        });

        // SVG Path Command
        return `M${points[0]} L${points.slice(1).join(" L")}`;
    };

    // 3. Trend Analysis
    const startVal = history[0] || 0;
    const endVal = history[history.length - 1] || 0;
    const change = endVal - startVal;
    const isPositive = change >= 0;
    const percentChange = startVal > 0 ? ((change / startVal) * 100).toFixed(2) : "0.00";

    return (
        <div className="p-6 rounded-2xl bg-[#0F1115] border border-white/10 relative overflow-hidden group">
            {/* Header / Stats */}
            <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                    <h3 className="font-medium text-white mb-1">Performance History</h3>
                    <div className="flex items-center gap-3">
                        <span className="text-3xl font-bold text-white font-mono">
                            Ξ {totalValue.toFixed(4)}
                        </span>
                        
                        {/* Dynamic Trend Badge */}
                        <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-bold ${
                            isPositive ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
                        }`}>
                            <TrendingUp className={`w-3 h-3 ${!isPositive && "rotate-180"}`} />
                            <span>{percentChange}%</span>
                        </div>
                    </div>
                </div>

                {/* Min/Max Context Labels */}
                <div className="flex flex-col items-end text-[10px] text-[#8A8F98] font-mono gap-1 opacity-60">
                    <span>High: Ξ {Math.max(...history, totalValue).toFixed(4)}</span>
                    <span>Low: Ξ {Math.min(...history, totalValue).toFixed(4)}</span>
                </div>
            </div>
            
            {/* The Graph */}
            <div className="h-64 w-full bg-gradient-to-t from-blue-500/5 to-transparent rounded-xl border border-white/5 relative overflow-hidden">
                <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor={isPositive ? "#22c55e" : "#ef4444"} stopOpacity="0.2" />
                            <stop offset="100%" stopColor={isPositive ? "#22c55e" : "#ef4444"} stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    
                    {/* Filled Area */}
                    <path 
                        d={`${generatePath()} L800,300 L0,300 Z`} 
                        fill="url(#chartGradient)" 
                        className="transition-all duration-500"
                    />

                    {/* The Line */}
                    <path 
                        d={generatePath()} 
                        stroke={isPositive ? "#22c55e" : "#ef4444"} // Green if up, Red if down
                        strokeWidth="3" 
                        fill="none" 
                        vectorEffect="non-scaling-stroke" 
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-all duration-500 ease-out"
                    />
                </svg>

                {/* Background Grid Lines */}
                <div className="absolute inset-0 grid grid-rows-4 divide-y divide-white/5 pointer-events-none">
                    <div className="border-t border-white/5"></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            
            <p className="text-[10px] text-[#8A8F98] mt-4 text-center">
                * Chart updates locally based on your portfolio snapshots.
            </p>
        </div>
    )
}

const InviteCard = ({ userAddress }: { userAddress: string }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        const link = `https://assetflow.app/register?ref=${userAddress}`;
        navigator.clipboard.writeText(link);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-white relative overflow-hidden group cursor-pointer hover:shadow-lg transition-all">
            <div className="relative z-10">
                <h3 className="font-[family-name:var(--font-serif)] text-xl mb-2">Invite Friends</h3>
                <p className="text-sm text-blue-100 mb-4">Earn 5% of their trading fees forever.</p>
                <button 
                    onClick={handleCopy}
                    className="w-full py-2 bg-white text-blue-600 font-bold rounded-lg text-xs hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                >
                    {copied ? <><CheckCheck className="w-3 h-3" /> Copied!</> : <><Copy className="w-3 h-3" /> Copy Invite Link</>}
                </button>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/20 transition-colors" />
        </div>
    );
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
                                <div className="text-sm text-white">Portfolio Updated</div>
                                <div className="text-xs text-[#8A8F98]">Values synced with bonding curve</div>
                                <div className="text-xs text-white/40 mt-1">Live</div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-4 text-xs text-[#8A8F98]">No recent activity.</div>
                )}
            </div>
        </div>
    )
}