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
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.95] text-[#171411]">
          The Smartest Tutor
          <br />
          <span className="bg-[linear-gradient(135deg,#f3e5c6_0%,#e5d4a7_100%)] border-2 border-black px-3 sm:px-4 shadow-[5px_5px_0_#000] inline-block my-2 -rotate-1 rounded-lg text-[#171411]">
            Tailored For You.
          </span>
        </h1>
        <p className="text-base sm:text-lg font-bold max-w-xl mx-auto text-[#5f5245] font-mono">
          Aristotle personalized for global education scale. No tracking pixels.
          Zero learning barriers.
        </p>
      </div>

      {/* RetroUI Card Entry Panel */}
      <Card
        variant="brutal"
        className="max-w-md mx-auto border-2 border-black bg-white p-2 text-left w-full shadow-[8px_8px_0_#00000010]"
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
