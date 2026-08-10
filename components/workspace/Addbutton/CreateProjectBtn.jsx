"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Loader2, Book, FileText, Brain, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function CreateProjectBtn() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1); // Step 1: Category, Step 2: Name
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // The 3 Modes
  const modes = [
    {
      id: "HOMEWORK",
      label: "Homework Help",
      icon: Book,
      color: "bg-cyan-300",
    },
    {
      id: "PAST_PAPERS",
      label: "Past Papers",
      icon: FileText,
      color: "bg-yellow-300",
    },
    { id: "STUDY", label: "Deep Study", icon: Brain, color: "bg-pink-300" },
  ];

  async function createProject(e) {
    e.preventDefault();
    if (!title.trim()) return;

    setIsLoading(true);

    await fetch("/api/workspace", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, type: category }),
    });

    // Reset
    setTitle("");
    setCategory("");
    setStep(1);
    setIsOpen(false);
    setIsLoading(false);
    // Let any listening UI know a workspace was created
    try {
      window.dispatchEvent(new CustomEvent("workspace-created"));
    } catch (e) {
      // ignore if window not available
    }
    router.refresh();
  }

  // STEP 1: SELECT MODE
  if (isOpen && step === 1) {
    return (
      <div className="h-full border-4 border-black p-6 bg-white flex flex-col justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <h3 className="font-black uppercase text-sm mb-4 text-center">
          Select Protocol
        </h3>
        <div className="grid gap-2">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => {
                setCategory(m.id);
                setStep(2);
              }}
              className={`flex items-center gap-3 p-3 border-2 border-black font-bold text-xs uppercase hover:translate-x-1 transition-all ${m.color}`}
            >
              <m.icon className="w-4 h-4" /> {m.label}
            </button>
          ))}
        </div>
        <Button
          onClick={() => setIsOpen(false)}
          variant="ghost"
          className="mt-4 text-xs underline"
        >
          CANCEL
        </Button>
      </div>
    );
  }

  // STEP 2: NAME IT
  if (isOpen && step === 2) {
    return (
      <form
        onSubmit={createProject}
        className="h-full border-4 border-black p-6 bg-black text-white flex flex-col justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
      >
        <div className="mb-4">
          <span className="text-[10px] font-bold text-gray-400 uppercase">
            SELECTED: {category}
          </span>
          <h3 className="font-black uppercase text-lg">Name Task</h3>
        </div>

        <Input
          autoFocus
          placeholder="e.g. Calculus Q3..."
          className="border-2 border-white bg-transparent text-white mb-3 rounded-none font-bold font-mono placeholder:text-gray-600 focus-visible:ring-0"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="flex gap-2">
          <Button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-white text-black rounded-none font-bold border-2 border-transparent hover:bg-gray-200"
          >
            {isLoading ? <Loader2 className="animate-spin w-4 h-4" /> : "START"}
          </Button>
          <Button
            type="button"
            onClick={() => setStep(1)}
            variant="outline"
            className="border-2 border-white text-white bg-transparent rounded-none font-bold hover:bg-white hover:text-black"
          >
            BACK
          </Button>
        </div>
      </form>
    );
  }

  // DEFAULT: BIG BUTTON
  return (
    <button
      onClick={() => setIsOpen(true)}
      className="group h-full min-h-62.5 border-4 border-black border-dashed bg-transparent hover:bg-gray-100 transition-all cursor-pointer flex flex-col items-center justify-center gap-4"
    >
      <div className="bg-black text-white p-4 rounded-full group-hover:scale-110 transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]">
        <Plus className="w-8 h-8" />
      </div>
      <span className="font-black uppercase text-xl">New Task</span>
    </button>
  );
}
