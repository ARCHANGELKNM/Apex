"use client";
import { useState } from "react";

export default function ManualTest() {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("IDLE");
  const [logs, setLogs] = useState([]);

  async function forceSendMessage(e) {
    e.preventDefault();
    setStatus("SENDING...");

    // 1. Log to screen
    setLogs((prev) => [...prev, `🚀 Attempting to send: "${input}"`]);

    try {
      // 2. RAW FETCH (No SDK)
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: input }],
        }),
      });

      // 3. Check Response
      if (response.ok) {
        setLogs((prev) => [...prev, "✅ SERVER RECEIVED IT! (Check Terminal)"]);
        setStatus("SUCCESS");
      } else {
        setLogs((prev) => [...prev, `❌ SERVER ERROR: ${response.status}`]);
        setStatus("ERROR");
      }
    } catch (err) {
      setLogs((prev) => [...prev, `💀 BROWSER FAILED: ${err.message}`]);
      setStatus("CRASH");
    }
  }

  return (
    <div className="p-10 font-mono text-sm">
      <h1 className="text-xl font-bold mb-6">MANUAL IGNITION TEST</h1>

      {/* Visual Log */}
      <div className="bg-black text-green-400 p-4 mb-6 h-48 overflow-y-auto rounded border-4 border-gray-500">
        {logs.length === 0
          ? "WAITING FOR INPUT..."
          : logs.map((l, i) => <div key={i}>{l}</div>)}
      </div>

      <form onSubmit={forceSendMessage} className="flex gap-4">
        <input
          className="border-2 border-black p-3 flex-1 font-bold"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type 'TEST' here..."
        />
        <button
          type="submit"
          className="bg-red-600 text-white px-6 py-3 font-black uppercase tracking-widest hover:bg-red-700"
        >
          Launch
        </button>
      </form>

      <div className="mt-4 font-bold">STATUS: {status}</div>
    </div>
  );
}
