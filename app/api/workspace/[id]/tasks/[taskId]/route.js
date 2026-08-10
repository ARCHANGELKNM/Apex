import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "@/src/db";
import { tasks, workspaces } from "@/src/db/schema";
import { eq } from "drizzle-orm";

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
    return NextResponse.json({ error: "Completed value is required" }, { status: 400 });
  }

  const updatedRows = await db
    .update(tasks)
    .set({ completed: body.completed })
    .where(eq(tasks.id, taskId), eq(tasks.workspaceId, id))
    .returning();

  const updated = updatedRows[0];
  if (!updated) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
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

  await db.delete(tasks).where(eq(tasks.id, taskId), eq(tasks.workspaceId, id));
  return NextResponse.json({ ok: true });
}
