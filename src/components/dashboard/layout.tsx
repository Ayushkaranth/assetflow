import { Navbar } from "../Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#08090A] text-[#ECECEC] relative selection:bg-blue-500/30">
      {/* 1. Global Texture (Same as landing) */}
      <div 
        className="fixed inset-0 z-0 opacity-20 pointer-events-none"
        style={{
             backgroundImage: `linear-gradient(#222 1px, transparent 1px), linear-gradient(90deg, #222 1px, transparent 1px)`,
             backgroundSize: '40px 40px',
             maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
        }}
      />
      <div className="bg-noise" />

      {/* 2. Reuse Navbar but we might swap buttons later */}
      <Navbar />

      <main className="relative z-10 pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
}