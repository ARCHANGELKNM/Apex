"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RefreshCw } from "lucide-react";

export default function ProgressGraph() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/tasks/summary");
      if (!res.ok) throw new Error("Failed to load summary");
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
      setError("Unable to load progress");
    } finally {
      setLoading(false);
    }
  }

  if (loading)
    return (
      <Card variant="brutal" className="p-6 border-4 border-black bg-white">
        <div className="text-sm font-black uppercase">Loading progress...</div>
      </Card>
    );

  if (error || !data)
    return (
      <Card variant="brutal" className="p-6 border-4 border-black bg-white">
        <div className="text-sm font-black uppercase text-red-600">{error || "No data"}</div>
      </Card>
    );

  const { total = 0, completed = 0, overdue = 0 } = data;
  const percent = total ? Math.round((completed / total) * 100) : 0;

  // Simulated 7-day progress history (in production, fetch this from backend)
  const dailyProgress = [
    { day: "Mon", percent: 20 },
    { day: "Tue", percent: 30 },
    { day: "Wed", percent: 45 },
    { day: "Thu", percent: 55 },
    { day: "Fri", percent: 68 },
    { day: "Sat", percent: 72 },
    { day: "Sun", percent: Math.max(percent, 72) }, // Today's actual progress
  ];

  const maxY = 100;
  const chartHeight = 100;
  const chartWidth = 350;
  const pointSpacing = chartWidth / (dailyProgress.length - 1);

  // Build SVG path for line graph
  let pathD = "";
  dailyProgress.forEach((point, idx) => {
    const x = idx * pointSpacing;
    const y = chartHeight - (point.percent / maxY) * chartHeight;
    pathD += `${idx === 0 ? "M" : "L"} ${x} ${y} `;
  });

  return (
    <Card variant="brutal" className="p-6 border-4 border-black bg-white shadow-[6px_6px_0px_0px_#000]">
      {/* <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-black uppercase tracking-tighter"> Weekly Progress</h3>
        <button
          title="Refresh"
          onClick={load}
          className="border-4 border-black bg-black text-white p-2 font-black hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all shadow-[3px_3px_0px_0px_#000]"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Badges 
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <Badge variant="secondary" className="border-2 border-black font-black text-xs">Total {total}</Badge>
        <Badge variant="success" className="border-2 border-black font-black text-xs">✓ Done {completed}</Badge>
        <Badge variant="destructive" className="border-2 border-black font-black text-xs">⚠ Overdue {overdue}</Badge>
      </div>

      //* Line Graph - Clean & Retro
      <div className="mb-6 border-4 border-black bg-white">
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight + 30}`} className="w-full h-auto" style={{ maxHeight: "160px" }} preserveAspectRatio="xMidYMid meet">
          {/* Grid lines - subtle
          <line x1="0" y1={chartHeight * 0.25} x2={chartWidth} y2={chartHeight * 0.25} stroke="#e5e7eb" strokeWidth="1" />
          <line x1="0" y1={chartHeight * 0.5} x2={chartWidth} y2={chartHeight * 0.5} stroke="#e5e7eb" strokeWidth="1" />
          <line x1="0" y1={chartHeight * 0.75} x2={chartWidth} y2={chartHeight * 0.75} stroke="#e5e7eb" strokeWidth="1" />

          {/* Y-axis labels 
          <text x="5" y={chartHeight * 0.25 + 4} fontSize="11" fontWeight="900" fill="#000">75%</text>
          <text x="5" y={chartHeight * 0.5 + 4} fontSize="11" fontWeight="900" fill="#000">50%</text>
          <text x="5" y={chartHeight * 0.75 + 4} fontSize="11" fontWeight="900" fill="#000">25%</text>

          {/* Gradient fill under line 
          <defs>
            <linearGradient id="fillGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#22c55e", stopOpacity: 0.15 }} />
              <stop offset="100%" style={{ stopColor: "#22c55e", stopOpacity: 0 }} />
            </linearGradient>
          </defs>

          <path d={`${pathD} L ${chartWidth} ${chartHeight} L 0 ${chartHeight}`} fill="url(#fillGradient)" />

          {/* Line 
          <path d={pathD} stroke="#22c55e" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />

          {/* Data points 
          {dailyProgress.map((point, idx) => {
            const x = idx * pointSpacing;
            const y = chartHeight - (point.percent / maxY) * chartHeight;
            return (
              <circle key={idx} cx={x} cy={y} r="2.5" fill="#22c55e" stroke="white" strokeWidth="1.5" />
            );
          })}

          {/* X-axis labels 
          {dailyProgress.map((point, idx) => {
            const x = idx * pointSpacing;
            return (
              <text key={`label-${idx}`} x={x} y={chartHeight + 20} fontSize="12" fontWeight="900" textAnchor="middle" fill="#000">
                {point.day}
              </text>
            );
          })}

          {/* Axes
          <line x1="0" y1={chartHeight} x2={chartWidth} y2={chartHeight} stroke="#000" strokeWidth="2" />
          <line x1="0" y1="0" x2="0" y2={chartHeight} stroke="#000" strokeWidth="2" />
        </svg>
      </div> */}

      {/* Progress bar + summary */}
      <div className="p-4 border-4 border-black bg-white shadow-[3px_3px_0px_0px_#000]">
        <div className="w-full h-6 bg-slate-200 border-3 border-black overflow-hidden mb-3">
          <div className="h-full bg-emerald-500 transition-all" style={{ width: `${percent}%` }} />
        </div>
        <div className="flex items-center justify-between text-sm uppercase font-black">
          <span className="text-lg">🎯 {percent}% COMPLETE</span>
          <span className="text-xs">{completed} done • {total - completed} left</span>
        </div>
      </div>
    </Card>
  );
}
