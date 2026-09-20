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

export async function GET() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return NextResponse.json(
      { total: 0, completed: 0, overdue: 0 },
      { status: 401 },
    );
  }

  const rows = await db
    .select({ id: workspaces.id })
    .from(workspaces)
    .where(eq(workspaces.userId, user.id));

  const workspaceIds = rows.map((r) => r.id);
  const local = await readLocalTasks();
  const cleaned = pruneCompletedTasks(local);

  if (cleaned.length !== local.length) {
    await writeLocalTasks(cleaned);
  }

  const now = new Date();
  const userTasks = cleaned.filter((task) =>
    workspaceIds.includes(task.workspaceId),
  );
  const total = userTasks.length;
  const completed = userTasks.filter((task) => task.completed).length;
  const overdue = userTasks.filter(
    (task) => !task.completed && new Date(task.dueDate) < now,
  ).length;

  return NextResponse.json({ total, completed, overdue });
}
