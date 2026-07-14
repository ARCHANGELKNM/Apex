'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FileText, Layers, Circle, Plus, Sparkles, FolderPlus, ChevronRight } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const mockTasks = [
  { id: '1', title: 'Grade 11 Physics Assignment', description: 'Newtonian mechanics, friction variables, and vector analysis curves.', type: 'homework' },
  { id: '2', title: 'Introduction to Organic Molecules', description: 'Deep dive module exploring carbon bonds, alkanes, and functional chains.', type: 'study' },
  { id: '3', title: '2024 Math Paper 1 Exemplar', description: 'Calculus and algebraic functions preparation run with modular marks.', type: 'past_papers' }
];

export default function RetroWorkspace() {
  const [filter, setFilter] = useState('study');
  const [openFab, setOpenFab] = useState(false);

  return (
    <div className="max-w-2xl mx-auto min-h-[80vh] relative pb-24 animate-in fade-in duration-200">
      
      {/* 1. Header Selection Control Bar Pills */}
      <div className="border-4 border-black bg-white p-1.5 shadow-[4px_4px_0px_0px_#000] flex gap-2 mb-8">
        {['past_papers', 'homework', 'study'].map((type) => (
          <Button
            key={type}
            variant={filter === type ? "yellow" : "outline"}
            onClick={() => setFilter(type)}
            className="flex-1 py-3 px-2 font-black text-xs uppercase border-2 border-black shadow-[2px_2px_0px_0px_#000]"
          >
            {type.replace('_', ' ')}
          </Button>
        ))}
      </div>

      {/* 2. Structured Task Element Array */}
      <div className="space-y-4">
        {mockTasks.filter(t => t.type === filter).map((task) => (
          <Link key={task.id} href={`/workspace/${task.id}`} className="block group">
            <Card variant="brutal" className="bg-white border-4 border-black p-5 shadow-[4px_4px_0px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="p-3 border-2 border-black bg-amber-200 text-black shrink-0 shadow-[2px_2px_0px_0px_#000]">
                  {task.type === 'homework' && <FileText className="w-5 h-5 stroke-[2.5]" />}
                  {task.type === 'study' && <Layers className="w-5 h-5 stroke-[2.5]" />}
                  {task.type === 'past_papers' && <Circle className="w-5 h-5 fill-black" />}
                </div>
                <div className="flex-1 space-y-1">
                  <h4 className="font-black text-lg uppercase tracking-tight flex items-center justify-between text-black group-hover:text-indigo-600">
                    {task.title}
                    <ChevronRight className="w-5 h-5 text-black group-hover:translate-x-1 transition-transform" />
                  </h4>
                  <p className="text-xs font-mono font-bold text-slate-600 leading-relaxed">{task.description}</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* 3. High-Contrast Context Actions Menu FAB Overlay */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {openFab && (
          <div className="border-4 border-black bg-white p-2 shadow-[4px_4px_0px_0px_#000] min-w-[180px] flex flex-col gap-1 font-mono text-xs font-bold animate-in slide-in-from-bottom-2 duration-150">
            <button className="flex items-center gap-2 p-2 hover:bg-yellow-100 rounded text-left uppercase"><Sparkles className="w-4 h-4 text-indigo-500" /> New Project</button>
            <button className="flex items-center gap-2 p-2 hover:bg-yellow-100 rounded text-left uppercase"><FolderPlus className="w-4 h-4 text-emerald-500" /> Homework Help</button>
          </div>
        )}
        <Button 
          variant="pink" 
          onClick={() => setOpenFab(!openFab)} 
          className={`border-4 border-black text-black p-4 rounded-none shadow-[4px_4px_0px_0px_#000] h-14 w-14 flex items-center justify-center transition-transform ${openFab ? 'rotate-45 shadow-none translate-x-0.5 translate-y-0.5' : ''}`}
        >
          <Plus className="w-6 h-6 stroke-[3] shrink-0" />
        </Button>
      </div>

    </div>
  );
}
