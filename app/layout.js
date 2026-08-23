"use client";

import React from "react";

import "./globals.css";

export default function RootLayout({ children }) {


  return (
    <html lang="en">
      <body className="antialiased bg-[#F9F6EE] text-black min-h-screen selection:bg-yellow-300 font-sans">
        <meta name="google-adsense-account" content="ca-pub-8679808720592276">
          <main>
            <div className="w-full max-w-full overflow-x-hidden min-w-0 px-4 sm:px-6 md:px-8 mx-auto">
              {children}
            </div>
          </main>
        </meta>
      </body>
    </html>
  );
}
