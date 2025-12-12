"use client";
import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Rocket, Upload, DollarSign, Tag, ArrowRight, Loader2, Image as ImageIcon, AlertCircle, TrendingUp } from "lucide-react";
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi';
import { parseEther } from 'viem';
import { FACTORY_ADDRESS, FACTORY_ABI } from '@/constants/contracts';
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CreateListingPage() {
  const router = useRouter();
  const { isConnected } = useAccount();
  
  // State (Valuation is removed!)
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    basePrice: "", // Was "sharePrice"
  });
  
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string>("");
  const [uploadError, setUploadError] = useState("");

  const { data: hash, writeContract, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  // 1. Image Handling
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setUploadError("");
    }
  };

  const uploadToPinata = async () => {
    if (!file) return null;
    setUploading(true);
    setUploadError("");

    try {
      const data = new FormData();
      data.set("file", file);
      
      const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}` },
        body: data,
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error?.details || "Pinata Error");

      setUploading(false);
      return `https://gateway.pinata.cloud/ipfs/${json.IpfsHash}`;
    } catch (e: any) {
      console.error("Upload failed:", e);
      setUploading(false);
      setUploadError(e.message || "Upload failed");
      return null;
    }
  };

  // 2. Submit Logic
  const handleSubmit = async () => {
     if (!isConnected) return alert("Connect Wallet first!");
     if (!formData.name || !formData.symbol || !formData.basePrice) return alert("Fill all details");
     if (!file) return alert("Please upload an image");

     // Step A: Upload Image
     const imageUrl = await uploadToPinata();
     if (!imageUrl) return;

     console.log("Launching Bonding Curve Asset...");

     // Step B: Call Factory (Rocket V5)
     // Args: name, symbol, basePrice, metadataURI
     writeContract({
        address: FACTORY_ADDRESS,
        abi: FACTORY_ABI,
        functionName: 'createAsset',
        args: [
           formData.name,
           formData.symbol,
           parseEther(formData.basePrice), // Starting Price
           imageUrl
        ]
     });
  };

  useEffect(() => {
     if (isConfirmed) {
        alert("Dynamic Asset Launched! 🚀");
        router.push("/market"); 
     }
  }, [isConfirmed, router]);

  return (
    <div className="min-h-screen bg-[#08090A] text-[#ECECEC] selection:bg-purple-500/30">
      <Navbar />
      <div className="fixed inset-0 -z-10 opacity-20 pointer-events-none bg-noise" />

      <main className="relative z-10 pt-32 px-4 max-w-3xl mx-auto pb-20">
         
         <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/10 text-[11px] font-medium text-purple-400 mb-6">
              <TrendingUp className="w-3 h-3" />
              <span>DeFi Bonding Curve Mode</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-serif)] text-white mb-4">
               Launch Dynamic Asset
            </h1>
            <p className="text-[#8A8F98] max-w-lg mx-auto">
               Create an asset with algorithmic pricing. Prices will rise automatically as users buy shares.
            </p>
         </div>

         <div className="bg-[#0F1115] border border-white/10 rounded-2xl p-8 shadow-2xl">
            <div className="space-y-8">
               
               {/* Image Upload */}
               <div className={`relative border border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer overflow-hidden group ${uploadError ? "border-red-500/50" : "border-white/10 hover:bg-white/5"}`}>
                  <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer z-20" />
                  
                  {preview ? (
                    <div className="relative h-64 w-full">
                       <Image src={preview} alt="Preview" fill className="object-cover rounded-lg" unoptimized />
                    </div>
                  ) : (
                    <div className="py-8">
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3 text-[#8A8F98]">
                            <ImageIcon className="w-6 h-6" />
                        </div>
                        <div className="text-sm font-medium text-white">Upload Cover Image</div>
                    </div>
                  )}
                  {uploadError && <div className="text-red-400 text-xs mt-2">{uploadError}</div>}
               </div>

               {/* Form Inputs */}
               <div className="grid grid-cols-1 gap-6">
                  {/* Name & Symbol */}
                  <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-xs font-medium text-[#8A8F98]">Asset Name</label>
                         <input 
                            type="text" placeholder="e.g. Crypto Penthouse" 
                            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-purple-500/50"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                         />
                      </div>
                      <div className="space-y-2">
                         <label className="text-xs font-medium text-[#8A8F98]">Ticker Symbol</label>
                         <input 
                            type="text" placeholder="PENT" 
                            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-purple-500/50 uppercase"
                            value={formData.symbol}
                            onChange={(e) => setFormData({...formData, symbol: e.target.value})}
                         />
                      </div>
                  </div>

                  {/* Pricing */}
                  <div className="space-y-2">
                     <label className="text-xs font-medium text-[#8A8F98]">Starting Price (ETH)</label>
                     <div className="relative">
                        <input 
                            type="number" placeholder="0.001" 
                            className="w-full px-4 py-3 pl-10 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-purple-500/50"
                            value={formData.basePrice}
                            onChange={(e) => setFormData({...formData, basePrice: e.target.value})}
                        />
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8F98]" />
                     </div>
                     <p className="text-[10px] text-[#8A8F98]">
                        * This is the cost of the <strong>first share</strong>. Price will increase linearly as supply grows.
                     </p>
                  </div>
               </div>

               {/* Submit Button */}
               <button 
                  onClick={handleSubmit}
                  disabled={isPending || isConfirming || uploading}
                  className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
               >
                  {uploading ? "Uploading Image..." : isPending ? "Check Wallet..." : isConfirming ? "Confirming..." : "Launch Asset"}
                  {!uploading && !isPending && !isConfirming && <ArrowRight className="w-4 h-4" />}
               </button>

            </div>
         </div>
      </main>
    </div>
  );
}