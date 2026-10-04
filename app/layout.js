"use client";

import React from "react";
import Script from "next/script";

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-adsense-account"
          content="ca-pub-8679808720592276"
        />
      </head>
      <body className="antialiased bg-[var(--background)] text-[var(--foreground)] min-h-screen selection:bg-[var(--accent)] font-sans">
        <main>
          <div className="w-full max-w-full overflow-x-hidden min-w-0 px-4 sm:px-6 md:px-8 mx-auto">
            {children}
          </div>
        </main>
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8679808720592276"
          strategy="afterInteractive"
          async
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
