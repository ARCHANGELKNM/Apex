"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUp, Paperclip, Terminal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from '@/components/ui/badge';

export default function RetroChatRoom() {
  return (
    <Card
      variant="brutal"
      className="max-w-3xl mx-auto border-4 border-black bg-white shadow-[6px_6px_0px_0px_#000] h-[78vh] flex flex-col overflow-hidden p-0 rounded-none"
    >
      {/* Top Header Room Banner */}
      <div className="border-b-4 border-black p-4 bg-purple-300 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <Link href="/workspace">
            <Button
              variant="outline"
              className="border-2 border-black p-1 bg-white shadow-[2px_2px_0px_0px_#000] h-8 w-8 flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
            </Button>
          </Link>
          <div>
            <h3 className="font-black uppercase text-sm tracking-tight text-black">
              Physics Homework
            </h3>
            <span className="font-mono text-[10px] font-bold text-slate-700 uppercase">
              [MODEL: ARISTOTLE_V1]
            </span>
          </div>
        </div>
        <Badge
          variant="black"
          className="text-white text-[10px] font-mono font-bold"
        >
          LIVE_FEED
        </Badge>
      </div>

      {/* Middle Interactive Scrolling Feed */}
      <div className="flex-1 p-4 overflow-y-auto bg-[#F1EFE6] space-y-6 font-mono text-xs">
        <div className="text-center relative my-4 before:content-[''] before:absolute before:left-0 before:top-1/2 before:w-full before:h-[2px] before:bg-slate-300 before:-z-10">
          <span className="bg-[#F1EFE6] px-3 font-bold text-slate-400 uppercase text-[10px]">
            Today, 14:22 PM
          </span>
        </div>

        {/* AI Prompt Bubble Output */}
        <div className="flex gap-2 max-w-[85%]">
          <div className="border-2 border-black bg-yellow-300 p-2 h-fit shrink-0 shadow-[2px_2px_0px_0px_#000]">
            <Terminal className="w-4 h-4" />
          </div>
          <Card
            variant="brutal"
            className="bg-white border-2 border-black p-4 shadow-[3px_3px_0px_0px_#000] font-sans space-y-2 text-sm text-black rounded-none"
          >
            <p className="font-bold uppercase tracking-tight text-xs text-indigo-600 font-mono">
              [APEX_TUTOR]:
            </p>
            <p className="font-medium leading-relaxed">
              Let's check out Newton's Second Law. It means acceleration changes
              depending directly on the force applied to an item's mass.
            </p>
          </Card>
        </div>

        {/* Student Response Bubble Input */}
        <div className="flex gap-2 max-w-[85%] ml-auto justify-end">
          <div className="border-2 border-black bg-cyan-300 p-4 shadow-[3px_3px_0px_0px_#000] font-sans text-sm text-black font-semibold">
            Ah, that makes total sense. So if I triple the force, the
            acceleration triples too?
          </div>
        </div>
      </div>

      {/* Control Navigation Input Footer Row */}
      <div className="border-t-4 border-black p-3 bg-white flex items-center gap-3 shrink-0">
        <Button
          variant="outline"
          className="border-2 border-black p-3 bg-slate-100 shadow-[2px_2px_0px_0px_#000] h-11 w-11 flex items-center justify-center shrink-0"
        >
          <Paperclip className="w-5 h-5 stroke-[2.5]" />
        </Button>

        {/* Official RetroUI Interactive Input Primitive */}
        <Input
          type="text"
          disabled
          placeholder="Type your follow up question here..."
          className="flex-1 p-3 border-2 border-black font-mono text-xs bg-[#F9F6EE] font-bold focus:outline-none placeholder:text-slate-400 rounded-none h-11"
        />

        <Button
          variant="pink"
          className="border-2 border-black p-3 shadow-[2px_2px_0px_0px_#000] h-11 w-11 flex items-center justify-center shrink-0"
          disabled
        >
          <ArrowUp className="w-5 h-5 stroke-[2.5]" />
        </Button>
      </div>
    </Card>
  );
}
