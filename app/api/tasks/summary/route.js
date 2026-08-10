import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "@/src/db";
import { tasks, workspaces } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ total: 0, completed: 0, overdue: 0 }, { status: 401 });
  }

  const taskRows = await db
    .select({ completed: tasks.completed, dueDate: tasks.dueDate })
    .from(tasks)
    .leftJoin(workspaces, eq(tasks.workspaceId, workspaces.id))
    .where(eq(workspaces.userId, user.id));

  const now = new Date();
  const total = taskRows.length;
  const completed = taskRows.filter((row) => row.completed).length;
  const overdue = taskRows.filter((row) => !row.completed && new Date(row.dueDate) < now).length;

  return NextResponse.json({ total, completed, overdue });
}
