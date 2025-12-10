import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { LiveFeed } from "@/components/LiveFeed";
import { Marketplace } from "@/components/Marketplace";
import { Features } from "@/components/Features";
import { CallToAction } from "@/components/CallToAction";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B0C0E] text-[#F7F8F8] relative selection:bg-blue-500/30">
      
      {/* 1. Global Texture */}
      <div className="bg-noise" />
      
      {/* 2. Navigation */}
      <Navbar />
      
      {/* 3. Hero Section (The Hook) */}
      <Hero />
      
      {/* 4. Social Proof (Ticker) */}
      <LiveFeed />
      
      {/* 5. The Product (Grid) */}
      <Marketplace />
      
      {/* 6. The "Why" (Bento Grid) */}
      <Features />
      
      {/* 7. Final Push */}
      <CallToAction />
      
      {/* 8. Simple Footer */}
      <footer className="py-12 text-center text-[#8A8F98] text-sm border-t border-white/5">
        <p>© 2025 AssetFlow Protocol. Built with Next.js & Solidity.</p>
      </footer>
    </main>
  );
}