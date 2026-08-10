import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "@/src/db";
import { workspaces } from "@/src/db/schema";
import { eq, asc } from "drizzle-orm";

// GET: Fetch all workspaces for the logged-in user
export async function GET() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) return NextResponse.json([], { status: 401 });

  const data = await db
    .select()
    .from(workspaces)
    .where(eq(workspaces.userId, user.id))
    .orderBy(asc(workspaces.createdAt));

  return NextResponse.json(data);
}

// POST: Create a new workspace (Homework/Study/Paper)
export async function POST(req) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json(); // Expects: { title: "Math", type: "HOMEWORK" }

  const inserted = await db
    .insert(workspaces)
    .values({
      title: body.title,
      type: body.type,
      userId: user.id,
    })
    .returning();

  const newWorkspace = inserted[0] || null;
  return NextResponse.json(newWorkspace);
}
