"use client";

import { useChat } from "@ai-sdk/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, User, Bot, Loader2 } from "lucide-react";

export default function ChatPage() {
  // useChat automatically hits /api/chat by default
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] max-w-4xl mx-auto p-6">
      <ScrollArea className="flex-1 pr-4 mb-4">
        <div className="space-y-6">
          {messages.map((m) => (
            <div key={m.id} className="...">
              {/* Always check for parts first, then fallback to content */}
              {m.parts ? (
                m.parts.map((part, i) =>
                  part.type === "text" ? (
                    <span key={i}>{part.text}</span>
                  ) : null,
                )
              ) : (
                <span>{m.content}</span>
              )}
            </div>
          ))}

          {isLoading && (
            <Loader2 className="h-4 w-4 animate-spin text-zinc-400" />
          )}
        </div>
      </ScrollArea>

      <form
        onSubmit={handleSubmit}
        className="flex gap-2 p-2 border rounded-full bg-white shadow-sm focus-within:ring-1 ring-zinc-200"
      >
        <Input
          placeholder="Ask Apex about a topic..."
          className="border-0 focus-visible:ring-0 shadow-none bg-transparent"
          value={input}
          onChange={handleInputChange}
        />
        <Button
          type="submit"
          size="icon"
          className="rounded-full shrink-0"
          disabled={isLoading}
        >
          <Send size={18} />
        </Button>
      </form>
    </div>
  );
}
