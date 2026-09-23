'use client';

import React from 'react';
import Link from 'next/link';
import { User, Flame, ArrowUpRight, BookOpen, Trophy, Sparkles } from 'lucide-react';
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProgressGraph from '@/components/dashboard/ProgressGraph';
import Graph from "@/components/dashboard/Graph";

export default function userDashboard() {
  return (
    <div className="space-y-3 sm:space-y-5 animate-in fade-in duration-200">
      {/* Welcome Banner Row */}
      <div className="border border-[rgba(23,20,17,0.08)] bg-gradient-to-r from-[#d7ba80] to-[#f2e0b4] p-3 shadow-[0_18px_32px_rgba(212,178,119,0.18)] flex justify-between items-center sm:p-4 rounded-2xl">
        <h2 className="text-2xl sm:text-3xl font-black tracking-tighter uppercase text-[#171411]">
          Welcome Back
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        {/* Profile Card */}
        <Card
          variant="brutal"
          className="bg-[rgba(255,255,255,0.72)] border border-[rgba(23,20,17,0.08)] shadow-[0_20px_40px_rgba(17,17,17,0.08)] p-4 text-center flex flex-col items-center justify-center min-h-56 rounded-2xl backdrop-blur-sm"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-[#d7ba80] to-[#f2e0b4] border border-[rgba(23,20,17,0.08)] shadow-[0_12px_24px_rgba(212,178,119,0.18)] flex items-center justify-center mb-4 rounded-2xl">
            <User className="w-12 h-12 text-[#171411] stroke-[2.5]" />
          </div>
          <h3 className="text-2xl font-black uppercase tracking-tight">
            Grade 11
          </h3>
        </Card>

        {/* Dynamic Navigation & Metric Grid Panels */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <Link
            href="/workspace"
            className="sm:col-span-2"
            data-tour="launch-workspace"
          >
            <Card
              variant="brutal"
              className="bg-gradient-to-br from-[#1a1b1f] to-[#2a2b31] text-[#f5f0e9] border border-[rgba(255,255,255,0.05)] p-4 h-full min-h-44 shadow-[0_18px_35px_rgba(17,17,17,0.18)] flex flex-col justify-between hover:-translate-y-0.5 transition-all cursor-pointer group rounded-2xl"
            >
              <div className="border-2 border-black bg-white p-2 w-fit shadow-[2px_2px_0px_0px_#000]">
                <BookOpen className="w-6 h-6 text-black stroke-[2.5]" />
              </div>
              <span className="flex items-center justify-between text-2xl sm:text-3xl font-black uppercase tracking-tight mt-4">
                Launch Workspace{" "}
                <ArrowUpRight className="w-6 h-6 group-hover:rotate-45 transition-transform" />
              </span>
            </Card>
          </Link>

          <Graph className={"w-full h-full "} />

          {/* Inspirational Text Box Component */}
          <div className="sm:col-span-3 border-4 border-black bg-white p-4 flex items-start gap-3 shadow-[6px_6px_0px_0px_#000] font-mono text-sm">
            <Badge
              variant="black"
              className="text-white text-[10px] font-bold shrink-0"
            >
              QUOTE
            </Badge>
            <p className="text-black font-bold uppercase">
              "The roots of education are bitter, but the fruit is sweet." —
              Aristotle
            </p>
          </div>
        </div>
      </div>

      {/* Main Graphical Performance Tracker */}
      <div className="md:col-span-3">
        <ProgressGraph />
      </div>
    </div>
  );
}
