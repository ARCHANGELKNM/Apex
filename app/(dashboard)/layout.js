'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from '@/components/nav-bar/Sidebar';
import { Badge } from "@/components/ui/badge";

export default function DashboardGroupLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen flex-col md:flex-row max-w-[1400px] mx-auto p-4 gap-6">
      
      {/* 1. Permanent Left-Aligned Sidebar Node */}
      <Sidebar />

      {/* 2. Main Content Frame Viewport */}
      <div className="flex-1 flex flex-col gap-6">
        
        {/* Universal Top Header Action Component */}
        <header className="border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 flex items-center justify-between z-30">
          <div className="flex items-center gap-2">
            <Badge variant="black" className="bg-black text-white text-[10px] font-mono font-bold uppercase py-0.5 px-2">
              LOC_ID: {pathname.replace('/', '').toUpperCase() || 'CORE'}
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-slate-500 hidden sm:inline">
              ARISTOTLE_ENGINE: RUNNING
            </span>
          </div>
        </header>

        {/* Dynamic Route Inner Element Pages */}
        <main className="flex-1">
          {children}
        </main>

      </div>

    </div>
  );
}

