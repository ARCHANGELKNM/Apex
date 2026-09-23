'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from '@/components/ui/badge';

export default function RetroHomepage() {
  return (
    <div className="space-y-8 sm:space-y-12 max-w-4xl mx-auto text-center px-4 py-12 animate-in fade-in duration-200">
      <div className="mx-auto w-fit">
        <Badge
          variant="lime"
          className="border-2 border-black uppercase tracking-widest text-xs font-black shadow-[2px_2px_0px_0px_#000]"
        >
          100% Free & Open Source
        </Badge>
      </div>

      <div className="space-y-6">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.95] text-[var(--foreground)]">
          The Smartest Tutor
          <br />
          <span className="bg-gradient-to-r from-[#d7ba80] to-[#f2e0b4] border border-[#d7ba80] px-3 sm:px-4 shadow-[0_14px_26px_rgba(212,178,119,0.25)] inline-block my-2 -rotate-1 rounded-xl text-[#171411]">
            Tailored For You.
          </span>
        </h1>
        <p className="text-base sm:text-lg font-bold max-w-xl mx-auto text-[var(--muted-foreground)] font-mono">
          Aristotle personalized for global education scale. No tracking pixels.
          Zero learning barriers.
        </p>
      </div>

      {/* RetroUI Card Entry Panel */}
      <Card
        variant="brutal"
        className="max-w-md mx-auto bg-[rgba(255,255,255,0.72)] border border-[rgba(23,20,17,0.08)] shadow-[0_24px_60px_rgba(17,17,17,0.08)] p-2 text-left w-full backdrop-blur-sm"
      >
        <CardHeader className="border-b-2 border-black pb-2">
          <h3 className="text-xl font-black uppercase tracking-tight text-black">
            Initialize Session
          </h3>
        </CardHeader>
        <CardContent className="space-y-4 pt-3">
          <p className="text-xs font-mono text-slate-500 font-bold">
            Select a primary sign-up gateway to open up your custom curriculum
            records.
          </p>
          <div className="space-y-3">
            <Link href="/userdashboard" className="block">
              <Button
                variant="cyan"
                className="w-full flex items-center justify-between border-2 border-black font-black uppercase text-sm shadow-[3px_3px_0px_0px_#000]"
              >
                Continue with Google{" "}
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Button>
            </Link>
            <Link href="/userdashboard" className="block">
              <Button
                variant="purple"
                className="w-full flex items-center justify-between border-2 border-black font-black uppercase text-sm shadow-[3px_3px_0px_0px_#000]"
              >
                Email Magic Link <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
