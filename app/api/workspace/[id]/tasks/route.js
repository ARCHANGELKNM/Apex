import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "@/src/db";
import { workspaces } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import fs from "fs";
import path from "path";

const TASK_STORAGE_FILE = path.join(
  process.cwd(),
  "apex",
  "task-storage",
  "tasks.json",
);

async function readLocalTasks() {
  try {
    await fs.promises.mkdir(path.dirname(TASK_STORAGE_FILE), {
      recursive: true,
    });
    const raw = await fs.promises.readFile(TASK_STORAGE_FILE, "utf8");
    return JSON.parse(raw || "[]");
  } catch (err) {
    return [];
  }
}

async function writeLocalTasks(tasks) {
  await fs.promises.mkdir(path.dirname(TASK_STORAGE_FILE), { recursive: true });
  await fs.promises.writeFile(
    TASK_STORAGE_FILE,
    JSON.stringify(tasks, null, 2),
    "utf8",
  );
}

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

  // Read tasks from local file storage
  const local = await readLocalTasks();
  const filtered = local.filter((t) => t.workspaceId === id);
  // sort by dueDate
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
  const dueDate = body.dueDate?.trim();

  if (!title || !dueDate) {
    return NextResponse.json(
      { error: "Title and due date are required" },
      { status: 400 },
    );
  }
  // create local-only task entry (no DB)
  const idStr = Date.now().toString() + "_" + Math.random().toString(36).slice(2, 9);
  const entry = {
    id: idStr,
    title,
    dueDate: new Date(dueDate).toISOString(),
    completed: false,
    workspaceId: workspace.id,
    createdAt: new Date().toISOString(),
  };

  try {
    const local = await readLocalTasks();
    const next = [...local, entry].slice(-5000);
    await writeLocalTasks(next);
  } catch (err) {
    console.error("Failed to write local task file:", err);
    return NextResponse.json({ error: "Could not persist task" }, { status: 500 });
  }

  return NextResponse.json(entry);
}
