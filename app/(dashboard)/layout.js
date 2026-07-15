'use client';

import React from 'react';
import Sidebar from '@/components/nav-bar/Sidebar';

export default function DashboardGroupLayout({ children }) {
  return (
    <div className="flex flex-row w-full h-screen bg-[#F9F6EE] text-black antialiased p-0 m-0 overflow-hidden">
      {/* 1. Left Edge Full-Height Sidebar Component */}
      <Sidebar />

      <main className="flex-1 w-full overflow-y-auto min-w-0 h-full p-0">
        {/* Inner page wrapping wrapper handles the text buffer safely */}
        <div className="p-6 md:p-8 max-w-5xl mx-auto w-full">{children}</div>
      </main>
    </div>
  );
}


