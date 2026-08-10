'use client';

import React from 'react';
import Link from 'next/link';
import { User, Flame, ArrowUpRight, BookOpen, Trophy, Sparkles } from 'lucide-react';
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function RetroDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Welcome Banner Row */}
      <div className="border-4 border-black bg-yellow-300 p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex justify-between items-center">
        <h2 className="text-2xl font-black tracking-tighter uppercase">Welcome Back, Alex</h2>
        <Badge variant="black" className="text-yellow-300 text-xs font-mono font-bold uppercase">STREAK_VAL: 05</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Profile Card */}
        <Card variant="brutal" className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_#000] p-6 text-center flex flex-col items-center justify-center">
          <div className="w-24 h-24 bg-purple-300 border-4 border-black shadow-[4px_4px_0px_0px_#000] flex items-center justify-center mb-4">
            <User className="w-12 h-12 text-black stroke-[2.5]" />
          </div>
          <h3 className="text-2xl font-black uppercase tracking-tight">Grade 11</h3>
          <div className="mt-3">
            <Badge variant="amber" className="border-2 border-black font-black uppercase px-3 py-1 text-xs">
              <Flame className="w-4 h-4 mr-1 fill-black inline" /> 5 Day Streak
            </Badge>
          </div>
        </Card>

        {/* Dynamic Navigation & Metric Grid Panels */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Link href="/workspace" className="sm:col-span-2">
            <Card variant="brutal" className="bg-cyan-300 border-4 border-black p-6 h-full min-h-40 shadow-[6px_6px_0px_0px_#000] flex flex-col justify-between hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer group">
              <div className="border-2 border-black bg-white p-2 w-fit shadow-[2px_2px_0px_0px_#000]">
                <BookOpen className="w-6 h-6 text-black stroke-[2.5]" />
              </div>
              <span className="flex items-center justify-between text-2xl font-black uppercase tracking-tight mt-4">
                Launch Workspace <ArrowUpRight className="w-6 h-6 group-hover:rotate-45 transition-transform" />
              </span>
            </Card>
          </Link>

          <Card variant="brutal" className="bg-emerald-300 border-4 border-black p-6 shadow-[6px_6px_0px_0px_#000] flex flex-col justify-between text-black font-black">
            <div className="text-4xl font-mono tracking-tighter">12 / 14</div>
            <span className="text-sm uppercase tracking-wide">Tasks Cleared</span>
          </Card>

          {/* Inspirational Text Box Component */}
          <div className="sm:col-span-3 border-4 border-black bg-white p-5 flex items-start gap-4 shadow-[6px_6px_0px_0px_#000] font-mono text-xs">
            <Badge variant="black" className="text-white text-[10px] font-bold shrink-0">QUOTE</Badge>
            <p className="text-black font-bold uppercase">
              "The roots of education are bitter, but the fruit is sweet." — Aristotle
            </p>
          </div>
        </div>

      </div>

      {/* Main Graphical Performance Tracker */}
      <Card variant="brutal" className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_#000]">
        <h3 className="text-lg font-black uppercase tracking-tight flex items-center gap-2 border-b-2 border-black pb-2 mb-4">
          <Trophy className="w-5 h-5 text-yellow-500 fill-yellow-400 stroke-black" /> Weekly Growth Chart Vector
        </h3>
        <div className="h-64 bg-[#F1EFE6] border-2 border-black flex flex-col items-center justify-center font-mono font-bold text-xs uppercase p-4 relative">
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-size-[16px_16px]"></div>
          <Sparkles className="w-8 h-8 text-black mb-2 animate-pulse" />
          <span>[RetroUI Line Graph Pipeline Active]</span>
        </div>
      </Card>

    </div>
  );
}
