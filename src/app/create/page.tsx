"use client";
import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Rocket, Upload, DollarSign, Tag, ArrowRight, Loader2, Image as ImageIcon, AlertCircle } from "lucide-react";
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi';
import { parseEther } from 'viem';
import { FACTORY_ADDRESS, FACTORY_ABI } from '@/constants/contracts';
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CreateListingPage() {
  const router = useRouter();
  const { isConnected } = useAccount();
  
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    totalValuation: "",
    sharePrice: "",
  });
  
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string>("");
  const [uploadError, setUploadError] = useState(""); // New Error State

  const { data: hash, writeContract, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setUploadError(""); // Clear errors
    }
  };

  const uploadToPinata = async () => {
    if (!file) return null;
    setUploading(true);
    setUploadError("");

    try {
      console.log("Starting Pinata Upload...");
      const data = new FormData();
      data.set("file", file);
      
      const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
        method: "POST",
        headers: {
          // IMPORTANT: Check your .env file for NEXT_PUBLIC_PINATA_JWT
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
        },
        body: data,
      });

      const json = await res.json();
      console.log("Pinata Response:", json);

      if (!res.ok) {
        throw new Error(json.error?.details || "Pinata API Error");
      }

      if (!json.IpfsHash) {
        throw new Error("No IPFS Hash received");
      }

      setUploading(false);
      return `https://gateway.pinata.cloud/ipfs/${json.IpfsHash}`;

    } catch (e: any) {
      console.error("Upload failed:", e);
      setUploading(false);
      setUploadError(e.message || "Image upload failed");
      return null;
    }
  };

  const handleSubmit = async () => {
     if (!isConnected) return alert("Connect Wallet first!");
     if (!formData.name || !formData.totalValuation) return alert("Fill details");
     if (!file) return alert("Please upload an image");

     // 1. Upload Image First
     const imageUrl = await uploadToPinata();
     
     // STOP HERE if upload failed
     if (!imageUrl) {
        alert("Image upload failed. Check console for details.");
        return;
     }

     console.log("Image Success:", imageUrl);
     console.log("Launching Asset on Blockchain...");

     // 2. Call Smart Contract
     writeContract({
        address: FACTORY_ADDRESS,
        abi: FACTORY_ABI,
        functionName: 'createAsset',
        args: [
           formData.name,
           formData.symbol,
           parseEther(formData.totalValuation), 
           parseEther(formData.sharePrice),
           imageUrl
        ]
     });
  };

  useEffect(() => {
     if (isConfirmed) {
        alert("Asset Launched Successfully! 🚀");
        router.push("/market"); 
     }
  }, [isConfirmed, router]);

  return (
    <div className="min-h-screen bg-[#08090A] text-[#ECECEC] selection:bg-purple-500/30">
      <Navbar />
      <div className="fixed inset-0 -z-10 opacity-20 pointer-events-none bg-noise" />

      <main className="relative z-10 pt-32 px-4 max-w-3xl mx-auto pb-20">
         
         <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-serif)] text-white mb-4">
               Tokenize a New Asset
            </h1>
         </div>

         <div className="bg-[#0F1115] border border-white/10 rounded-2xl p-8 shadow-2xl">
            <div className="space-y-8">
               
               {/* Image Upload Area */}
               <div className={`relative border border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer overflow-hidden group ${uploadError ? "border-red-500/50 bg-red-500/5" : "border-white/10 hover:bg-white/5"}`}>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                    className="absolute inset-0 opacity-0 cursor-pointer z-20"
                  />
                  
                  {preview ? (
                    <div className="relative h-64 w-full">
                       <Image src={preview} alt="Preview" fill className="object-cover rounded-lg" />
                       <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white font-medium">
                          Click to Change
                       </div>
                    </div>
                  ) : (
                    <div className="py-8">
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3 text-[#8A8F98]">
                            <ImageIcon className="w-6 h-6" />
                        </div>
                        <div className="text-sm font-medium text-white">Upload Asset Cover</div>
                    </div>
                  )}

                  {uploadError && (
                      <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-red-400 font-medium flex items-center justify-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {uploadError}
                      </div>
                  )}
               </div>

               {/* Inputs */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <label className="text-xs font-medium text-[#8A8F98]">Asset Name</label>
                     <input 
                        type="text" 
                        placeholder="e.g. Oceanfront Villa" 
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-medium text-[#8A8F98]">Symbol</label>
                     <input 
                        type="text" 
                        placeholder="PROP-01" 
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none uppercase"
                        value={formData.symbol}
                        onChange={(e) => setFormData({...formData, symbol: e.target.value})}
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-medium text-[#8A8F98]">Valuation (ETH)</label>
                     <input 
                        type="number" 
                        placeholder="0.1" 
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none"
                        value={formData.totalValuation}
                        onChange={(e) => setFormData({...formData, totalValuation: e.target.value})}
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-medium text-[#8A8F98]">Price Per Share (ETH)</label>
                     <input 
                        type="number" 
                        placeholder="0.001" 
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none"
                        value={formData.sharePrice}
                        onChange={(e) => setFormData({...formData, sharePrice: e.target.value})}
                     />
                  </div>
               </div>

               {/* Submit Button */}
               <button 
                  onClick={handleSubmit}
                  disabled={isPending || isConfirming || uploading}
                  className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
               >
                  {uploading ? "Uploading Image..." : isPending ? "Check Wallet..." : isConfirming ? "Confirming..." : "Launch Asset"}
               </button>
               
               {error && <p className="text-red-500 text-xs text-center">{error.message}</p>}

            </div>
         </div>
      </main>
    </div>
  );
}