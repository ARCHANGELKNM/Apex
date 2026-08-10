import Link from "next/link";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "@/src/db";
import { workspaces, messages } from "@/src/db/schema";
import { eq, asc } from "drizzle-orm";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DeleteWorkspaceBtn from "@/components/workspace/DeleteWorkspaceBtn";
import WorkspaceTaskBoard from "@/components/workspace/WorkspaceTaskBoard";

async function getWorkspace(workspaceId, userId) {
  const [workspace] = await db
    .select()
    .from(workspaces)
    .where(eq(workspaces.id, workspaceId), eq(workspaces.userId, userId));

  return workspace;
}

async function getMessages(workspaceId) {
  return db
    .select()
    .from(messages)
    .where(eq(messages.workspaceId, workspaceId))
    .orderBy(asc(messages.createdAt));
}

export default async function WorkspaceDetailPage({ params }) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const { id } = await params;

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto min-h-[80vh] p-6">
        <Card variant="brutal" className="border-4 border-black bg-white p-6 shadow-[4px_4px_0px_0px_#000]">
          <h1 className="text-xl font-black uppercase mb-3">Sign in required</h1>
          <p className="text-sm text-slate-700 mb-4">
            You need to be signed in to view this workspace.
          </p>
          <Link href="/dashboard">
            <Button variant="outline" className="border-2 border-black">
              Return home
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  const workspace = await getWorkspace(id, user.id);

  if (!workspace) {
    return (
      <div className="max-w-3xl mx-auto min-h-[80vh] p-6">
        <Card variant="brutal" className="border-4 border-black bg-white p-6 shadow-[4px_4px_0px_0px_#000]">
          <h1 className="text-xl font-black uppercase mb-3">Workspace not found</h1>
          <p className="text-sm text-slate-700 mb-4">
            That workspace does not exist or you do not have access.
          </p>
          <Link href="/workspace">
            <Button variant="outline" className="border-2 border-black">
              Back to workspaces
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  const workspaceMessages = await getMessages(workspace.id);
  const typeLabel = workspace.type?.toLowerCase().replace("_", " ") || "unknown";

  return (
    <div className="max-w-3xl mx-auto min-h-[80vh] p-6 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight">{workspace.title}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <Badge variant="black" className="text-xs uppercase">
              {typeLabel}
            </Badge>
            <span className="text-xs font-mono text-slate-600">
              Created {new Date(workspace.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Link href="/workspace">
            <Button variant="outline" className="border-2 border-black">
              Back to workspaces
            </Button>
          </Link>
          <Link href={`/chat/${workspace.id}`}>
            <Button className="border-2 border-black bg-black text-white hover:bg-slate-900">
              Continue chat
            </Button>
          </Link>
          <div>
            {/* Delete button */}
            <DeleteWorkspaceBtn workspaceId={workspace.id} />
          </div>
        </div>
      </div>

      <Card variant="brutal" className="border-4 border-black bg-white p-6 shadow-[4px_4px_0px_0px_#000]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-black uppercase tracking-tight">Workspace summary</h2>
            <p className="text-sm text-slate-700">Review the latest message history or continue the conversation in chat.</p>
          </div>
          <Badge variant="secondary" className="text-xs uppercase">
            {workspaceMessages.length} messages
          </Badge>
        </div>

        {workspaceMessages.length === 0 ? (
          <div className="rounded-sm border border-dashed border-slate-300 p-6 text-sm text-slate-600">
            No messages yet. Open the chat to start a new conversation.
          </div>
        ) : (
          <div className="space-y-3">
            {workspaceMessages.slice(-10).map((message) => (
              <div
                key={message.id}
                className={`rounded-sm border p-4 ${message.role === "user" ? "border-cyan-300 bg-cyan-50" : "border-amber-300 bg-amber-50"}`}
              >
                <div className="mb-2 text-[11px] uppercase font-black tracking-wide text-slate-600">
                  {message.role}
                </div>
                <div className="text-sm text-slate-800 whitespace-pre-wrap">{message.content}</div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <WorkspaceTaskBoard workspaceId={workspace.id} />
    </div>
  );
}
