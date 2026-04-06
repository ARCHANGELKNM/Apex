"use client";
import { useState } from "react";
import  DropZone  from "@/components/dropzone/dropzone";

export default function Home() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (base64) => {
    setLoading(true);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        body: JSON.stringify({ image: base64 }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setResult(JSON.parse(data)); // Parse the AI's JSON string
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto py-20 px-6">
      {!result ? (
        <DropZone onUpload={handleUpload} />
      ) : (
        <div className="bg-white border rounded-xl p-8 shadow-sm">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">
            Analysis Results
          </h2>
          <pre className="text-sm bg-zinc-50 p-4 rounded overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
          <button
            onClick={() => setResult(null)}
            className="mt-6 text-sm text-zinc-500 hover:underline"
          >
            Analyze another paper
          </button>
        </div>
      )}
    </main>
  );
}
