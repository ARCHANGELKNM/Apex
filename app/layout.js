"use client";

import React from "react";

import "./globals.css";

export default function RootLayout({ children }) {


  return (
    <html lang="en">
      <body className="antialiased bg-[#F9F6EE] text-black min-h-screen selection:bg-yellow-300 font-sans">
        <main >
          {children}
        </main>
      </body>
    </html>
  );
}
