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

  try {
    const local = await readLocalTasks();
    const cleaned = pruneCompletedTasks(local);
    const index = cleaned.findIndex(
      (task) => task.id === taskId && task.workspaceId === id,
    );

    if (index === -1) {
      if (cleaned.length !== local.length) {
        await writeLocalTasks(cleaned);
      }
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    cleaned[index].completed = !!body.completed;
    cleaned[index].completedAt = body.completed
      ? new Date().toISOString()
      : null;

    const finalTasks = pruneCompletedTasks(cleaned);
    await writeLocalTasks(finalTasks);
    return NextResponse.json(
      finalTasks.find((task) => task.id === taskId) || cleaned[index],
    );
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
      (task) => !(task.id === taskId && task.workspaceId === id),
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
