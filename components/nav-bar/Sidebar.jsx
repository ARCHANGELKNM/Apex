'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FileText, Settings, Flame, FolderKanban , Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  const pathname = usePathname();
  const isActive = (path) => pathname === path;

  return (
    <aside className="w-full md:w-64 shrink-0 border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-5 flex flex-col justify-between h-fit md:h-[94vh] md:sticky md:top-4 z-40">
      
      <div className="space-y-6">
        {/* App Identity Branding Banner */}
        <div className="border-2 border-black bg-yellow-300 p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-center">
          <h1 className="text-3xl font-black tracking-tighter uppercase text-black">APEX</h1>
          <span className="font-mono text-[10px] font-bold text-slate-600 block">[SYSTEM_CORE_ACTIVE]</span>
        </div>

        {/* User Metric Block Widget */}
        <div className="border-2 border-black bg-[#F1EFE6] p-3 text-center space-y-2">
          <div className="flex items-center justify-center gap-1 bg-orange-400 text-black border-2 border-black py-0.5 px-2 font-mono text-xs font-black uppercase">
            <Flame className="w-3.5 h-3.5 fill-black" />
            <span>Streak: 05 Days</span>
          </div>
          <p className="font-mono text-[10px] font-bold text-slate-500 uppercase">Alex // Rank: Prince</p>
        </div>

        {/* Vertical Navigation Links referencing layout paths */}
        <div className="flex flex-col gap-2.5 pt-2">
          <Link href="/dashboard" className="w-full">
            <Button 
              variant={isActive('/dashboard') ? "default" : "outline"} 
              className={`w-full justify-start font-black text-xs uppercase border-2 border-black h-11 ${isActive('/dashboard') ? 'bg-cyan-300' : 'bg-white'}`}
            >
              <FileText className="w-4 h-4 mr-2 stroke-[2.5]" />
              Dashboard
            </Button>
          </Link>

          <Link href="/workspace" className="w-full">
            <Button 
              variant={isActive('/workspace') ? "default" : "outline"} 
              className={`w-full justify-start font-black text-xs uppercase border-2 border-black h-11 ${isActive('/workspace') ? 'bg-purple-300' : 'bg-white'}`}
            >
              <FolderKanban className="w-4 h-4 mr-2 stroke-[2.5]" />
              Workspace
            </Button>
          </Link>

          <Link href="/settings" className="w-full">
            <Button 
              variant={isActive('/settings') ? "default" : "outline"} 
              className={`w-full justify-start font-black text-xs uppercase border-2 border-black h-11 ${isActive('/settings') ? 'bg-emerald-300' : 'bg-white'}`}
            >
              <Settings className="w-4 h-4 mr-2 stroke-[2.5]" />
              Settings
            </Button>
          </Link>
        </div>
      </div>

      {/* Sidebar Technical Open Source Footer */}
      <div className="pt-4 border-t-2 border-black border-dashed mt-6 space-y-3 hidden md:block">
        <div className="flex items-center gap-2 font-mono text-[9px] font-bold text-slate-400 uppercase">
          <Terminal className="w-3.5 h-3.5" />
          <span>Runtime: Turbopack</span>
        </div>
        <a href="https://github.com" target="_blank" rel="noreferrer" className="block w-full">
          <Button variant="outline" className="w-full font-black text-xs uppercase border-2 border-black bg-pink-300 h-9 flex items-center justify-center">

            Open Source Repo
          </Button>
        </a>
      </div>

    </aside>
  );
}

