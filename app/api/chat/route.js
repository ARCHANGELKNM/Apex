import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const runtime = "edge"; // Optional: Makes it faster on Vercel

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY || "",
  baseURL: "https://api.groq.com/openai/v1", // 👈 Pointing to Groq
});

export async function POST(req) {
  try {
    // 1. Get the message
    const { messages } = await req.json();

    // 2. Log for debugging
    console.log("🔥 Connecting to Groq via Direct Client...");

    // 3. Create the Completion
    const response = await openai.chat.completions.create({
      model: "llama-3.1-8b-instant",
      stream: true,
      messages: messages,
    });

    // 4. Convert to Stream (The "Old Reliable" Way)
    const stream = OpenAIStream(response);

    // 5. Return the Stream
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error("💥 CRASH:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
