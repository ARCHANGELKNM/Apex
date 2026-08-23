import React from "react";
import Script from "next/script";

import "./globals.css";
import CookieConsent from "@/components/ads/CookieConsent";

// Google AdSense publisher ID (owned by parent/guardian account)
const ADSENSE_CLIENT =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-8679808720592276";

export const metadata = {
  other: {
    // AdSense site ownership verification
    "google-adsense-account": ADSENSE_CLIENT,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#F9F6EE] text-black min-h-screen selection:bg-yellow-300 font-sans">
        {/* Google AdSense loader */}
        <Script
          id="adsbygoogle-init"
          strategy="afterInteractive"
          crossOrigin="anonymous"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
        />

        <main>
          <div className="w-full max-w-full overflow-x-hidden min-w-0 px-4 sm:px-6 md:px-8 mx-auto">
            {children}
          </div>
        </main>

        <CookieConsent />
      </body>
    </html>
  );
}