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

async function writeLocalTasks(tasksArray) {
  await fs.promises.mkdir(path.dirname(TASK_STORAGE_FILE), { recursive: true });
  await fs.promises.writeFile(
    TASK_STORAGE_FILE,
    JSON.stringify(tasksArray, null, 2),
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

export async function PATCH(req, { params }) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, taskId } = await params;
  const workspace = await getWorkspace(id, user.id);

  if (!workspace) {
    return NextResponse.json({ error: "Workspace not found" }, { status: 404 });
  }

  const body = await req.json();
  if (typeof body.completed !== "boolean") {
    return NextResponse.json(
      { error: "Completed value is required" },
      { status: 400 },
    );
  }

  // update local-only storage
  try {
    const local = await readLocalTasks();
    const idx = local.findIndex((t) => t.id === taskId && t.workspaceId === id);
    if (idx === -1) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }
    local[idx].completed = !!body.completed;
    await writeLocalTasks(local);
    return NextResponse.json(local[idx]);
  } catch (err) {
    console.error("Failed to update local task file:", err);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, taskId } = await params;
  const workspace = await getWorkspace(id, user.id);

  if (!workspace) {
    return NextResponse.json({ error: "Workspace not found" }, { status: 404 });
  }

  try {
    const local = await readLocalTasks();
    const next = local.filter(
      (t) => !(t.id === taskId && t.workspaceId === id),
    );
    if (next.length === local.length) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }
    await writeLocalTasks(next);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to delete local task file entry:", err);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
