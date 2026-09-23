"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "apex-cookie-consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show if the visitor hasn't chosen yet.
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      // localStorage unavailable (private mode etc.) — stay hidden.
    }
  }, []);

  const choose = (value) => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 rounded-2xl border border-black/10 bg-white p-4 shadow-lg sm:p-5"
    >
      <p className="text-sm leading-relaxed text-black/70">
        We use cookies to run this app and to show ads. Google and its partners
        may use cookies to serve ads based on your visits. See our{" "}
        <Link
          href="/privacy"
          className="font-medium underline underline-offset-2 hover:text-black"
        >
          Privacy Policy
        </Link>
        .
      </p>
      <div className="mt-3 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => choose("essential")}
          className="rounded-full px-4 py-2 text-sm font-medium text-black/60 hover:bg-black/5 hover:text-black transition-colors"
        >
          Essential only
        </button>
        <button
          type="button"
          onClick={() => choose("all")}
          className="rounded-full bg-[linear-gradient(135deg,#d7ba80_0%,#f2e0b4_100%)] px-4 py-2 text-sm font-semibold text-[#171411] shadow-[0_12px_24px_rgba(212,178,119,0.22)] hover:brightness-105 transition-colors"
        >
          Accept all
        </button>
      </div>
    </div>
  );
}