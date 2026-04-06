import React from "react";
import "../globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/nav-bar/app-sidebar";


export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <TooltipProvider delayDuration={0}>
        <AppSidebar />        
        <main className="flex-1">
          {children} 
        </main>
      </TooltipProvider>
    </SidebarProvider>
  );
}

