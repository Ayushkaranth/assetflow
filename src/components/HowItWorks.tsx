"use client";
import React from "react";
import { Wallet, PieChart, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: <Wallet className="w-6 h-6 text-blue-400" />,
    title: "Connect & Verify",
    desc: "Link your wallet. Our automated ZK-proof system verifies your identity in seconds without storing data.",
  },
  {
    icon: <PieChart className="w-6 h-6 text-purple-400" />,
    title: "Select Fractions",
    desc: "Browse high-yield assets. Buy as little as $50 of a Miami penthouse or a vintage Ferrari.",
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-green-400" />,
    title: "Earn & Trade",
    desc: "Receive weekly rental dividends directly to your wallet. Sell your shares instantly on our secondary market.",
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-24 border-t border-white/5 bg-[#0F1012]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          
          {/* Connecting Line (Desktop only) */}
          <div className="hidden md:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {steps.map((step, idx) => (
            <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
              {/* Icon Circle */}
              <div className="w-24 h-24 rounded-full bg-[#15171B] border border-white/10 flex items-center justify-center mb-6 group-hover:border-white/20 transition-colors shadow-2xl shadow-black/50">
                {step.icon}
              </div>
              
              <h3 className="text-xl font-[family-name:var(--font-serif)] text-white mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-[#8A8F98] max-w-xs leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};