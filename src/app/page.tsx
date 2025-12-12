import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { LiveFeed } from "@/components/LiveFeed";
import { Features } from "@/components/Features"; // Ensure you have this file from previous step
import { CallToAction } from "@/components/CallToAction";
import { Wallet, TrendingUp, DollarSign, ArrowRight, Building2, Palette, Briefcase, Plus, ChevronDown } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B0C0E] text-[#F7F8F8] relative selection:bg-blue-500/30">
      
      {/* 1. Global Texture & Background */}
      <div className="bg-noise fixed inset-0 opacity-20 pointer-events-none" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full -z-10 pointer-events-none" />
      
      {/* 2. Navigation */}
      <Navbar />
      
      {/* 3. Hero Section */}
      <Hero />
      
      {/* 4. How It Works (3 Steps) */}
      <HowItWorks />
      
      {/* 5. NEW: Use Cases (Replaces Marketplace) */}
      <UseCases />
      
      {/* 6. Technical Features (Bento Grid) */}
      <Features />
      
      {/* 7. Social Proof */}
      <LiveFeed />

      {/* 8. NEW: FAQ Section (More Content) */}
      <FAQ />
      
      {/* 9. Final CTA */}
      <CallToAction />
      
      {/* 10. Footer */}
      <footer className="py-12 border-t border-white/5 relative z-10 bg-[#08090A]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-sm text-[#8A8F98]">
                <span className="font-semibold text-white">AssetFlow</span> © 2025. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm text-[#8A8F98]">
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
                <a href="#" className="hover:text-white transition-colors">Docs</a>
            </div>
        </div>
      </footer>
    </main>
  );
}

// --- SUB-COMPONENT: HOW IT WORKS ---
const HowItWorks = () => {
  const steps = [
    {
      icon: <Wallet className="w-6 h-6 text-blue-400" />,
      title: "1. Connect Wallet",
      desc: "No account creation needed. Login instantly with MetaMask or Coinbase Wallet."
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-purple-400" />,
      title: "2. Buy Shares",
      desc: "Invest in high-value assets. Prices adjust dynamically based on real-time demand."
    },
    {
      icon: <DollarSign className="w-6 h-6 text-green-400" />,
      title: "3. Earn Yield",
      desc: "Claim rental income distributed in ETH directly to your wallet, or sell anytime."
    }
  ];

  return (
    <section className="py-24 border-y border-white/5 bg-white/[0.02] relative z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
           <h2 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-3">Simple Process</h2>
           <h3 className="text-3xl font-[family-name:var(--font-serif)] text-white">Start investing in minutes.</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
           {/* Connector Line */}
           <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-px bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-green-500/20" />

           {steps.map((step, i) => (
             <div key={i} className="relative group text-center">
                <div className="w-20 h-20 mx-auto bg-[#0F1115] border border-white/10 rounded-2xl flex items-center justify-center mb-6 shadow-2xl group-hover:border-white/20 transition-all relative z-10">
                   {step.icon}
                </div>
                <h3 className="text-lg font-medium text-white mb-2">{step.title}</h3>
                <p className="text-sm text-[#8A8F98] max-w-xs mx-auto leading-relaxed">{step.desc}</p>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};

// --- SUB-COMPONENT: USE CASES (Replaces Trending Assets) ---
const UseCases = () => {
    const cases = [
        {
            title: "Real Estate",
            desc: "Fractionalize ownership of commercial and residential properties. Earn rent without the hassle of management.",
            icon: <Building2 className="w-6 h-6 text-white" />,
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop"
        },
        {
            title: "Fine Art",
            desc: "Own shares of blue-chip artwork from Banksy to Basquiat. Democratizing access to the $65B art market.",
            icon: <Palette className="w-6 h-6 text-white" />,
            image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2545&auto=format&fit=crop"
        },
        {
            title: "Private Equity",
            desc: "Invest in pre-IPO startups and private companies. Access high-growth opportunities previously reserved for VCs.",
            icon: <Briefcase className="w-6 h-6 text-white" />,
            image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop"
        }
    ];

    return (
        <section className="py-32 px-4 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                <div className="max-w-2xl">
                    <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-serif)] text-white mb-6">
                        Tokenize Everything.
                    </h2>
                    <p className="text-[#8A8F98] text-lg">
                        AssetFlow isn't just for houses. Our protocol is agnostic, allowing any real-world asset to be brought on-chain with instant liquidity.
                    </p>
                </div>
                <Link href="/create">
                    <button className="px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors flex items-center gap-2">
                        Create Asset <ArrowRight className="w-4 h-4" />
                    </button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {cases.map((item, i) => (
                    <div key={i} className="group relative rounded-3xl overflow-hidden aspect-[3/4] border border-white/10">
                        <Image 
                            src={item.image} 
                            alt={item.title} 
                            fill 
                            className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-40"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                        
                        <div className="absolute bottom-0 left-0 p-8 w-full">
                            <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center mb-6 border border-white/20">
                                {item.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                            <p className="text-[#8A8F98] leading-relaxed mb-6">
                                {item.desc}
                            </p>
                            <span className="text-sm font-medium text-white border-b border-white/30 pb-1 group-hover:border-white transition-colors">
                                Learn more
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

// --- SUB-COMPONENT: FAQ (New Content) ---
const FAQ = () => {
    const questions = [
        {
            q: "How is the price determined?",
            a: "We use a linear bonding curve algorithm. As demand increases (more people buy), the price of the next share increases slightly. This ensures there is always instant liquidity for sellers, as the contract effectively acts as the market maker."
        },
        {
            q: "Can I sell my shares at any time?",
            a: "Yes. Unlike traditional real estate which can take months to sell, AssetFlow allows you to sell your shares back to the protocol instantly. The sale price is determined by the current position on the bonding curve."
        },
        {
            q: "How do I receive rental income?",
            a: "If an asset generates revenue (like rent), the asset manager deposits ETH into the smart contract. You can claim your pro-rata share of these dividends at any time via your Dashboard. The smart contract calculates exactly how much you are owed based on your share count."
        },
        {
            q: "Is my investment secure?",
            a: "All transactions happen on the Ethereum Sepolia testnet. Ownership is recorded immutably on the blockchain. However, as this is a demo application, please do not use real funds."
        }
    ];

    return (
        <section className="py-24 px-4 max-w-4xl mx-auto">
            <h2 className="text-3xl font-[family-name:var(--font-serif)] text-white text-center mb-16">
                Frequently Asked Questions
            </h2>
            <div className="space-y-4">
                {questions.map((item, i) => (
                    <details key={i} className="group bg-[#0F1115] border border-white/5 rounded-2xl open:border-white/10 transition-colors">
                        <summary className="flex justify-between items-center p-6 cursor-pointer list-none text-lg font-medium text-white">
                            {item.q}
                            <ChevronDown className="w-5 h-5 text-[#8A8F98] group-open:rotate-180 transition-transform" />
                        </summary>
                        <div className="px-6 pb-6 text-[#8A8F98] leading-relaxed">
                            {item.a}
                        </div>
                    </details>
                ))}
            </div>
        </section>
    )
}