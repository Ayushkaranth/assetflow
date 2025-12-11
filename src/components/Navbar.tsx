"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Command, LayoutGrid, PieChart, PlusCircle, Settings } from "lucide-react"; // Updated Icons
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { CommandMenu } from "./CommandMenu"; 

export const Navbar = () => {
  const [openCommand, setOpenCommand] = useState(false);

  return (
    <>
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="
            flex items-center gap-2 md:gap-6 
            pl-4 pr-2 py-2 
            bg-[#0F1115]/80 backdrop-blur-xl 
            border border-white/10 
            rounded-full 
            shadow-[0_0_20px_-10px_rgba(255,255,255,0.1)]
          "
        >
          {/* 1. Logo Section */}
          <Link href="/" className="flex items-center gap-2 pr-4 md:border-r border-white/10 hover:opacity-80 transition-opacity">
            <div className="w-5 h-5 rounded-full bg-gradient-to-t from-blue-600 to-purple-600 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
            <span className="text-sm font-semibold tracking-tight text-white hidden md:block">
              AssetFlow
            </span>
          </Link>

          {/* 2. Navigation Links (Desktop) - UPDATED LINKS */}
          <div className="hidden md:flex items-center gap-6 text-[13px] font-medium text-[#8A8F98]">
            <Link href="/market" className="hover:text-white transition-colors flex items-center gap-2">
              <LayoutGrid className="w-3.5 h-3.5" />
              Market
            </Link>
            <Link href="/dashboard" className="hover:text-white transition-colors flex items-center gap-2">
              <PieChart className="w-3.5 h-3.5" />
              Dashboard
            </Link>
            <Link href="/create" className="hover:text-white transition-colors flex items-center gap-2">
              <PlusCircle className="w-3.5 h-3.5" />
              Create
            </Link>
             <Link href="/admin" className="hover:text-white transition-colors flex items-center gap-2">
              <Settings className="w-3.5 h-3.5" />
              Admin
            </Link>
          </div>

          {/* 3. Actions (Right Side) */}
          <div className="flex items-center gap-2 pl-2">
            
            {/* Command Menu Trigger */}
            <button 
              onClick={() => setOpenCommand(true)}
              className="
                p-2 md:px-3 md:py-1.5 
                rounded-full md:rounded-lg 
                hover:bg-white/5 
                text-[#8A8F98] hover:text-white 
                transition-all 
                flex items-center gap-2 
                group border border-transparent hover:border-white/5
              "
            >
              <Command className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="hidden md:block text-[10px] font-mono opacity-50 bg-white/5 px-1.5 rounded border border-white/5">
                ⌘K
              </span>
            </button>

            {/* RainbowKit Wallet Connect Button */}
            <div className="flex items-center">
              <ConnectButton.Custom>
                {({
                  account,
                  chain,
                  openAccountModal,
                  openChainModal,
                  openConnectModal,
                  authenticationStatus,
                  mounted,
                }) => {
                  const ready = mounted && authenticationStatus !== 'loading';
                  const connected =
                    ready &&
                    account &&
                    chain &&
                    (!authenticationStatus ||
                      authenticationStatus === 'authenticated');

                  return (
                    <div
                      {...(!ready && {
                        'aria-hidden': true,
                        'style': {
                          opacity: 0,
                          pointerEvents: 'none',
                          userSelect: 'none',
                        },
                      })}
                    >
                      {(() => {
                        if (!connected) {
                          return (
                            <button 
                              onClick={openConnectModal} 
                              className="
                                flex items-center gap-2 
                                bg-white text-black 
                                text-[12px] font-semibold 
                                px-4 py-2 
                                rounded-full 
                                hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] 
                                hover:scale-105
                                transition-all
                              "
                            >
                              Connect Wallet
                            </button>
                          );
                        }

                        if (chain.unsupported) {
                          return (
                            <button onClick={openChainModal} className="px-3 py-1.5 rounded-full bg-red-500/10 text-red-400 text-xs border border-red-500/20">
                              Wrong network
                            </button>
                          );
                        }

                        return (
                          <div className="flex gap-2">
                            <button
                              onClick={openAccountModal}
                              className="
                                flex items-center gap-2 
                                bg-[#1A1D21] border border-white/10 
                                text-white text-[12px] font-medium 
                                px-3 py-1.5 
                                rounded-full 
                                hover:bg-[#202328] transition-colors
                              "
                            >
                              {account.displayName}
                              {account.displayBalance
                                ? ` (${account.displayBalance})`
                                : ''}
                            </button>
                          </div>
                        );
                      })()}
                    </div>
                  );
                }}
              </ConnectButton.Custom>
            </div>
          </div>
        </motion.nav>
      </div>

      {/* Render the Command Menu Modal */}
      <CommandMenu open={openCommand} setOpen={setOpenCommand} />
    </>
  );
};