"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-bar/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { TerminalIcon, AudioLinesIcon, SearchIcon, SparklesIcon, HomeIcon, InboxIcon, CalendarIcon, Settings2Icon, BlocksIcon, Trash2Icon, MessageCircleQuestionIcon } from "lucide-react"

// This is sample data.
const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: (
        <TerminalIcon />
      ),
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: (
        <AudioLinesIcon />
      ),
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: (
        <TerminalIcon />
      ),
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Search",
      url: "#",
      icon: (
        <SearchIcon />
      ),
    },
    {
      title: "Ask AI",
      url: "#",
      icon: (
        <SparklesIcon />
      ),
    },
    {
      title: "Home",
      url: "#",
      icon: (
        <HomeIcon />
      ),
      isActive: true,
    },
    {
      title: "Inbox",
      url: "#",
      icon: (
        <InboxIcon />
      ),
      badge: "10",
    },
  ],
  navSecondary: [
    {
      title: "Calendar",
      url: "#",
      icon: (
        <CalendarIcon />
      ),
    },
    {
      title: "Settings",
      url: "#",
      icon: (
        <Settings2Icon />
      ),
    },
    {
      title: "Templates",
      url: "#",
      icon: (
        <BlocksIcon />
      ),
    },
    {
      title: "Trash",
      url: "#",
      icon: (
        <Trash2Icon />
      ),
    },
    {
      title: "Help",
      url: "#",
      icon: (
        <MessageCircleQuestionIcon />
      ),
    },
  ],
    
}

export function AppSidebar({
  ...props
}) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        {/* <NavFavorites favorites={data.favorites} /> */}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
