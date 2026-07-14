"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderKanban, Settings } from "lucide-react";
// Official RetroUI sub-imports
import { Button } from "@/components/ui/button";
import "./globals.css";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isActive = (path) => pathname === path;

  return (
    <html lang="en">
      <body className="antialiased bg-[#F9F6EE] text-black min-h-screen selection:bg-yellow-300 font-sans">
        {/* Official RetroUI Thick-Border Sticky Navigation Header */}
        <header className="sticky top-4 max-w-5xl mx-auto z-50 px-4 mt-4">
          <nav
            variant="brutal"
            className="bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 flex items-center justify-between"
          >
         
              <Link href="/" className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-tighter uppercase bg-yellow-300 border-2 border-black px-2.5 py-0.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  APEX
                </span>
              </Link>
           

        
              <Link href="/dashboard">
                <Button
                  variant={isActive("/dashboard") ? "cyan" : "outline"}
                  className="font-black text-xs uppercase border-2 border-black"
                >
                  <LayoutDashboard className="w-4 h-4 mr-1 stroke-[2.5]" />
                  <span className="hidden md:inline">Dashboard</span>
                </Button>
              </Link>

              <Link href="/workspace">
                <Button
                  variant={isActive("/workspace") ? "purple" : "outline"}
                  className="font-black text-xs uppercase border-2 border-black"
                >
                  <FolderKanban className="w-4 h-4 mr-1 stroke-[2.5]" />
                  <span className="hidden md:inline">Workspace</span>
                </Button>
              </Link>

              <Link href="/settings">
                <Button
                  variant={isActive("/settings") ? "emerald" : "outline"}
                  className="font-black text-xs uppercase border-2 border-black"
                >
                  <Settings className="w-4 h-4 mr-1 stroke-[2.5]" />
                  <span className="hidden md:inline">Settings</span>
                </Button>
              </Link>
           
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <Button variant="pink" className="border-2 border-black p-2">
                i
              </Button>
            </a>
          </nav>
        </header>

        <main className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 mt-4">
          {children}
        </main>
      </body>
    </html>
  );
}
