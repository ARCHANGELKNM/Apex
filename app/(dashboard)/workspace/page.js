'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, Layers, Circle, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CreateProjectBtn from "@/components/workspace/Addbutton/CreateProjectBtn";

const typeMeta = {
  HOMEWORK: { label: "homework", icon: FileText, color: "bg-amber-200" },
  STUDY: { label: "study", icon: Layers, color: "bg-cyan-200" },
  PAST_PAPERS: { label: "past_papers", icon: Circle, color: "bg-pink-200" },
};

export default function RetroWorkspace() {
  const [filter, setFilter] = useState("study");
  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function loadWorkspaces() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/workspace");
      if (!res.ok) {
        throw new Error(`Failed to load workspaces (${res.status})`);
      }
      const data = await res.json();
      setWorkspaces(data || []);
    } catch (err) {
      console.error(err);
      setError("Unable to load workspaces.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadWorkspaces();

    const handleCreated = () => loadWorkspaces();
    const handleDeleted = () => loadWorkspaces();

    window.addEventListener("workspace-created", handleCreated);
    window.addEventListener("workspace-deleted", handleDeleted);

    return () => {
      window.removeEventListener("workspace-created", handleCreated);
      window.removeEventListener("workspace-deleted", handleDeleted);
    };
  }, []);

  const filtered = workspaces.filter((item) => {
    const typeKey = item.type?.toUpperCase?.();
    return typeMeta[typeKey]?.label === filter;
  });

  return (
    <div className="max-w-2xl mx-auto min-h-[80vh] relative pb-24 animate-in fade-in duration-200">
      <div className="border-4 border-black bg-white p-1.5 shadow-[4px_4px_0px_0px_#000] flex gap-2 mb-8">
        {["past_papers", "homework", "study"].map((type) => (
          <Button
            key={type}
            variant={filter === type ? "yellow" : "outline"}
            onClick={() => setFilter(type)}
            className="flex-1 py-3 px-2 font-black text-xs uppercase border-2 border-black shadow-[2px_2px_0px_0px_#000]"
          >
            {type.replace("_", " ")}
          </Button>
        ))}
      </div>

      <div className="space-y-4">
        {loading && (
          <div className="border-4 border-black p-6 bg-white shadow-[4px_4px_0px_0px_#000] text-center uppercase font-black text-sm">
            Loading workspaces...
          </div>
        )}

        {!loading && error && (
          <div className="border-4 border-black p-6 bg-red-100 shadow-[4px_4px_0px_0px_#000] text-center uppercase font-black text-sm text-red-800">
            {error}
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="border-4 border-black p-6 bg-white shadow-[4px_4px_0px_0px_#000] text-center uppercase font-black text-sm">
            No workspaces found for this category. Create one to get started.
          </div>
        )}

        {!loading &&
          !error &&
          filtered.map((workspace) => {
            const meta =
              typeMeta[workspace.type?.toUpperCase()] || typeMeta.STUDY;
            const Icon = meta.icon;
            return (
              <Link
                key={workspace.id}
                href={`/workspace/${workspace.id}`}
                className="block group"
              >
                <Card
                  variant="brutal"
                  className="bg-white border-4 border-black p-5 shadow-[4px_4px_0px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-3 border-2 border-black text-black shrink-0 shadow-[2px_2px_0px_0px_#000] ${meta.color}`}
                    >
                      <Icon className="w-5 h-5 stroke-[2.5]" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h4 className="font-black text-lg uppercase tracking-tight flex items-center justify-between text-black group-hover:text-indigo-600">
                        {workspace.title}
                        <ChevronRight className="w-5 h-5 text-black group-hover:translate-x-1 transition-transform" />
                      </h4>
                      <p className="text-xs font-mono font-bold text-slate-600 leading-relaxed">
                        {workspace.type?.replace("_", " ").toLowerCase()}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
      </div>

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <CreateProjectBtn />
      </div>
    </div>
  );
}
