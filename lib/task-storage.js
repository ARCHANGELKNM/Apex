import fs from "fs";
import path from "path";

const COMPLETED_TASK_RETENTION_MS = 3 * 24 * 60 * 60 * 1000;

function isWritableDirectory(dirPath) {
  try {
    fs.mkdirSync(dirPath, { recursive: true });
    fs.accessSync(dirPath, fs.constants.W_OK);
    return true;
  } catch {
    return false;
  }
}

export function resolveTaskStorageFile() {
  const candidates = [
    process.env.TASK_STORAGE_PATH
      ? path.resolve(process.env.TASK_STORAGE_PATH)
      : null,
    path.join(process.cwd(), "task-storage"),
    path.join(process.cwd(), "apex", "task-storage"),
    path.join("/tmp", "apex-task-storage"),
  ];

  const dir = candidates.find((candidate) => candidate && isWritableDirectory(candidate));

  const storageDir = dir || path.join("/tmp", "apex-task-storage");
  return path.join(storageDir, "tasks.json");
}

export function pruneCompletedTasks(tasks) {
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

export async function readLocalTasks() {
  const filePath = resolveTaskStorageFile();

  try {
    const dir = path.dirname(filePath);
    await fs.promises.mkdir(dir, { recursive: true });

    try {
      const raw = await fs.promises.readFile(filePath, "utf8");
      return JSON.parse(raw || "[]");
    } catch (readError) {
      if (readError.code !== "ENOENT") {
        throw readError;
      }

      await fs.promises.writeFile(filePath, "[]", "utf8");
      return [];
    }
  } catch {
    return [];
  }
}

export async function writeLocalTasks(tasks) {
  const filePath = resolveTaskStorageFile();
  const dir = path.dirname(filePath);

  await fs.promises.mkdir(dir, { recursive: true });
  await fs.promises.writeFile(filePath, JSON.stringify(tasks, null, 2), "utf8");
}
