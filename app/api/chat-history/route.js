import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const CHAT_STORAGE_DIR = path.join(process.cwd(), "chat-history-storage");
const MAX_HISTORY_MESSAGES = 20;

async function readChatFile(chatId) {
  await fs.promises.mkdir(CHAT_STORAGE_DIR, { recursive: true });
  const filePath = path.join(CHAT_STORAGE_DIR, `${chatId}.json`);
  try {
    const data = await fs.promises.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function writeChatFile(chatId, history) {
  await fs.promises.mkdir(CHAT_STORAGE_DIR, { recursive: true });
  const filePath = path.join(CHAT_STORAGE_DIR, `${chatId}.json`);
  await fs.promises.writeFile(filePath, JSON.stringify(history, null, 2), "utf8");
}

export const runtime = "nodejs";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const chatId = searchParams.get("chatId");

  if (!chatId) {
    return NextResponse.json(
      { error: "Missing chatId" },
      { status: 400 },
    );
  }

  const history = await readChatFile(chatId);
  return NextResponse.json(history);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const chatId = body?.chatId;
    const message = body?.message;

    if (!chatId) {
      return NextResponse.json(
        { error: "Missing chatId" },
        { status: 400 },
      );
    }

    if (!message || !message.role || typeof message.content !== "string") {
      return NextResponse.json(
        { error: "Missing message payload" },
        { status: 400 },
      );
    }

    const history = await readChatFile(chatId);
    const entry = {
      id: message.id || Date.now().toString(),
      role: message.role,
      content: message.content,
      createdAt: message.createdAt || new Date().toISOString(),
    };
    const nextHistory = [...history, entry].slice(-MAX_HISTORY_MESSAGES);

    await writeChatFile(chatId, nextHistory);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Save failed" }, { status: 500 });
  }
}
