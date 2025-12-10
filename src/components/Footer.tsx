import React from "react";

export const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-[#0B0C0E] py-12 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
           <div className="w-4 h-4 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full blur-[1px]" />
           <span className="font-serif text-white text-lg">AssetFlow</span>
        </div>
        
        <div className="text-[#8A8F98] text-sm flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Legal</a>
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-white transition-colors">GitHub</a>
        </div>
        
        <div className="text-[#8A8F98] text-xs">
          © 2025 AssetFlow Protocol.
        </div>
      </div>
    </footer>
  );
};