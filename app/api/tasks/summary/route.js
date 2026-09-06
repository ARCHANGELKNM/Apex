import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kind-auth-nextjs/server";
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
const COMPLETED_TASK_RETENTION_MS = 3 * 24 * 60 * 60 * 1000;

function pruneCompletedTasks(tasks) {
  const now = Date.now();
  return tasks.filter((task) => {
    if (!task.completed) return true;

    const completedAt = task.completedAt
      ? new Date(task.completedAt).getTime()
      : null;
    if (!completedAt) return true;

    return now - completedAt <= COMPLETED_TASK_RETENTION_MS;
  });
}

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

  const rows = await db
    .select({ id: workspaces.id })
    .from(workspaces)
    .where(eq(workspaces.userId, user.id));

  const workspaceIds = rows.map((r) => r.id);
  const local = await readLocalTasks();
  const cleaned = pruneCompletedTasks(local);

  if (cleaned.length !== local.length) {
    await fs.promises.writeFile(
      TASK_STORAGE_FILE,
      JSON.stringify(cleaned, null, 2),
      "utf8",
    );
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
