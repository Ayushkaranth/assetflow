"use client";
import React from "react";
import { ArrowRight } from "lucide-react";

export const CallToAction = () => {
  return (
    <section className="py-40 px-4 text-center relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-5xl md:text-8xl font-[family-name:var(--font-serif)] text-white mb-8 tracking-tight">
          Ready to own <br /> the world?
        </h2>
        
        <p className="text-xl text-[#8A8F98] mb-12 max-w-xl mx-auto">
          Join 14,000+ investors diversifying their portfolio with high-yield real world assets today.
        </p>

        <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-semibold text-lg hover:bg-gray-200 transition-all">
          Create Account
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};