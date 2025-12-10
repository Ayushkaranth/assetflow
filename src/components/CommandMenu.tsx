"use client";
import React, { useEffect, useState } from "react";
import { Command } from "cmdk";
import { Search, LayoutDashboard, Home, Wallet, FileText, X } from "lucide-react";
import { useRouter } from "next/navigation";

export const CommandMenu = ({ open, setOpen }: { open: boolean, setOpen: (v: boolean) => void }) => {
  const router = useRouter();

  // Toggle with Cmd+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, setOpen]);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={() => setOpen(false)}
      />
      
      {/* The Palette */}
      <div className="relative w-full max-w-lg bg-[#15171B] border border-white/10 rounded-xl shadow-2xl shadow-black/50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <Command label="Command Menu" className="bg-transparent">
          
          {/* Search Input */}
          <div className="flex items-center border-b border-white/10 px-4">
            <Search className="w-5 h-5 text-[#8A8F98]" />
            <Command.Input 
              placeholder="Type a command or search..."
              className="w-full bg-transparent p-4 text-white placeholder-[#8A8F98] focus:outline-none text-sm font-medium"
            />
            <button onClick={() => setOpen(false)} className="p-1 rounded hover:bg-white/10 text-[#8A8F98]">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Results List */}
          <Command.List className="max-h-[300px] overflow-y-auto p-2 no-scrollbar">
            <Command.Empty className="p-4 text-center text-sm text-[#8A8F98]">
              No results found.
            </Command.Empty>

            <Command.Group heading="Navigation" className="text-[10px] uppercase text-[#8A8F98] font-medium tracking-wider mb-2 px-2">
              <Command.Item 
                onSelect={() => runCommand(() => router.push('/dashboard'))}
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm text-white cursor-pointer aria-selected:bg-blue-600/20 aria-selected:text-blue-400 transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </Command.Item>
              <Command.Item 
                onSelect={() => runCommand(() => router.push('/market'))}
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm text-white cursor-pointer aria-selected:bg-blue-600/20 aria-selected:text-blue-400 transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>Marketplace</span>
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Assets" className="text-[10px] uppercase text-[#8A8F98] font-medium tracking-wider mb-2 px-2 mt-2">
              <Command.Item 
                onSelect={() => runCommand(() => router.push('/asset/penthouse'))}
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm text-white cursor-pointer aria-selected:bg-blue-600/20 aria-selected:text-blue-400 transition-colors"
              >
                <div className="w-4 h-4 rounded-sm bg-purple-500/20 border border-purple-500/50" />
                <span>Penthouse 432 Park</span>
              </Command.Item>
              <Command.Item 
                onSelect={() => runCommand(() => router.push('/asset/rolex'))}
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm text-white cursor-pointer aria-selected:bg-blue-600/20 aria-selected:text-blue-400 transition-colors"
              >
                <div className="w-4 h-4 rounded-sm bg-yellow-500/20 border border-yellow-500/50" />
                <span>Rolex Daytona</span>
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Actions" className="text-[10px] uppercase text-[#8A8F98] font-medium tracking-wider mb-2 px-2 mt-2">
               <Command.Item 
                 className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm text-white cursor-pointer aria-selected:bg-blue-600/20 aria-selected:text-blue-400 transition-colors"
               >
                 <Wallet className="w-4 h-4" />
                 <span>Connect Wallet</span>
               </Command.Item>
               <Command.Item 
                 onSelect={() => runCommand(() => router.push('/protocol'))}
                 className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm text-white cursor-pointer aria-selected:bg-blue-600/20 aria-selected:text-blue-400 transition-colors"
               >
                 <FileText className="w-4 h-4" />
                 <span>Read Documentation</span>
               </Command.Item>
            </Command.Group>

          </Command.List>
          
          <div className="border-t border-white/5 px-4 py-2 flex justify-between items-center bg-black/20">
             <span className="text-[10px] text-[#8A8F98]">Search for anything</span>
             <div className="flex gap-2">
                <span className="text-[10px] text-[#8A8F98] bg-white/5 px-1.5 py-0.5 rounded">↑↓ to navigate</span>
                <span className="text-[10px] text-[#8A8F98] bg-white/5 px-1.5 py-0.5 rounded">↵ to select</span>
             </div>
          </div>

        </Command>
      </div>
    </div>
  );
};