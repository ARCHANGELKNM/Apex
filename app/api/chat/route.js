import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

const groq = createOpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      model: groq("llama-3.2-11b-vision-preview"),
      // Remove any helper function and pass the array directly
      messages: messages, 
      system: "You are Apex, an elite AI academic tutor. Be concise.",
    });

    // Use the latest standard response method
    return result.toDataStreamResponse();
  } catch (error) {
    console.error("APEX ROUTE ERROR:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
