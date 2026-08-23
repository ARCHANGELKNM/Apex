'use client';

import React from 'react';
import Link from 'next/link';
import { User, Flame, ArrowUpRight, BookOpen, Trophy, Sparkles } from 'lucide-react';
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProgressGraph from '@/components/dashboard/ProgressGraph';
import Graph from '@/components/dashboard/Graph'

export default function userdashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Welcome Banner Row */}
      <div className="border-4 border-black bg-yellow-300 p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex justify-between items-center gap-3">
        <h2 className="text-xl sm:text-2xl font-black tracking-tighter uppercase min-w-0">
          Welcome Back
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {/* Profile Card */}
        <Card
          variant="brutal"
          className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_#000] p-6 text-center flex flex-col items-center justify-center"
        >
          <div className="w-24 h-24 bg-purple-300 border-4 border-black shadow-[4px_4px_0px_0px_#000] flex items-center justify-center mb-4">
            <User className="w-12 h-12 text-black stroke-[2.5]" />
          </div>
          <h3 className="text-2xl font-black uppercase tracking-tight">
            Grade 11
          </h3>
        </Card>

        {/* Dynamic Navigation & Metric Grid Panels */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <Link href="/workspace" className="sm:col-span-2">
            <Card
              variant="brutal"
              className="bg-cyan-300 border-4 border-black p-6 h-full min-h-40 shadow-[6px_6px_0px_0px_#000] flex flex-col justify-between hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer group"
            >
              <div className="border-2 border-black bg-white p-2 w-fit shadow-[2px_2px_0px_0px_#000]">
                <BookOpen className="w-6 h-6 text-black stroke-[2.5]" />
              </div>
              <span className="flex items-center justify-between gap-2 text-xl sm:text-2xl font-black uppercase tracking-tight mt-4">
                Launch Workspace{" "}
                <ArrowUpRight className="w-6 h-6 shrink-0 group-hover:rotate-45 transition-transform" />
              </span>
            </Card>
          </Link>

          <Graph className={"w-full h-full "} />

          {/* Inspirational Text Box Component */}
          <div className="sm:col-span-3 border-4 border-black bg-white p-5 flex items-start gap-3 sm:gap-4 shadow-[6px_6px_0px_0px_#000] font-mono text-xs">
            <Badge
              variant="black"
              className="text-white text-[10px] font-bold shrink-0"
            >
              QUOTE
            </Badge>
            <p className="text-black font-bold uppercase min-w-0">
              "The roots of education are bitter, but the fruit is sweet." —
              Aristotle
            </p>
          </div>
        </div>
      </div>

      {/* Main Graphical Performance Tracker */}
      <div>
        <ProgressGraph />
      </div>
    </div>
  );
}
