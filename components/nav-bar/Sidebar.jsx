"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Folder,
  Settings,
  Flame,
  MessagesSquare,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default function Sidebar({ user }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const closeButtonRef = useRef(null);

  const isActive = (path) => pathname === path;

  useEffect(() => {
    if (typeof window === "undefined") return;

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingUp = currentScrollY < lastScrollY;

      setShowHeader(scrollingUp || currentScrollY < 24);
      lastScrollY = currentScrollY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    if (mobileOpen) {
      document.addEventListener("keydown", handleKey);
      setTimeout(() => closeButtonRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <div className="md:hidden w-full bg-white border-b-4 border-black px-4 py-3 flex flex-row items-center justify-between z-50 h-18 box-border">
        <div className="border-2 border-black bg-yellow-300 px-3 py-1 font-black text-sm shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] tracking-tighter uppercase text-black select-none">
          APEX
        </div>
        <Button
          variant="outline"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-controls="apex-sidebar"
          className="border-2 border-black h-11 w-11 p-0 flex items-center justify-center bg-white shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] hover:bg-slate-100 active:translate-x-px active:translate-y-px active:shadow-none transition-all"
        >
          {mobileOpen ? (
            <X className="w-5 h-5 stroke-[2.5] text-black" />
          ) : (
            <Menu className="w-5 h-5 stroke-[2.5] text-black" />
          )}
        </Button>
      </div>

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        id="apex-sidebar"
        className={`
          fixed top-0 left-0 z-50 h-screen w-72 max-w-[85vw] bg-white flex flex-col justify-between border-r-4 border-black transition-transform duration-200 ease-in-out
          md:static md:z-30 md:w-16 md:max-w-none md:hover:w-64 md:translate-x-0 md:border-r-4 md:p-2 md:flex
          p-6 group/sidebar ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="space-y-4 overflow-x-hidden w-full">
          <div
            className={`w-full flex items-center justify-start overflow-hidden transition-all duration-200 ease-out ${
              showHeader
                ? "max-h-14 opacity-100 translate-y-0"
                : "max-h-0 opacity-0 -translate-y-2 md:max-h-0"
            }`}
          >
            <div className="border-2 border-black bg-yellow-300 h-9 w-9 flex items-center justify-center font-black text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] select-none text-black shrink-0 group-hover/sidebar:md:hidden max-md:hidden">
              A
            </div>
            <div className="border-2 border-black bg-yellow-300 px-3 py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-center w-full md:hidden group-hover/sidebar:md:block max-md:block animate-in fade-in duration-100">
              <h1 className="text-xl font-black tracking-tighter uppercase text-black">
                APEX
              </h1>
            </div>
          </div>

          <div className="border-2 border-black bg-[#F1EFE6] p-2 text-center transition-all w-full flex flex-col items-center justify-center">
            <div className="flex items-center justify-center gap-1 bg-orange-400 text-black border-2 border-black h-9 w-9 md:group-hover/sidebar:w-full md:group-hover/sidebar:h-auto py-1 px-1.5 font-mono text-xs font-black uppercase shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] max-md:w-full max-md:h-auto shrink-0">
              <Flame className="w-4 h-4 fill-black shrink-0" />
              <span className="md:hidden group-hover/sidebar:md:inline max-md:inline ml-0.5">
                05 Days
              </span>
            </div>
            <p className="font-mono text-[9px] font-bold text-slate-500 uppercase mt-1.5 tracking-tight md:hidden group-hover/sidebar:md:block max-md:block whitespace-nowrap">
              Alex // Rank: Prince
            </p>
          </div>

          <nav className="flex flex-col gap-3 w-full">
            <Link
              href="/chat"
              className="w-full"
              onClick={() => setMobileOpen(false)}
            >
              <Button
                variant={isActive("/chat") ? "default" : "outline"}
                className={`w-full font-black text-sm uppercase border-2 border-black h-12 p-0 md:group-hover/sidebar:px-3 max-md:px-3 ${
                  isActive("/chat") ? "bg-cyan-300" : "bg-white"
                } justify-center md:group-hover/sidebar:justify-start max-md:justify-start`}
              >
                <MessagesSquare className="w-4 h-4 stroke-[2.5] shrink-0" />
                <span className="md:hidden group-hover/sidebar:md:inline max-md:inline ml-2">
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
                variant={isActive("/userdashboard") ? "default" : "outline"}
                className={`w-full font-black text-sm uppercase border-2 border-black h-12 p-0 md:group-hover/sidebar:px-3 max-md:px-3 ${
                  isActive("/userdashboard") ? "bg-cyan-300" : "bg-white"
                } justify-center md:group-hover/sidebar:justify-start max-md:justify-start`}
              >
                <LayoutDashboard className="w-4 h-4 stroke-[2.5] shrink-0" />
                <span className="md:hidden group-hover/sidebar:md:inline max-md:inline ml-2">
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
                className={`w-full font-black text-sm uppercase border-2 border-black h-12 p-0 md:group-hover/sidebar:px-3 max-md:px-3 ${
                  isActive("/workspace") ? "bg-purple-300" : "bg-white"
                } justify-center md:group-hover/sidebar:justify-start max-md:justify-start`}
              >
                <Folder className="w-4 h-4 stroke-[2.5] shrink-0" />
                <span className="md:hidden group-hover/sidebar:md:inline max-md:inline ml-2">
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
                className={`w-full font-black text-sm uppercase border-2 border-black h-12 p-0 md:group-hover/sidebar:px-3 max-md:px-3 ${
                  isActive("/settings") ? "bg-emerald-300" : "bg-white"
                } justify-center md:group-hover/sidebar:justify-start max-md:justify-start`}
              >
                <Settings className="w-4 h-4 stroke-[2.5] shrink-0" />
                <span className="md:hidden group-hover/sidebar:md:inline max-md:inline ml-2">
                  Settings
                </span>
              </Button>
            </Link>
          </nav>
        </div>

        {/* 4. 👤 BOTTOM PROFILE SECTION */}
        <div className="pt-4 border-t-2 border-black border-dashed pb-4 w-full flex flex-col gap-3">
          <div className="w-full flex items-center justify-center md:group-hover/sidebar:justify-start max-md:justify-start gap-3">
            <img
              src={user?.picture || "https://unsplash.com"}
              alt="User profile avatar"
              className="w-9 h-9 rounded-full border-2 border-black bg-purple-300 shadow-[1.5px_1.5px_0px_0px_#000] object-cover shrink-0 select-none"
            />
            <div className="md:hidden group-hover/sidebar:md:block max-md:block text-left font-mono leading-none truncate">
              <p className="text-xs font-black uppercase text-black truncate mb-1">
                {user?.given_name || "Student"}
              </p>
              {/* Logout Trigger */}
              <LogoutLink className="text-[9px] font-bold text-red-500 uppercase hover:underline cursor-pointer block">
                [LOG OUT]
              </LogoutLink>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
