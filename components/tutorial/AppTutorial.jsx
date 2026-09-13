'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter } from "next/navigation";

const STORAGE_KEY = "apex-first-tour-complete";

const steps = [
  {
    selector: 'a[href="/chat"]',
    title: "Start with Chat",
    text: "Ask the tutor what to do first. Try prompts like: “Plan this homework,” “Turn these notes into a study plan,” or “Find the past-paper topic I should revise.”",
    route: "/chat",
  },
  {
    selector: 'a[href="/workspace"]',
    title: "Create a workspace",
    text: "Open Workspace and choose a study mode: Homework for assignments, Past Papers for practice sets, and Study for learning a subject deeply.",
    route: "/workspace",
  },
  {
    selector: '[data-tour="create-project-button"]',
    title: "Name your workspace",
    text: "Click the plus button, choose a mode, then give the workspace a clear name such as “Calculus Q3 Homework” or “Biology Past Paper Revision.”",
    route: "/workspace",
  },
  {
    selector: '[data-tour="workspace-task-board"]',
    title: "Plan with tasks",
    text: "Inside one workspace, create tasks with a title and date, tick tasks when complete, and delete any task you no longer need.",
    route: null,
  },
];

export default function AppTutorial() {
  const [stepIndex, setStepIndex] = useState(-1);
  const [targetRect, setTargetRect] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  const activeStep = useMemo(() => steps[stepIndex] ?? null, [stepIndex]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const seen = window.localStorage.getItem(STORAGE_KEY);
    if (seen === "true") return;

    setStepIndex(0);
  }, []);

  useEffect(() => {
    if (!activeStep || !activeStep.route || typeof window === "undefined")
      return;

    if (pathname !== activeStep.route) {
      router.push(activeStep.route);
    }
  }, [activeStep, pathname, router]);

  useEffect(() => {
    if (!activeStep || typeof window === "undefined") return;

    const updateTarget = () => {
      const target = document.querySelector(activeStep.selector);
      if (!target) {
        setTargetRect(null);
        return;
      }
      setTargetRect(target.getBoundingClientRect());
    };

    updateTarget();
    window.addEventListener("resize", updateTarget);
    window.addEventListener("scroll", updateTarget, { passive: true });

    return () => {
      window.removeEventListener("resize", updateTarget);
      window.removeEventListener("scroll", updateTarget);
    };
  }, [activeStep]);

  const finishTour = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, "true");
    }
    setStepIndex(-1);
    setTargetRect(null);
  };

  const nextStep = () => {
    if (stepIndex >= steps.length - 1) {
      finishTour();
      return;
    }
    setStepIndex((current) => current + 1);
  };

  if (!activeStep || !targetRect) return null;

  const boxLeft = Math.min(
    window.innerWidth - 260,
    Math.max(12, targetRect.right + 18),
  );
  const boxTop = Math.max(16, targetRect.top + 12);

  return (
    <div className="pointer-events-none fixed inset-0 z-100">
      <div
        className="absolute border-[3px] border-black bg-yellow-200/25"
        style={{
          left: targetRect.left - 8,
          top: targetRect.top - 8,
          width: targetRect.width + 16,
          height: targetRect.height + 16,
          boxShadow: "0 0 0 9999px rgba(0,0,0,0.28)",
        }}
      />

      <div
        className="pointer-events-auto absolute w-60 rounded-none border-4 border-black bg-white p-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
        style={{ left: boxLeft, top: boxTop }}
      >
        <div className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
          Step {stepIndex + 1}
        </div>
        <div className="mb-2 text-sm font-black uppercase tracking-tight text-black">
          {activeStep.title}
        </div>
        <p className="text-[11px] leading-4 text-slate-700">
          {activeStep.text}
        </p>

        <div className="mt-3 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={finishTour}
            className="border-2 border-black bg-white px-2 py-1 text-[10px] font-black uppercase"
          >
            Skip
          </button>
          <button
            type="button"
            onClick={nextStep}
            className="border-2 border-black bg-cyan-300 px-2 py-1 text-[10px] font-black uppercase"
          >
            {stepIndex >= steps.length - 1 ? "Done" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
