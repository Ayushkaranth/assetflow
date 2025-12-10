"use client";
import React from "react";
import { Navbar } from "@/components/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#08090A] text-[#ECECEC] relative selection:bg-blue-500/30">
      
      {/* 1. The Global Texture (So dashboard matches landing) */}
      <div 
        className="fixed inset-0 z-0 opacity-20 pointer-events-none"
        style={{
             backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`,
             backgroundSize: '40px 40px',
             maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
        }}
      />
      {/* Texture Grain */}
      <div className="fixed inset-0 z-0 opacity-05 pointer-events-none bg-noise" />

      {/* 2. THE MISSING NAVBAR */}
      <Navbar />

      {/* 3. Main Content Wrapper */}
      {/* We add 'pt-32' (Padding Top) so the content doesn't hide behind the floating navbar */}
      <main className="relative z-10 pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
}