"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowUp,
  Terminal,
  User,
  Cpu,
  AlertCircle,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function RetroChatRoom() {
  const params = useParams();
  const subject = params.id ? params.id.toUpperCase() : "GENERAL";
  const chatId = `chat_${subject.toLowerCase()}`;

  const [messages, setMessages] = useState([
    {
      id: "init",
      role: "system",
      content: `You are Apex Tutor the user on ${subject}. Adjust your responses accordingly.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const bottomRef = useRef(null);
  const MAX_HISTORY_MESSAGES = 20;

  useEffect(() => {
    function loadHistory() {
      if (typeof window === "undefined") return;

      try {
        const stored = window.localStorage.getItem(chatId);
        const history = stored ? JSON.parse(stored) : [];

        if (Array.isArray(history) && history.length > 0) {
          setMessages([
            {
              id: "init",
              role: "system",
              content: `You are Apex Tutor the user on ${subject}. Adjust your responses accordingly.`,
            },
            ...history,
          ]);
        }
      } catch (err) {
        console.error(err);
      }
    }

    loadHistory();
  }, [chatId, subject]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const saveMessage = async (message) => {
    if (typeof window === "undefined") return;

    try {
      const stored = window.localStorage.getItem(chatId);
      const history = stored ? JSON.parse(stored) : [];
      const entry = {
        id: message.id || Date.now().toString(),
        role: message.role,
        content: message.content,
        createdAt: message.createdAt || new Date().toISOString(),
      };
      const nextHistory = [...history, entry].slice(-MAX_HISTORY_MESSAGES);
      window.localStorage.setItem(chatId, JSON.stringify(nextHistory));
    } catch (err) {
      console.error("Chat history save failed:", err);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsgId = Date.now().toString();
    const userMsg = { id: userMsgId, role: "user", content: input };
    const newHistory = [...messages, userMsg];

    setMessages(newHistory);
    setInput("");
    setError(null);
    setIsLoading(true);

    await saveMessage(userMsg);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newHistory.map(({ role, content }) => ({ role, content })),
        }),
      });

      if (!response.ok)
        throw new Error(`AI request failed: ${response.status}`);
      if (!response.body) throw new Error("No AI response body");

      const aiMsgId = Date.now().toString() + "_ai";
      setMessages((prev) => [
        ...prev,
        { id: aiMsgId, role: "assistant", content: "" },
      ]);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let fullAiResponse = "";

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value, { stream: true });
        fullAiResponse += chunkValue;

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiMsgId ? { ...msg, content: fullAiResponse } : msg,
          ),
        );
      }

      if (fullAiResponse.trim()) {
        await saveMessage({
          id: `${aiMsgId}_saved`,
          role: "assistant",
          content: fullAiResponse,
          createdAt: new Date().toISOString(),
        });
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "AI connection failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100dvh-6rem)] md:h-[calc(100dvh-4rem)] flex flex-col bg-white">
      <div className="border-b-4 border-black p-4 bg-purple-300 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <Link href="/userdashboard">
            <Button
              variant="outline"
              className="border-2 border-black p-1 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] h-8 w-8 flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
            </Button>
          </Link>
          <div className="min-w-0">
            <h3 className="font-black uppercase text-sm tracking-tight text-black truncate">
              PROTOCOL: {subject}
            </h3>
            <span className="font-mono text-[10px] font-bold text-slate-700 uppercase flex items-center gap-1">
              <Cpu className="w-3 h-3 shrink-0" /> MANUAL_ENGINE_V8
            </span>
          </div>
        </div>
        <Badge
          variant="black"
          className={`text-white text-[10px] font-mono font-bold shrink-0 ${isLoading ? "bg-red-500 animate-pulse" : "bg-black"}`}
        >
          {isLoading ? "COMPUTING..." : "LIVE_FEED"}
        </Badge>
      </div>

      <div className="flex-1 p-4 md:p-6 overflow-y-auto bg-[#F1EFE6] space-y-6 font-mono text-xs">
        {messages.length <= 1 && (
          <div className="text-center text-slate-400 mt-10 opacity-50">
            <Terminal className="w-12 h-12 mx-auto mb-2" />
            <p>SYSTEM READY.</p>
          </div>
        )}

        {messages
          .filter((m) => m.role !== "system")
          .map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 max-w-[90%] ${m.role === "user" ? "ml-auto justify-end" : ""}`}
            >
              <div
                className={`border-2 border-black p-2 h-fit shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                  m.role === "user" ? "bg-cyan-300 order-2" : "bg-yellow-300"
                }`}
              >
                {m.role === "user" ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Terminal className="w-4 h-4" />
                )}
              </div>

              <Card
                variant="brutal"
                className={`border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-sans text-sm text-black rounded-none flex-1 ${
                  m.role === "user" ? "bg-cyan-100 text-right" : "bg-white"
                }`}
              >
                <div
                  className={`leading-relaxed prose prose-sm max-w-none ${
                    m.role === "user"
                      ? "prose-p:text-right"
                      : "prose-headings:font-bold prose-a:text-pink-600"
                  }`}
                >
                  {m.role === "user" ? (
                    <p>{m.content}</p>
                  ) : (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        strong: ({ node, ...props }) => (
                          <span
                            className="font-black bg-yellow-200 px-1 border border-black"
                            {...props}
                          />
                        ),
                        ul: ({ node, ...props }) => (
                          <ul
                            className="list-disc pl-4 space-y-1 my-2"
                            {...props}
                          />
                        ),
                        ol: ({ node, ...props }) => (
                          <ol
                            className="list-decimal pl-4 space-y-1 my-2"
                            {...props}
                          />
                        ),
                        code: ({ node, inline, ...props }) =>
                          inline ? (
                            <code
                              className="bg-gray-200 px-1 font-mono text-xs border border-gray-400 rounded-sm"
                              {...props}
                            />
                          ) : (
                            <div className="bg-black text-green-400 p-3 rounded-none my-2 overflow-x-auto border-2 border-gray-500 font-mono text-xs">
                              <code {...props} />
                            </div>
                          ),
                      }}
                    >
                      {m.content}
                    </ReactMarkdown>
                  )}
                </div>
              </Card>
            </div>
          ))}

        {error && (
          <div className="bg-red-100 border-2 border-red-600 p-4 text-red-700 font-bold flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            ERROR: {error}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={handleSend}
        className="border-t-4 border-black p-4 bg-white flex flex-col gap-3 shrink-0"
      >
        <div className="flex gap-3 w-full min-w-0">
          <input
            className="flex-1 min-w-0 p-3 border-2 border-black font-mono text-sm bg-[#F9F6EE] font-bold focus:outline-none focus:bg-white h-12 placeholder:text-slate-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type here..."
          />
          <button
            type="submit"
            aria-label="Send message"
            disabled={isLoading || !input.trim()}
            className="border-2 border-black bg-pink-500 hover:bg-pink-400 text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] h-12 w-12 flex items-center justify-center shrink-0 disabled:opacity-50 disabled:bg-gray-300 transition-all active:translate-y-1 active:shadow-none"
          >
            <ArrowUp className="w-6 h-6 stroke-3" />
          </button>
        </div>
      </form>
    </div>
  );
}
