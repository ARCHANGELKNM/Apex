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
  RotateCw,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PublisherBanner } from "@/components/ads/PublisherAds";

export default function RetroChatRoom() {
  const params = useParams();
  const subject = params?.id ? params.id.toUpperCase() : "GENERAL";
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
  const [isLandscapeMobile, setIsLandscapeMobile] = useState(false);

  const bottomRef = useRef(null);
  const MAX_HISTORY_MESSAGES = 20;

  useEffect(() => {
    const updateOrientation = () => {
      if (typeof window === "undefined") return;
      const isMobileLandscape =
        window.innerWidth < 960 && window.innerWidth > window.innerHeight;
      setIsLandscapeMobile(isMobileLandscape);
    };

    updateOrientation();
    window.addEventListener("resize", updateOrientation);
    window.addEventListener("orientationchange", updateOrientation);

    return () => {
      window.removeEventListener("resize", updateOrientation);
      window.removeEventListener("orientationchange", updateOrientation);
    };
  }, []);

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
      setError(err?.message ?? "AI connection failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const markdownComponents = {
    p: ({ node, ...props }) => (
      <p
        className="my-2 leading-relaxed text-[0.95em] text-slate-800"
        {...props}
      />
    ),
    h1: ({ node, ...props }) => (
      <h1
        className="mt-4 mb-2 text-lg font-black uppercase tracking-tight text-black"
        {...props}
      />
    ),
    h2: ({ node, ...props }) => (
      <h2
        className="mt-4 mb-2 text-base font-black uppercase tracking-tight text-black"
        {...props}
      />
    ),
    h3: ({ node, ...props }) => (
      <h3
        className="mt-3 mb-1.5 text-sm font-black uppercase tracking-tight text-black"
        {...props}
      />
    ),
    h4: ({ node, ...props }) => (
      <h4
        className="mt-3 mb-1 text-sm font-black uppercase tracking-tight text-slate-800"
        {...props}
      />
    ),
    strong: ({ node, ...props }) => (
      <strong
        className="font-black bg-yellow-200 px-1 border border-black text-black"
        {...props}
      />
    ),
    em: ({ node, ...props }) => (
      <em
        className="italic bg-pink-100 px-1 border border-black text-black"
        {...props}
      />
    ),
    a: ({ node, ...props }) => (
      <a
        className="font-bold underline underline-offset-2 text-pink-700 decoration-2"
        target="_blank"
        rel="noreferrer"
        {...props}
      />
    ),
    ul: ({ node, ...props }) => (
      <ul
        className="list-disc pl-5 my-3 space-y-1.5 text-slate-800"
        {...props}
      />
    ),
    ol: ({ node, ...props }) => (
      <ol
        className="list-decimal pl-5 my-3 space-y-1.5 text-slate-800"
        {...props}
      />
    ),
    li: ({ node, ...props }) => <li className="leading-relaxed" {...props} />,
    blockquote: ({ node, ...props }) => (
      <blockquote
        className="my-3 border-l-4 border-black bg-[#f9f3d8] pl-3 py-2 italic text-slate-700"
        {...props}
      />
    ),
    hr: ({ node, ...props }) => (
      <hr className="my-4 border-t-2 border-black" {...props} />
    ),
    table: ({ node, ...props }) => (
      <div className="my-3 overflow-x-auto border-2 border-black bg-white">
        <table
          className="min-w-full border-collapse text-left text-[0.82rem]"
          {...props}
        />
      </div>
    ),
    thead: ({ node, ...props }) => (
      <thead className="bg-[#f2efe7]" {...props} />
    ),
    th: ({ node, ...props }) => (
      <th
        className="border border-black px-2 py-1.5 align-top text-[10px] font-black uppercase tracking-[0.12em] text-slate-700"
        {...props}
      />
    ),
    td: ({ node, ...props }) => (
      <td
        className="border border-black px-2 py-1.5 align-top text-slate-800"
        {...props}
      />
    ),
    tr: ({ node, ...props }) => <tr className="align-top" {...props} />,
    code: ({ node, inline, className, children, ...props }) => {
      if (inline) {
        return (
          <code
            className="rounded-none border border-black bg-gray-200 px-1 py-0.5 font-mono text-[0.8em] text-black"
            {...props}
          >
            {children}
          </code>
        );
      }

      return (
        <div className="my-3 overflow-x-auto border-2 border-black bg-black p-3">
          <code
            className="block font-mono text-[0.74rem] leading-relaxed text-green-400"
            {...props}
          >
            {children}
          </code>
        </div>
      );
    },
    pre: ({ node, ...props }) => (
      <pre
        className="my-3 overflow-x-auto border-2 border-black bg-black p-3"
        {...props}
      />
    ),
  };

  return (
    <>
      {isLandscapeMobile && (
        <div className="fixed inset-0 z-70 flex items-center justify-center bg-[#F9F6EE]/95 md:hidden">
          <div className="mx-6 border-4 border-black bg-white p-8 text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] max-w-sm">
            <RotateCw className="mx-auto mb-4 h-8 w-8 text-black" />
            <p className="font-black uppercase tracking-tight text-black text-lg">
              Rotate device
            </p>
            <p className="font-mono text-xs uppercase mt-2 text-slate-600">
              portrait mode keeps the chat clean
            </p>
          </div>
        </div>
      )}

      <div className="flex min-h-[calc(100dvh-4rem)] flex-col bg-[var(--background)]">
        <div className="border-b border-[rgba(23,20,17,0.08)] px-3 py-2.5 bg-gradient-to-r from-[#171a1f] to-[#1f2228] text-[#f5f0e9] flex items-center justify-between gap-3 shrink-0 sm:px-4 sm:py-3 rounded-b-2xl">
          <div className="flex items-center gap-3 min-w-0">
            <Link href="/userdashboard">
              <Button
                variant="outline"
                className="border border-white/10 p-1 bg-white/5 shadow-[0_10px_18px_rgba(0,0,0,0.18)] h-8 w-8 flex items-center justify-center text-[#f5f0e9]"
              >
                <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
              </Button>
            </Link>
            <div className="min-w-0">
              <h3 className="font-black uppercase text-sm tracking-tight text-[#f5f0e9] truncate sm:text-base">
                PROTOCOL: {subject}
              </h3>
              <span className="font-mono text-[9px] font-bold text-[#d4c5ae] uppercase flex items-center gap-1 sm:text-[10px]">
                <Cpu className="w-3 h-3 shrink-0" /> MANUAL_ENGINE_V8
              </span>
            </div>
          </div>
          <Badge
            variant="black"
            className={`text-[#171411] text-[9px] font-mono font-bold shrink-0 sm:text-[10px] ${isLoading ? "bg-[#f0c29b] animate-pulse" : "bg-gradient-to-r from-[#d7ba80] to-[#f2e0b4]"}`}
          >
            {isLoading ? "COMPUTING..." : "LIVE_FEED"}
          </Badge>
        </div>

        <div className="flex-1 overflow-y-visible bg-transparent px-0 py-2 space-y-2 font-mono text-[13px] sm:text-sm md:overflow-y-auto md:bg-[rgba(255,255,255,0.45)] md:px-4 md:py-4">
          <div className="rounded-none border-4 border-black bg-white p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-1 sm:p-3 sm:mb-3">
            <div className="font-black uppercase text-[10px] tracking-[0.12em] text-slate-700 sm:text-[11px]">
              Next steps
            </div>
            <div className="mt-1.5 grid gap-1 text-[10px] font-bold text-slate-800 sm:text-[11px]">
              <div>Plan this topic</div>
              <div>Build a revision path</div>
              <div>Turn notes into tasks</div>
            </div>
          </div>

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
                className={`flex items-start gap-1.5 w-full max-w-[98%] sm:max-w-[88%] ${m.role === "user" ? "ml-auto justify-end" : ""}`}
              >
                <div
                  className={`border border-[rgba(23,20,17,0.08)] p-2 h-fit shrink-0 shadow-[0_12px_24px_rgba(17,17,17,0.08)] rounded-xl ${
                    m.role === "user"
                      ? "bg-[#171a1f] text-[#f5f0e9] order-2"
                      : "bg-gradient-to-br from-[#d7ba80] to-[#f2e0b4] text-[#171411]"
                  }`}
                >
                  {m.role === "user" ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Terminal className="w-4 h-4" />
                  )}
                </div>

                <div className="hidden md:block flex-1">
                  <Card
                    variant="brutal"
                    className={`border border-[rgba(23,20,17,0.08)] p-4 shadow-[0_16px_28px_rgba(17,17,17,0.08)] font-sans text-sm rounded-2xl flex-1 ${
                      m.role === "user"
                        ? "bg-[rgba(23,26,31,0.96)] text-[#f5f0e9] text-right"
                        : "bg-[rgba(255,255,255,0.78)] text-[var(--foreground)]"
                    }`}
                  >
                    <div
                      className={`leading-relaxed prose prose-base max-w-none ${
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
                          components={markdownComponents}
                        >
                          {m.content}
                        </ReactMarkdown>
                      )}
                    </div>
                  </Card>
                </div>

                <div className="block md:hidden flex-1 min-w-0">
                  <div
                    className={`border-0 border-black px-2 py-2 font-sans text-sm text-black rounded-none ${
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
                          components={markdownComponents}
                        >
                          {m.content}
                        </ReactMarkdown>
                      )}
                    </div>
                  </div>
                </div>
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

        <PublisherBanner className="shrink-0 border-x-0" />

        <form
          onSubmit={handleSend}
          className="border-t-4 border-black px-1.5 py-2 bg-white flex flex-col gap-2 shrink-0 sm:px-3 sm:py-3"
        >
          <div className="flex gap-2 w-full min-w-0">
            <input
              className="flex-1 min-w-0 px-3 py-2 border-2 border-black font-mono text-sm bg-[#F9F6EE] font-bold focus:outline-none focus:bg-white h-11 placeholder:text-slate-400"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type here..."
            />
            <button
              type="submit"
              aria-label="Send message"
              disabled={isLoading || !input.trim()}
              className="border border-[rgba(23,20,17,0.08)] bg-gradient-to-r from-[#d7ba80] to-[#f2e0b4] hover:brightness-105 text-[#171411] shadow-[0_12px_24px_rgba(212,178,119,0.24)] h-11 w-11 flex items-center justify-center shrink-0 disabled:opacity-50 disabled:bg-gray-300 transition-all active:translate-y-0.5 rounded-2xl"
            >
              <ArrowUp className="w-5 h-5 stroke-3" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
