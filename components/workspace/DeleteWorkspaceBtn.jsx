"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DeleteWorkspaceBtn({ workspaceId }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    setLoading(true);
    try {
      const res = await fetch(`/api/workspace/${workspaceId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      
      try {
        window.dispatchEvent(
          new CustomEvent("workspace-deleted", { detail: { id: workspaceId } })
        );
      } catch (e) {
        // noop - window may not be available in some environments
      }

      // Navigate back to workspace list
      router.push("/workspace");
    } catch (err) {
      console.error(err);
      alert("Failed to delete workspace");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      onClick={handleDelete}
      variant="destructive"
      className="border-2 border-black bg-red-600 text-white hover:bg-red-700"
      disabled={loading}
    >
      <Trash2 className="w-4 h-4 mr-2" />
      {loading ? "Deleting..." : "Delete"}
    </Button>
  );
}
