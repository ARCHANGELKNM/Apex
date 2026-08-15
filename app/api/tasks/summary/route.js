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

export async function GET() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return NextResponse.json(
      { total: 0, completed: 0, overdue: 0 },
      { status: 401 },
    );
  }

  // get workspace ids owned by user
  const rows = await db
    .select({ id: workspaces.id })
    .from(workspaces)
    .where(eq(workspaces.userId, user.id));

  const workspaceIds = rows.map((r) => r.id);

  const local = await readLocalTasks();
  const now = new Date();

  const userTasks = local.filter((t) => workspaceIds.includes(t.workspaceId));

  const total = userTasks.length;
  const completed = userTasks.filter((t) => t.completed).length;
  const overdue = userTasks.filter(
    (t) => !t.completed && new Date(t.dueDate) < now,
  ).length;

  return NextResponse.json({ total, completed, overdue });
}
