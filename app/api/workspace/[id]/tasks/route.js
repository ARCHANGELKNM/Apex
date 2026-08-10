import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "@/src/db";
import { tasks, workspaces } from "@/src/db/schema";
import { eq, asc } from "drizzle-orm";

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

  const data = await db
    .select()
    .from(tasks)
    .where(eq(tasks.workspaceId, id))
    .orderBy(asc(tasks.dueDate));

  return NextResponse.json(data);
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
    return NextResponse.json({ error: "Title and due date are required" }, { status: 400 });
  }

  const inserted = await db
    .insert(tasks)
    .values({
      title,
      dueDate: new Date(dueDate),
      workspaceId: workspace.id,
    })
    .returning();

  return NextResponse.json(inserted[0] || null);
}
