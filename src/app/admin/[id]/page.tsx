"use client";
import React, { useEffect, useState, use } from "react"; 
import { Navbar } from "@/components/Navbar";
import { ShieldAlert, Wallet, Lock, Unlock, Download, ArrowLeft, Loader2, DollarSign, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useAccount, useReadContract, useWriteContract, useBalance, useWaitForTransactionReceipt } from 'wagmi';
import { ASSET_TOKEN_ABI } from '@/constants/contracts';
import { formatEther, parseEther } from "viem";

export default function AdminManagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const assetAddress = id as `0x${string}`;
  
  const { isConnected } = useAccount();
  const [rentAmount, setRentAmount] = useState(""); // State for rent input

  // Web3 Hooks
  const { writeContract, data: hash, isPending, error: writeError } = useWriteContract();
  const { isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  const { data: name } = useReadContract({
     address: assetAddress, abi: ASSET_TOKEN_ABI, functionName: 'name'
  });
  
  const { data: contractBalance, refetch: refetchBalance } = useBalance({
    address: assetAddress,
  });

  const { data: isSaleActive, refetch: refetchSale } = useReadContract({
    address: assetAddress, abi: ASSET_TOKEN_ABI, functionName: 'saleActive'
  });

  // Success Listener
  useEffect(() => {
     if (isConfirmed) {
        alert("Transaction Successful! Funds moved. 🚀");
        refetchBalance(); 
        refetchSale();
        setRentAmount(""); // Clear input
     }
     if (writeError) {
        console.error("Tx Error:", writeError);
        alert("Transaction Failed: " + (writeError as any).shortMessage || writeError.message);
     }
  }, [isConfirmed, writeError, refetchBalance, refetchSale]);

  // Handlers
  const handleWithdraw = () => {
    if (!contractBalance || contractBalance.value === BigInt(0)) return alert("Balance is 0");
    writeContract({ address: assetAddress, abi: ASSET_TOKEN_ABI, functionName: 'withdrawFunds' });
  };

  const handleToggleSale = () => {
    writeContract({ address: assetAddress, abi: ASSET_TOKEN_ABI, functionName: 'toggleSale' });
  };

  const handleDepositRent = () => {
    if (!rentAmount || Number(rentAmount) <= 0) return alert("Enter a valid ETH amount");
    console.log(`Depositing ${rentAmount} ETH as Rent...`);
    
    writeContract({ 
        address: assetAddress, 
        abi: ASSET_TOKEN_ABI, 
        functionName: 'depositRent',
        value: parseEther(rentAmount) 
    });
  };

  if (!isConnected) return <div className="text-white text-center pt-32">Connect Wallet</div>;

  return (
    <div className="min-h-screen bg-[#08090A] text-[#ECECEC] selection:bg-green-500/30">
      <Navbar />
      <div className="fixed inset-0 -z-10 opacity-20 pointer-events-none bg-noise" />

      <main className="relative z-10 pt-32 px-4 md:px-8 max-w-5xl mx-auto pb-20">
        
        <Link href="/admin" className="flex items-center gap-2 text-[#8A8F98] hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Console
        </Link>

        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
           <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <ShieldAlert className="w-6 h-6" />
           </div>
           <div>
              <h1 className="text-3xl font-[family-name:var(--font-serif)] text-white">
                {name ? String(name) : "Loading..."}
              </h1>
              <p className="text-[#8A8F98]">Manager Portal: <span className="font-mono text-xs">{assetAddress}</span></p>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           
           {/* Card 1: Withdraw Capital */}
           <div className="p-6 rounded-2xl bg-[#0F1115] border border-white/10 relative overflow-hidden group hover:border-white/20 transition-colors">
              <div className="absolute top-0 right-0 p-20 bg-blue-500/5 blur-[60px]" />
              <div className="relative z-10">
                 <div className="flex items-center gap-2 text-sm text-[#8A8F98] mb-4">
                    <Wallet className="w-4 h-4" /> Capital Raised
                 </div>
                 <div className="text-3xl font-mono font-medium text-white mb-6">
                    {contractBalance ? formatEther(contractBalance.value) : "0.00"} ETH
                 </div>
                 <button 
                    onClick={handleWithdraw}
                    disabled={isPending}
                    className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                 >
                    {isPending ? <Loader2 className="w-4 h-4 animate-spin"/> : <Download className="w-4 h-4" />}
                    Withdraw Capital
                 </button>
              </div>
           </div>

           {/* Card 2: YIELD MANAGER (NEW) */}
           <div className="p-6 rounded-2xl bg-[#0F1115] border border-white/10 relative overflow-hidden group hover:border-green-500/30 transition-colors">
              <div className="absolute top-0 right-0 p-20 bg-green-500/5 blur-[60px]" />
              <div className="relative z-10">
                 <div className="flex items-center gap-2 text-sm text-[#8A8F98] mb-4">
                    <TrendingUp className="w-4 h-4 text-green-400" /> Distribute Yield
                 </div>
                 
                 <div className="mb-4">
                    <div className="flex items-center gap-2 bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus-within:border-green-500/50 transition-colors">
                        <DollarSign className="w-4 h-4 text-[#8A8F98]" />
                        <input 
                            type="number" 
                            placeholder="0.05" 
                            value={rentAmount}
                            onChange={(e) => setRentAmount(e.target.value)}
                            className="w-full bg-transparent text-white focus:outline-none placeholder-white/20"
                        />
                        <span className="text-xs text-[#8A8F98] font-bold">ETH</span>
                    </div>
                 </div>

                 <button 
                    onClick={handleDepositRent}
                    disabled={isPending}
                    className="w-full py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                 >
                    {isPending ? "Processing..." : "Deposit Rent"}
                 </button>
                 <p className="text-[10px] text-[#8A8F98] mt-3 text-center">
                    Sends ETH to contract for users to claim.
                 </p>
              </div>
           </div>

           {/* Card 3: Emergency Controls */}
           <div className="p-6 rounded-2xl bg-[#0F1115] border border-white/10 relative overflow-hidden group hover:border-red-500/30 transition-colors">
              <div className="relative z-10">
                 <div className="flex items-center gap-2 text-sm text-[#8A8F98] mb-4">
                    <ShieldAlert className="w-4 h-4" /> Market Status
                 </div>
                 <div className={`text-xl font-bold mb-6 ${isSaleActive ? "text-green-400" : "text-red-400"}`}>
                    {isSaleActive ? "TRADING ACTIVE" : "PAUSED"}
                 </div>
                 <button 
                    onClick={handleToggleSale}
                    disabled={isPending}
                    className="w-full py-3 border border-white/10 hover:bg-white/5 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                 >
                    {isSaleActive ? <><Lock className="w-4 h-4" /> Pause</> : <><Unlock className="w-4 h-4" /> Resume</>}
                 </button>
              </div>
           </div>

        </div>
      </main>
    </div>
  );
}