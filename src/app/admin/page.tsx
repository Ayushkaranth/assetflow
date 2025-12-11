"use client";
import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { ShieldCheck, Wallet, ArrowRight, Loader2, Plus } from "lucide-react";
import Link from "next/link";
import { useAccount, useReadContract } from 'wagmi';
import { FACTORY_ADDRESS, FACTORY_ABI, ASSET_TOKEN_ABI } from '@/constants/contracts';
import { readContract } from '@wagmi/core';
import { config } from "../../providers/Web3Provider"; 
import { formatEther } from "viem";

export default function AdminHub() {
  const { address: userAddress, isConnected } = useAccount();
  const [myAssets, setMyAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Get ALL assets from Factory
  const { data: allAssets } = useReadContract({
    address: FACTORY_ADDRESS,
    abi: FACTORY_ABI,
    functionName: 'getDeployedAssets',
  });

  // 2. Filter: Find which ones belong to YOU
  useEffect(() => {
    const fetchMyAssets = async () => {
      if (!allAssets || !userAddress) return;
      
      const results = [];
      const assetList = allAssets as string[];

      for (const assetAddr of assetList) {
        try {
            // Read owner of this asset
            const owner = await readContract(config, {
                address: assetAddr as `0x${string}`,
                abi: ASSET_TOKEN_ABI,
                functionName: 'owner'
            });

            // If YOU are the owner, fetch details and add to list
            if ((owner as string).toLowerCase() === userAddress.toLowerCase()) {
                
                const name = await readContract(config, {
                    address: assetAddr as `0x${string}`,
                    abi: ASSET_TOKEN_ABI,
                    functionName: 'name'
                });

                const symbol = await readContract(config, {
                    address: assetAddr as `0x${string}`,
                    abi: ASSET_TOKEN_ABI,
                    functionName: 'symbol'
                });

                results.push({ address: assetAddr, name, symbol });
            }
        } catch (err) {
            console.error("Error fetching asset:", err);
        }
      }
      setMyAssets(results);
      setLoading(false);
    };

    if (allAssets && userAddress) {
        fetchMyAssets();
    }
  }, [allAssets, userAddress]);

  if (!isConnected) return <div className="min-h-screen bg-[#08090A] flex items-center justify-center text-white">Please Connect Wallet</div>;

  return (
    <div className="min-h-screen bg-[#08090A] text-[#ECECEC]">
      <Navbar />
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none bg-noise" />

      <main className="relative z-10 pt-32 px-4 md:px-8 max-w-5xl mx-auto pb-20">
        
        <div className="flex justify-between items-end mb-12">
            <div>
                <h1 className="text-3xl font-[family-name:var(--font-serif)] text-white mb-2">Issuer Console</h1>
                <p className="text-[#8A8F98]">Manage your deployed Real World Assets.</p>
            </div>
            <Link href="/create">
                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg font-medium transition-colors">
                    <Plus className="w-4 h-4" /> Launch New Asset
                </button>
            </Link>
        </div>

        {/* ASSET GRID */}
        {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-blue-500" /></div>
        ) : myAssets.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl bg-white/5">
                <p className="text-[#8A8F98]">You haven't launched any assets yet.</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {myAssets.map((asset) => (
                    <AdminAssetCard key={asset.address} asset={asset} />
                ))}
            </div>
        )}
      </main>
    </div>
  );
}

// Sub-Component: The Card
const AdminAssetCard = ({ asset }: { asset: any }) => {
    return (
        <div className="p-6 rounded-2xl bg-[#0F1115] border border-white/10 hover:border-white/20 transition-all group">
            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold border border-blue-500/20">
                        {asset.symbol ? String(asset.symbol).slice(0,2) : "AS"}
                    </div>
                    <div>
                        <h3 className="font-medium text-white text-lg">{asset.name ? String(asset.name) : "Loading..."}</h3>
                        <div className="text-xs text-[#8A8F98] font-mono">{asset.address.slice(0,6)}...{asset.address.slice(-4)}</div>
                    </div>
                </div>
                <div className="px-2 py-1 rounded bg-green-500/10 text-green-400 text-xs font-bold border border-green-500/20">
                    ACTIVE
                </div>
            </div>

            <div className="flex gap-2">
                <Link href={`/admin/${asset.address}`} className="w-full">
                    <button className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                        <Wallet className="w-4 h-4" /> Manage Funds
                    </button>
                </Link>
                <Link href={`/asset/${asset.address}`}>
                    <button className="py-3 px-4 bg-white/5 text-white font-bold rounded-lg hover:bg-white/10 transition-colors border border-white/10">
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </Link>
            </div>
        </div>
    )
}