import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "@/src/db";
import { workspaces } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import {
  pruneCompletedTasks,
  readLocalTasks,
  writeLocalTasks,
} from "@/lib/task-storage";

async function getWorkspace(workspaceId, userId) {
  const [workspace] = await db
    .select()
    .from(workspaces)
    .where(eq(workspaces.id, workspaceId), eq(workspaces.userId, userId));

  return workspace;
}

export async function GET(req, { params }) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return NextResponse.json([], { status: 401 });
  }

  const { id } = await params;
  const workspace = await getWorkspace(id, user.id);

  if (!workspace) {
    return NextResponse.json({ error: "Workspace not found" }, { status: 404 });
  }

  const local = await readLocalTasks();
  const cleaned = pruneCompletedTasks(local);

  if (cleaned.length !== local.length) {
    await writeLocalTasks(cleaned);
  }

  const filtered = cleaned.filter((task) => task.workspaceId === id);
  filtered.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  return NextResponse.json(filtered);
}

export async function POST(req, { params }) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const workspace = await getWorkspace(id, user.id);

  if (!workspace) {
    return NextResponse.json({ error: "Workspace not found" }, { status: 404 });
  }

  const body = await req.json();
  const title = body.title?.trim();
  const dueDateValue = body.dueDate ? new Date(body.dueDate) : null;

  if (!title || !dueDateValue || Number.isNaN(dueDateValue.getTime())) {
    return NextResponse.json(
      { error: "Title and valid due date are required" },
      { status: 400 },
    );
  }

  const entry = {
    id: Date.now().toString() + "_" + Math.random().toString(36).slice(2, 9),
    title,
    dueDate: dueDateValue.toISOString(),
    completed: false,
    completedAt: null,
    workspaceId: workspace.id,
    createdAt: new Date().toISOString(),
  };

  try {
    const local = await readLocalTasks();
    const next = [...local, entry].slice(-5000);
    await writeLocalTasks(next);
    return NextResponse.json(entry);
  } catch (err) {
    console.error("Failed to write local task file:", err);
    return NextResponse.json(
      { error: "Could not persist task" },
      { status: 500 },
    );
  }
}
