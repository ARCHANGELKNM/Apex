"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Circle, Trash2, CalendarDays, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function WorkspaceTaskBoard({ workspaceId }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const now = useMemo(() => new Date(), []);
  const completedCount = tasks.filter((task) => task.completed).length;
  const overdueCount = tasks.filter((task) => !task.completed && new Date(task.dueDate) < now).length;
  const progress = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;

  useEffect(() => {
    loadTasks();
  }, [workspaceId]);

  async function loadTasks() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/workspace/${workspaceId}/tasks`);
      if (!res.ok) throw new Error("Unable to load tasks");
      const data = await res.json();
      setTasks(data || []);
    } catch (err) {
      console.error(err);
      setError("Could not load tasks.");
    } finally {
      setLoading(false);
    }
  }

  async function createTask(event) {
    event.preventDefault();
    if (!title.trim() || !dueDate) return;

    setSaving(true);
    try {
      const res = await fetch(`/api/workspace/${workspaceId}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), dueDate }),
      });

      if (!res.ok) throw new Error("Task creation failed");
      setTitle("");
      setDueDate("");
      await loadTasks();
    } catch (err) {
      console.error(err);
      setError("Unable to create task.");
    } finally {
      setSaving(false);
    }
  }

  async function toggleTask(task) {
    try {
      await fetch(`/api/workspace/${workspaceId}/tasks/${task.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !task.completed }),
      });
      await loadTasks();
    } catch (err) {
      console.error(err);
      setError("Unable to update task.");
    }
  }

  async function removeTask(taskId) {
    try {
      await fetch(`/api/workspace/${workspaceId}/tasks/${taskId}`, {
        method: "DELETE",
      });
      await loadTasks();
    } catch (err) {
      console.error(err);
      setError("Unable to delete task.");
    }
  }

  return (
    <Card variant="brutal" className="border-4 border-black bg-white p-6 shadow-[4px_4px_0px_0px_#000]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
        <div>
          <h2 className="text-lg font-black uppercase tracking-tight">Workspace tasks</h2>
          <p className="text-sm text-slate-700">Add, complete, and remove tasks with a deadline.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wide font-black">
          <Badge variant="secondary">Total {tasks.length}</Badge>
          <Badge variant="success">Done {completedCount}</Badge>
          <Badge variant="destructive">Overdue {overdueCount}</Badge>
        </div>
      </div>

      <div className="rounded-full border-2 border-black bg-slate-100 h-4 overflow-hidden mb-4">
        <div className="h-full bg-emerald-600 transition-all" style={{ width: `${progress}%` }} />
      </div>
      <div className="flex items-center justify-between text-xs uppercase tracking-wide font-black mb-6">
        <span>{progress}% complete</span>
        <span>{tasks.length ? `${tasks.length - completedCount} remaining` : "No tasks yet"}</span>
      </div>

      <form onSubmit={createTask} className="grid gap-3 sm:grid-cols-[1fr_auto] mb-6">
        <div className="grid gap-3 sm:grid-cols-[1fr_160px]">
          <Input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Task title"
            className="border-2 border-black"
          />
          <Input
            type="date"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
            className="border-2 border-black"
          />
        </div>
        <Button type="submit" disabled={saving} className="border-2 border-black bg-black text-white hover:bg-slate-900">
          {saving ? "Saving..." : <span className="flex items-center gap-2"><Plus className="w-4 h-4" /> Add task</span>}
        </Button>
      </form>

      {error && (
        <div className="border border-red-400 bg-red-50 text-red-700 p-3 rounded-sm mb-4 text-sm">{error}</div>
      )}

      {loading ? (
        <div className="border-4 border-black p-6 bg-white text-center uppercase font-black text-sm">Loading tasks...</div>
      ) : tasks.length === 0 ? (
        <div className="border-2 border-dashed border-slate-300 p-6 text-slate-700 text-sm uppercase font-black text-center">
          No tasks yet. Use the form above to add a new deadline.
        </div>
      ) : (
        <div className="space-y-3">
          {tasks
            .slice()
            .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
            .map((task) => {
              const isOverdue = !task.completed && new Date(task.dueDate) < new Date();
              return (
                <div key={task.id} className="flex flex-col gap-3 rounded-sm border border-black p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3 sm:items-center">
                    <button
                      type="button"
                      onClick={() => toggleTask(task)}
                      className="rounded-full border-2 border-black bg-white p-2"
                    >
                      {task.completed ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <Circle className="w-5 h-5 text-slate-500" />}
                    </button>
                    <div>
                      <p className={`font-black ${task.completed ? 'text-slate-500 line-through' : 'text-slate-900'}`}>
                        {task.title}
                      </p>
                      <div className="text-xs text-slate-600 flex flex-wrap gap-2 items-center">
                        <span className={isOverdue ? 'text-red-600' : 'text-slate-600'}>
                          <CalendarDays className="inline w-3 h-3 mr-1" />
                          {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                        {task.completed && <Badge variant="outline">Completed</Badge>}
                        {isOverdue && <Badge variant="destructive">Overdue</Badge>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="destructive"
                      className="border-2 border-black"
                      onClick={() => removeTask(task.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </Card>
  );
}
