// "use client";
// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Search, MoreHorizontal, ShieldCheck, Loader2, Sparkles } from "lucide-react";
// import { useReadContract, useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
// import { FACTORY_ADDRESS, FACTORY_ABI, ASSET_TOKEN_ABI } from '@/constants/contracts';
// import { formatEther } from "viem";

// export const AssetTable = () => {
//   const { data: assetAddresses, isLoading } = useReadContract({
//     address: FACTORY_ADDRESS,
//     abi: FACTORY_ABI,
//     functionName: 'getDeployedAssets',
//   });

//   return (
//     <div className="w-full">
//       {/* Toolbar */}
//       <div className="flex items-center justify-between mb-4">
//         <h3 className="text-lg font-[family-name:var(--font-serif)] text-white">Your Holdings</h3>
//         <div className="relative group">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8F98]" />
//             <input 
//               type="text" placeholder="Search..." 
//               className="bg-[#0F1115] border border-white/10 rounded-lg py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-white/20 w-48"
//             />
//         </div>
//       </div>

//       {/* Table */}
//       <div className="rounded-2xl border border-white/5 bg-[#0F1115]/40 overflow-hidden backdrop-blur-sm min-h-[200px]">
//         <div className="grid grid-cols-12 px-6 py-3 border-b border-white/5 text-[10px] uppercase font-mono text-[#8A8F98] tracking-wider">
//           <div className="col-span-5">Asset</div>
//           <div className="col-span-2 text-right">Shares</div>
//           <div className="col-span-2 text-right">Value</div>
//           <div className="col-span-2 text-right">Unclaimed Yield</div>
//           <div className="col-span-1"></div>
//         </div>

//         <div className="divide-y divide-white/5">
//            {isLoading ? (
//                <div className="flex justify-center py-8"><Loader2 className="animate-spin text-blue-500" /></div>
//            ) : (
//                assetAddresses && (assetAddresses as string[]).map((address) => (
//                    <PortfolioRow key={address} assetAddress={address as `0x${string}`} />
//                ))
//            )}
//            {assetAddresses && (assetAddresses as any[]).length === 0 && (
//                <div className="text-center py-8 text-[#8A8F98] text-sm">No assets found.</div>
//            )}
//         </div>
//       </div>
//     </div>
//   );
// };

// // --- SUB-COMPONENT: The Row ---
// const PortfolioRow = ({ assetAddress }: { assetAddress: `0x${string}` }) => {
//   const { address: userAddress } = useAccount();

//   // 1. Read Balance & Details
//   const { data: balance } = useReadContract({
//     address: assetAddress, abi: ASSET_TOKEN_ABI, functionName: 'balanceOf', args: userAddress ? [userAddress] : undefined
//   });

//   const { data: name } = useReadContract({
//     address: assetAddress, abi: ASSET_TOKEN_ABI, functionName: 'name',
//   });

//   const { data: symbol } = useReadContract({
//     address: assetAddress, abi: ASSET_TOKEN_ABI, functionName: 'symbol',
//   });

//   const { data: sharePrice } = useReadContract({
//     address: assetAddress, abi: ASSET_TOKEN_ABI, functionName: 'sharePrice',
//   });
  
//   const { data: imageURI } = useReadContract({
//      address: assetAddress, abi: ASSET_TOKEN_ABI, functionName: 'metadataURI',
//   });

//   // 2. Read CLAIMABLE RENT (Real Yield)
//   const { data: claimable, refetch: refetchClaimable } = useReadContract({
//     address: assetAddress,
//     abi: ASSET_TOKEN_ABI,
//     functionName: 'getClaimableRent',
//     args: userAddress ? [userAddress] : undefined,
//     query: { refetchInterval: 5000 } // Auto-check every 5s
//   });

//   // 3. Claim Action
//   const { writeContract, isPending } = useWriteContract();
  
//   const handleClaim = (e: React.MouseEvent) => {
//     e.preventDefault(); 
//     e.stopPropagation();
//     writeContract({ 
//         address: assetAddress, 
//         abi: ASSET_TOKEN_ABI, 
//         functionName: 'claimRent' 
//     });
//   };

//   // HIDE ROW if user owns nothing
//   if (!balance || balance === BigInt(0)) return null;

//   const shareCount = Number(balance);
//   const valueEth = sharePrice ? formatEther((sharePrice as bigint) * (balance as bigint)) : "0";
//   const claimableEth = claimable ? Number(formatEther(claimable as bigint)) : 0;

//   return (
//     <div className="group grid grid-cols-12 px-6 py-4 items-center hover:bg-blue-500/[0.05] transition-colors relative">
//       <Link href={`/asset/${assetAddress}`} className="absolute inset-0 z-10" />
//       <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-500 shadow-[0_0_10px_#3B82F6]" />

//       {/* Name + Image */}
//       <div className="col-span-5 flex items-center gap-4">
//         <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-white/10 ring-2 ring-blue-500/20 bg-white/5">
//             <Image 
//                 src={imageURI ? String(imageURI) : "https://images.unsplash.com/photo-1600596542815-27b88e5422d3?q=80&w=2674&auto=format&fit=crop"} 
//                 alt="Icon" 
//                 fill 
//                 className="object-cover" 
//                 unoptimized
//             />
//         </div>
//         <div>
//           <div className="text-sm font-medium text-white flex items-center gap-2">
//             {name ? String(name) : "Loading..."}
//             <ShieldCheck className="w-3 h-3 text-blue-400" />
//           </div>
//           <div className="text-xs text-blue-400 font-mono">{symbol ? String(symbol) : "..."}</div>
//         </div>
//       </div>

//       {/* Stats */}
//       <div className="col-span-2 text-right text-sm text-white font-mono font-bold">{shareCount}</div>
//       <div className="col-span-2 text-right text-sm text-white font-medium">{valueEth} ETH</div>

//       {/* ACTIVE YIELD BUTTON */}
//       <div className="col-span-2 text-right relative z-20">
//         {claimableEth > 0 ? (
//             <button 
//                 onClick={handleClaim}
//                 disabled={isPending}
//                 className="text-xs font-bold text-black bg-green-400 hover:bg-green-300 px-3 py-1.5 rounded-full animate-pulse flex items-center gap-1 ml-auto transition-colors"
//             >
//                 {isPending ? <Loader2 className="w-3 h-3 animate-spin"/> : <Sparkles className="w-3 h-3" />}
//                 Claim {claimableEth.toFixed(4)}
//             </button>
//         ) : (
//             <span className="text-xs font-medium text-[#8A8F98]">No Yield</span>
//         )}
//       </div>

//       <div className="col-span-1 flex justify-end">
//         <button className="p-1.5 rounded-md hover:bg-white/10 text-white transition-colors">
//            <MoreHorizontal className="w-4 h-4" />
//         </button>
//       </div>
//     </div>
//   );
// };





"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, MoreHorizontal, ShieldCheck, Loader2, Sparkles } from "lucide-react";
import { useReadContract, useAccount, useWriteContract } from 'wagmi';
import { FACTORY_ADDRESS, FACTORY_ABI, ASSET_TOKEN_ABI } from '@/constants/contracts';
import { formatEther } from "viem";

export const AssetTable = () => {
  const { data: assetAddresses, isLoading } = useReadContract({
    address: FACTORY_ADDRESS,
    abi: FACTORY_ABI,
    functionName: 'getDeployedAssets',
  });

  return (
    <div className="w-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-[family-name:var(--font-serif)] text-white">Your Holdings</h3>
        <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8F98]" />
            <input 
              type="text" placeholder="Search..." 
              className="bg-[#0F1115] border border-white/10 rounded-lg py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-white/20 w-48"
            />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-white/5 bg-[#0F1115]/40 overflow-hidden backdrop-blur-sm min-h-[200px]">
        <div className="grid grid-cols-12 px-6 py-3 border-b border-white/5 text-[10px] uppercase font-mono text-[#8A8F98] tracking-wider">
          <div className="col-span-5">Asset</div>
          <div className="col-span-2 text-right">Shares</div>
          <div className="col-span-2 text-right">Value</div>
          <div className="col-span-2 text-right">Unclaimed Yield</div>
          <div className="col-span-1"></div>
        </div>

        <div className="divide-y divide-white/5">
           {isLoading ? (
               <div className="flex justify-center py-8"><Loader2 className="animate-spin text-blue-500" /></div>
           ) : (
               assetAddresses && (assetAddresses as string[]).map((address) => (
                   <PortfolioRow key={address} assetAddress={address as `0x${string}`} />
               ))
           )}
           {assetAddresses && (assetAddresses as any[]).length === 0 && (
               <div className="text-center py-8 text-[#8A8F98] text-sm">No assets found.</div>
           )}
        </div>
      </div>
    </div>
  );
};

// --- SUB-COMPONENT: The Row ---
const PortfolioRow = ({ assetAddress }: { assetAddress: `0x${string}` }) => {
  const { address: userAddress } = useAccount();

  // 1. Read Balance & Details
  const { data: balance } = useReadContract({
    address: assetAddress, abi: ASSET_TOKEN_ABI, functionName: 'balanceOf', args: userAddress ? [userAddress] : undefined
  });

  const { data: name } = useReadContract({
    address: assetAddress, abi: ASSET_TOKEN_ABI, functionName: 'name',
  });

  const { data: symbol } = useReadContract({
    address: assetAddress, abi: ASSET_TOKEN_ABI, functionName: 'symbol',
  });

  // FIX: Read SPOT PRICE, not sharePrice
  const { data: spotPrice } = useReadContract({
    address: assetAddress, abi: ASSET_TOKEN_ABI, functionName: 'spotPrice',
  });
  
  const { data: imageURI } = useReadContract({
     address: assetAddress, abi: ASSET_TOKEN_ABI, functionName: 'metadataURI',
  });

  // 2. Read CLAIMABLE RENT
  const { data: claimable } = useReadContract({
    address: assetAddress,
    abi: ASSET_TOKEN_ABI,
    functionName: 'getClaimableRent',
    args: userAddress ? [userAddress] : undefined,
    query: { refetchInterval: 5000 }
  });

  // 3. Claim Action
  const { writeContract, isPending } = useWriteContract();
  
  const handleClaim = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation();
    writeContract({ 
        address: assetAddress, 
        abi: ASSET_TOKEN_ABI, 
        functionName: 'claimRent' 
    });
  };

  // HIDE ROW if user owns nothing
  if (!balance || balance === BigInt(0)) return null;

  const shareCount = Number(balance);
  // Calculate value using spotPrice
  const valueEth = spotPrice ? formatEther((spotPrice as bigint) * (balance as bigint)) : "0";
  const claimableEth = claimable ? Number(formatEther(claimable as bigint)) : 0;

  return (
    <div className="group grid grid-cols-12 px-6 py-4 items-center hover:bg-blue-500/[0.05] transition-colors relative">
      <Link href={`/asset/${assetAddress}`} className="absolute inset-0 z-10" />
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-500 shadow-[0_0_10px_#3B82F6]" />

      {/* Name + Image */}
      <div className="col-span-5 flex items-center gap-4">
        <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-white/10 ring-2 ring-blue-500/20 bg-white/5">
            <Image 
                src={imageURI ? String(imageURI) : "https://images.unsplash.com/photo-1600596542815-27b88e5422d3?q=80&w=2674&auto=format&fit=crop"} 
                alt="Icon" 
                fill 
                className="object-cover" 
                unoptimized
            />
        </div>
        <div>
          <div className="text-sm font-medium text-white flex items-center gap-2">
            {name ? String(name) : "Loading..."}
            <ShieldCheck className="w-3 h-3 text-blue-400" />
          </div>
          <div className="text-xs text-blue-400 font-mono">{symbol ? String(symbol) : "..."}</div>
        </div>
      </div>

      {/* Stats */}
      <div className="col-span-2 text-right text-sm text-white font-mono font-bold">{shareCount}</div>
      <div className="col-span-2 text-right text-sm text-white font-medium">{valueEth} ETH</div>

      {/* ACTIVE YIELD BUTTON */}
      <div className="col-span-2 text-right relative z-20">
        {claimableEth > 0 ? (
            <button 
                onClick={handleClaim}
                disabled={isPending}
                className="text-xs font-bold text-black bg-green-400 hover:bg-green-300 px-3 py-1.5 rounded-full animate-pulse flex items-center gap-1 ml-auto transition-colors"
            >
                {isPending ? <Loader2 className="w-3 h-3 animate-spin"/> : <Sparkles className="w-3 h-3" />}
                Claim {claimableEth.toFixed(4)}
            </button>
        ) : (
            <span className="text-xs font-medium text-[#8A8F98]">No Yield</span>
        )}
      </div>

      <div className="col-span-1 flex justify-end">
        <button className="p-1.5 rounded-md hover:bg-white/10 text-white transition-colors">
           <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};