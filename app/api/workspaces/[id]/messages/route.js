import { NextResponse } from 'next/server';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "@/src/db";
import { messages } from "@/src/db/schema";
import { eq, asc } from "drizzle-orm";

export async function GET(req, { params }) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  
  if (!user) return NextResponse.json([], { status: 401 });

  const { id } = params; // The Workspace ID

  const data = await db
    .select()
    .from(messages)
    .where(eq(messages.workspaceId, id))
    .orderBy(asc(messages.createdAt));

  return NextResponse.json(data);
}
