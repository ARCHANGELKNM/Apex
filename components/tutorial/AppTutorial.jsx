'use client';

import { useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'apex-first-tour-complete';

const steps = [
  {
    selector: 'a[href="/chat"]',
    title: 'Start with Chat',
    text: 'Open Chat to ask for help, plan tasks, or summarize work. This is the fastest way to get started and keep momentum.',
  },
  {
    selector: 'a[href="/workspace"]',
    title: 'Manage your work',
    text: 'Use Workspace to create tasks, add due dates, and track what needs attention next. It keeps progress visible.',
  },
  {
    selector: '[data-tour="launch-workspace"]',
    title: 'Launch Workspace',
    text: 'Press this to open your project boards. It is the quickest path from dashboard to active work.',
  },
];

export default function AppTutorial() {
  const [stepIndex, setStepIndex] = useState(-1);
  const [targetRect, setTargetRect] = useState(null);

  const activeStep = useMemo(() => steps[stepIndex] ?? null, [stepIndex]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const seen = window.localStorage.getItem(STORAGE_KEY);
    if (seen === 'true') return;

    setStepIndex(0);
  }, []);

  useEffect(() => {
    if (!activeStep || typeof window === 'undefined') return;

    const updateTarget = () => {
      const target = document.querySelector(activeStep.selector);
      if (!target) {
        setTargetRect(null);
        return;
      }
      setTargetRect(target.getBoundingClientRect());
    };

    updateTarget();
    window.addEventListener('resize', updateTarget);
    window.addEventListener('scroll', updateTarget, { passive: true });

    return () => {
      window.removeEventListener('resize', updateTarget);
      window.removeEventListener('scroll', updateTarget);
    };
  }, [activeStep]);

  const finishTour = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, 'true');
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
    Math.max(12, targetRect.right + 18)
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
          boxShadow: '0 0 0 9999px rgba(0,0,0,0.28)',
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
        <p className="text-[11px] leading-4 text-slate-700">{activeStep.text}</p>

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
            {stepIndex >= steps.length - 1 ? 'Done' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}
