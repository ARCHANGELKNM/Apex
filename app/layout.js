"use client";

import React from "react";

import "./globals.css";

export default function RootLayout({ children }) {


  return (
    <html lang="en">
      <head>
        <meta name="monetag" content="0e82f58084b4d74dd8c96a710c005f62" />
      </head>
      <body className="antialiased bg-[#F9F6EE] text-black min-h-screen selection:bg-yellow-300 font-sans">
        <main>
          <div className="w-full max-w-full overflow-x-hidden min-w-0 px-4 sm:px-6 md:px-8 mx-auto">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
