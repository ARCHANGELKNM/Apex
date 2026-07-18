"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Folder,
  Settings,
  Terminal,
  Flame,
  MessagesSquare,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";



export default function Sidebar({user}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isActive = (path) => pathname === path;

  return (
    <>
      {/* 📱 MOBILE NAVIGATION TRIGGER BAR (Hidden on Desktop) */}
      <div className="md:hidden w-full bg-white border-b-4 border-black p-3 flex items-center justify-between sticky top-0 z-50 shrink-0">
        <div className="border-2 border-black bg-yellow-300 px-2 py-0.5 font-black text-sm shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
          APEX
        </div>
        <Button
          variant="outline"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="border-2 border-black h-9 w-9 p-0 flex items-center justify-center bg-white shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]"
        >
          {mobileOpen ? (
            <X className="w-4 h-4 stroke-[2.5]" />
          ) : (
            <Menu className="w-4 h-4 stroke-[2.5]" />
          )}
        </Button>
      </div>

      {/* 🖥️ DESKTOP HOVER SIDEBAR + MOBILE FLYOUT SLATE */}
      <aside
        className={`
          /* Structural Layout Core Pinned Settings */
          fixed md:sticky top-0 left-0 h-screen z-40 bg-white flex flex-col justify-between border-black transition-all duration-200 ease-in-out shrink-0
          
          /* Desktop Behavior: Compact like VS Code, expands natively on Hover */
          hidden md:flex border-r-4 w-[56px] hover:w-64 p-2 hover:p-5 group/sidebar
          
          /* Mobile Overrides: Controlled exclusively via state toggle click */
          ${mobileOpen ? "flex w-64 p-5 border-r-4 border-b-4" : "max-md:hidden"}
        `}
      >
        <div className="space-y-6 overflow-x-hidden w-full">
          {/* 1. App Logo Module Block */}
          <div className="w-full flex items-center">
            {/* Collapsed state placeholder view */}
            <div className="border-2 border-black bg-yellow-300 h-9 w-9 flex items-center justify-center font-black text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] select-none text-black shrink-0 group-hover/sidebar:hidden max-md:hidden">
              A
            </div>
            {/* Expanded state / Mobile header view */}
            <div className="border-2 border-black bg-yellow-300 px-3 py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-center w-full hidden group-hover/sidebar:block max-md:block animate-in fade-in duration-100">
              <h1 className="text-xl font-black tracking-tighter uppercase text-black">
                APEX
              </h1>
            </div>
          </div>

          {/* 2. Gamified Daily Streak Module Block */}
          <div className="border-2 border-black bg-[#F1EFE6] p-1.5 group-hover/sidebar:p-2.5 text-center transition-all w-full flex flex-col items-center justify-center">
            <div className="flex items-center justify-center gap-1 bg-orange-400 text-black border-2 border-black h-9 w-9 group-hover/sidebar:w-full group-hover/sidebar:h-auto py-1 px-1.5 font-mono text-xs font-black uppercase shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] max-md:w-full max-md:h-auto shrink-0">
              <Flame className="w-4 h-4 fill-black shrink-0" />
              <span className="hidden group-hover/sidebar:inline max-md:inline ml-0.5">
                05 Days
              </span>
            </div>
            <p className="font-mono text-[9px] font-bold text-slate-500 uppercase mt-1.5 tracking-tight hidden group-hover/sidebar:block max-md:block whitespace-nowrap">
              Alex // Rank: Prince
            </p>
          </div>

          {/* 3. Navigation Anchor Links Matrix Array */}

          <nav className="flex flex-col gap-3 w-full">
            <Link
              href="/chat"
              className="w-full"
              onClick={() => setMobileOpen(false)}
            >
              <Button
                variant={isActive("/dashboard") ? "default" : "outline"}
                className={`w-full font-black text-xs uppercase border-2 border-black h-11 p-0 group-hover/sidebar:px-3 max-md:px-3 ${
                  isActive("/dashboard") ? "bg-cyan-300" : "bg-white"
                } justify-center group-hover/sidebar:justify-start max-md:justify-start`}
              >
                <MessagesSquare className="w-4 h-4 stroke-[2.5] shrink-0" />
                <span className="hidden group-hover/sidebar:inline max-md:inline ml-2">
                  Chat
                </span>
              </Button>
            </Link>

            <Link
              href="/userdashboard"
              className="w-full"
              onClick={() => setMobileOpen(false)}
            >
              <Button
                variant={isActive("/dashboard") ? "default" : "outline"}
                className={`w-full font-black text-xs uppercase border-2 border-black h-11 p-0 group-hover/sidebar:px-3 max-md:px-3 ${
                  isActive("/dashboard") ? "bg-cyan-300" : "bg-white"
                } justify-center group-hover/sidebar:justify-start max-md:justify-start`}
              >
                <LayoutDashboard className="w-4 h-4 stroke-[2.5] shrink-0" />
                <span className="hidden group-hover/sidebar:inline max-md:inline ml-2">
                  Dashboard
                </span>
              </Button>
            </Link>

            <Link
              href="/workspace"
              className="w-full"
              onClick={() => setMobileOpen(false)}
            >
              <Button
                variant={isActive("/workspace") ? "default" : "outline"}
                className={`w-full font-black text-xs uppercase border-2 border-black h-11 p-0 group-hover/sidebar:px-3 max-md:px-3 ${
                  isActive("/workspace") ? "bg-purple-300" : "bg-white"
                } justify-center group-hover/sidebar:justify-start max-md:justify-start`}
              >
                <Folder className="w-4 h-4 stroke-[2.5] shrink-0" />
                <span className="hidden group-hover/sidebar:inline max-md:inline ml-2">
                  Workspace
                </span>
              </Button>
            </Link>

            <Link
              href="/settings"
              className="w-full"
              onClick={() => setMobileOpen(false)}
            >
              <Button
                variant={isActive("/settings") ? "default" : "outline"}
                className={`w-full font-black text-xs uppercase border-2 border-black h-11 p-0 group-hover/sidebar:px-3 max-md:px-3 ${
                  isActive("/settings") ? "bg-emerald-300" : "bg-white"
                } justify-center group-hover/sidebar:justify-start max-md:justify-start`}
              >
                <Settings className="w-4 h-4 stroke-[2.5] shrink-0" />
                <span className="hidden group-hover/sidebar:inline max-md:inline ml-2">
                  Settings
                </span>
              </Button>
            </Link>
          </nav>
        </div>

        {/* 4. Bottom Profile Section (Replaces Github block) */}
        <div className="pt-4 border-t-2 border-black border-dashed mt-6 w-full flex flex-col gap-3">
          {/* User Profile Avatar Frame */}
          <div className="w-full flex items-center justify-center group-hover/sidebar:justify-start max-md:justify-start gap-3">
            <img
              src={
                user?.picture ||
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
              }
              alt="User profile avatar"
              className="w-9 h-9 border-2 border-black bg-purple-300 shadow-[1.5px_1.5px_0px_0px_#000] object-cover shrink-0 select-none"
            />
            <div className="hidden group-hover/sidebar:block max-md:block text-left font-mono leading-none truncate">
              {/* Display Real Name */}
              <p className="text-xs font-black uppercase text-black truncate">
                {user?.given_name || "Student"}
              </p>

              {/* Logout Trigger */}
              <LogoutLink className="text-[9px] font-bold text-red-500 uppercase hover:underline cursor-pointer">
                [LOG OUT]
              </LogoutLink>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
