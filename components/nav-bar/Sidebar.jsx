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
      <div className="md:hidden w-screen h-screen bg-[#f9f5ef] border-b border-black/8 px-4 py-3 flex flex-row items-center justify-between z-50 box-border shadow-[0_8px_18px_rgba(17,17,17,0.03)]">
        <div className="bg-[linear-gradient(135deg,#f3e5c6_0%,#e5d4a7_100%)] px-3 py-1.5 font-black text-sm tracking-[0.2em] uppercase text-[#171411] select-none rounded-xl shadow-[0_10px_22px_rgba(177,146,99,0.18)]">
          APEX
        </div>
        <Button
          variant="outline"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-controls="apex-sidebar"
          className="border border-black/8 h-11 w-11 p-0 flex items-center justify-center bg-white text-[#171411] shadow-[0_10px_22px_rgba(17,17,17,0.06)] hover:bg-[#f8f3eb] active:translate-x-px active:translate-y-px transition-all"
        >
          {mobileOpen ? (
            <X className="w-5 h-5 stroke-[2.5] text-[#171411]" />
          ) : (
            <Menu className="w-5 h-5 stroke-[2.5] text-[#171411]" />
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
          fixed top-0 left-0 z-50 h-screen w-72 max-w-[85vw] bg-[#fbf7f1] text-[#171411] flex flex-col justify-between border-r border-black/8 shadow-[0_18px_46px_rgba(17,17,17,0.08)] transition-transform duration-200 ease-in-out
          md:static md:z-30 md:w-16 md:max-w-none md:hover:w-64 md:translate-x-0 md:p-2 md:flex
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
            <div className="bg-[linear-gradient(135deg,#f3e5c6_0%,#e5d4a7_100%)] h-9 w-9 flex items-center justify-center font-black text-sm select-none text-[#171411] shrink-0 rounded-xl shadow-[0_10px_22px_rgba(177,146,99,0.18)] group-hover/sidebar:md:hidden max-md:hidden">
              A
            </div>
            <div className="bg-[linear-gradient(135deg,#f3e5c6_0%,#e5d4a7_100%)] px-3 py-1.5 text-center w-full rounded-xl shadow-[0_10px_22px_rgba(177,146,99,0.18)] md:hidden group-hover/sidebar:md:block max-md:block animate-in fade-in duration-100">
              <h1 className="text-xl font-black tracking-[0.2em] uppercase text-[#171411]">
                APEX
              </h1>
            </div>
          </div>

          <div className="bg-[#f4efe6] border border-black/8 p-2 text-center transition-all w-full flex flex-col items-center justify-center rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
            <div className="flex items-center justify-center gap-2 bg-[linear-gradient(135deg,#f3e5c6_0%,#e5d4a7_100%)] text-[#171411] h-9 w-9 md:group-hover/sidebar:w-full md:group-hover/sidebar:h-auto py-1 px-1.5 font-mono text-xs font-black uppercase rounded-xl shadow-[0_10px_22px_rgba(177,146,99,0.18)] max-md:w-full max-md:h-auto shrink-0">
              <Flame className="w-4 h-4 fill-[#171411] shrink-0" />
              <span className="md:hidden group-hover/sidebar:md:inline max-md:inline ml-0.5">
                05 Days
              </span>
            </div>
            <p className="font-mono text-[9px] font-bold text-[#726550] uppercase mt-1.5 tracking-[0.18em] md:hidden group-hover/sidebar:md:block max-md:block whitespace-nowrap">
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
                className={`w-full font-black text-sm uppercase h-12 p-0 rounded-2xl md:group-hover/sidebar:px-3 max-md:px-3 border ${
                  isActive("/chat")
                    ? "bg-[linear-gradient(135deg,#f3e5c6_0%,#e5d4a7_100%)] text-[#171411] border-transparent shadow-[0_12px_24px_rgba(177,146,99,0.18)]"
                    : "bg-white text-[#171411] border-black/8 hover:bg-[#f7f2ea]"
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
                className={`w-full font-black text-sm uppercase h-12 p-0 rounded-2xl md:group-hover/sidebar:px-3 max-md:px-3 border ${
                  isActive("/userdashboard")
                    ? "bg-[linear-gradient(135deg,#f3e5c6_0%,#e5d4a7_100%)] text-[#171411] border-transparent shadow-[0_12px_24px_rgba(177,146,99,0.18)]"
                    : "bg-white text-[#171411] border-black/8 hover:bg-[#f7f2ea]"
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
                className={`w-full font-black text-sm uppercase h-12 p-0 rounded-2xl md:group-hover/sidebar:px-3 max-md:px-3 border ${
                  isActive("/workspace")
                    ? "bg-[linear-gradient(135deg,#f3e5c6_0%,#e5d4a7_100%)] text-[#171411] border-transparent shadow-[0_12px_24px_rgba(177,146,99,0.18)]"
                    : "bg-white text-[#171411] border-black/8 hover:bg-[#f7f2ea]"
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
                className={`w-full font-black text-sm uppercase h-12 p-0 rounded-2xl md:group-hover/sidebar:px-3 max-md:px-3 border ${
                  isActive("/settings")
                    ? "bg-[linear-gradient(135deg,#f3e5c6_0%,#e5d4a7_100%)] text-[#171411] border-transparent shadow-[0_12px_24px_rgba(177,146,99,0.18)]"
                    : "bg-white text-[#171411] border-black/8 hover:bg-[#f7f2ea]"
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

        <div className="pt-4 border-t border-white/10 pb-4 w-full flex flex-col gap-3">
          <div className="w-full flex items-center justify-center md:group-hover/sidebar:justify-start max-md:justify-start gap-3">
            <img
              src={user?.picture || "https://unsplash.com"}
              alt="User profile avatar"
              className="w-9 h-9 rounded-full border border-black/10 bg-[#f3e5c6] shadow-[0_12px_20px_rgba(177,146,99,0.12)] object-cover shrink-0 select-none"
            />
            <div className="md:hidden group-hover/sidebar:md:block max-md:block text-left font-mono leading-none truncate">
              <p className="text-xs font-black uppercase text-[#171411] truncate mb-1">
                {user?.given_name || "Student"}
              </p>
              <LogoutLink className="text-[9px] font-bold text-[#8f694c] uppercase hover:underline cursor-pointer block">
                [LOG OUT]
              </LogoutLink>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
