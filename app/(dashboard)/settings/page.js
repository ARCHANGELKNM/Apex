"use client";

import React, { useState } from "react";
import { Type, GraduationCap, ShieldAlert, Sparkles } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function RetroSettings() {
  const [academicTier, setAcademicTier] = useState("high_school");
  const [fontSize, setFontSize] = useState("large");

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* Settings Diagnostic System Banner */}
      <div className="border-4 border-black bg-emerald-300 p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight min-w-0">
          System Configuration // Calibrate User
        </h2>
        <Badge
          variant="black"
          className="font-mono text-[10px] font-bold text-white uppercase w-fit shrink-0"
        >
          CFG_STATE: OK
        </Badge>
      </div>

      {/* 1. Academic Calibration Panel */}
      <Card
        variant="brutal"
        className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_#000] p-6"
      >
        <CardHeader className="border-b-2 border-black pb-2 mb-4 flex flex-row items-center gap-2 min-w-0">
          <GraduationCap className="w-5 h-5 stroke-[2.5] shrink-0" />
          <h3 className="text-lg font-black uppercase tracking-tight">
            Academic Identity Tier
          </h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-xs font-mono font-bold text-slate-500">
            This value defines the prompt constraints for the underlying
            Aristotle AI engine, automatically restructuring vocabularies and
            assignments to scale.
          </p>

          {/* Brutalist Selector Array */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {[
              { id: "primary", label: "Primary School" },
              { id: "high_school", label: "High School" },
              { id: "university", label: "University / College" },
            ].map((tier) => (
              <Button
                key={tier.id}
                variant={academicTier === tier.id ? "default" : "outline"}
                onClick={() => setAcademicTier(tier.id)}
                className={`font-black text-xs uppercase border-2 border-black p-4 h-auto shadow-[3px_3px_0px_0px_#000] ${
                  academicTier === tier.id ? "bg-yellow-300" : "bg-white"
                }`}
              >
                {tier.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 2. Granny-Friendly Accessibility Controls */}
      <Card
        variant="brutal"
        className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_#000] p-6"
      >
        <CardHeader className="border-b-2 border-black pb-2 mb-4 flex flex-row items-center gap-2 min-w-0">
          <Type className="w-5 h-5 stroke-[2.5] shrink-0" />
          <h3 className="text-lg font-black uppercase tracking-tight">
            Visual Interface Scaling
          </h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-xs font-mono font-bold text-slate-500">
            Crucial metric optimization parameter for our granny-friendly
            standard. Instantly enlarges text baselines across the reading
            layouts.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {[
              { id: "normal", label: "Standard Text" },
              { id: "large", label: "Large Text (Granny Mode)" },
              { id: "massive", label: "Extra Massive Text" },
            ].map((size) => (
              <Button
                key={size.id}
                variant={fontSize === size.id ? "default" : "outline"}
                onClick={() => setFontSize(size.id)}
                className={`font-black text-xs uppercase border-2 border-black p-4 h-auto shadow-[3px_3px_0px_0px_#000] ${
                  fontSize === size.id ? "bg-cyan-300" : "bg-white"
                }`}
              >
                {size.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 3. Open Source Data Transparency Guard */}
      <Card
        variant="brutal"
        className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_#000] p-6"
      >
        <CardHeader className="border-b-2 border-black pb-2 mb-4 flex flex-row items-center gap-2 text-rose-600 min-w-0">
          <ShieldAlert className="w-5 h-5 stroke-[2.5] shrink-0" />
          <h3 className="text-lg font-black uppercase tracking-tight">
            Data Destruction & Privacy Zone
          </h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-xs font-mono font-bold text-slate-500">
            True open-source execution strategy. Clicking this trigger
            forcefully purges all active projects, records, and linked metadata
            from the relational cluster database instantly.
          </p>
          <div className="pt-2">
            <Button
              variant="outline"
              className="bg-rose-400 text-black border-2 border-black font-black text-xs uppercase px-5 py-3 h-auto w-full sm:w-auto shadow-[4px_4px_0px_0px_#000] hover:bg-rose-500"
            >
              Purge Database Record & Erase Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
