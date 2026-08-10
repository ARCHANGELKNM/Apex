import OpenAI from "openai";

export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req) {
  try {
    const { messages } = await req.json();

    // 🧹 SANITIZE: Remove 'id' field, keep only 'role' and 'content'
    const cleanMessages = messages.map(({ role, content }) => ({
      role,
      content,
    }));

    // 2. call Groq directly
    const response = await openai.chat.completions.create({
      model: "llama-3.1-8b-instant",
      stream: true,
      messages: cleanMessages, // 👈 Send the clean version
    });

    // 3. Create a raw web stream
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of response) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              controller.enqueue(encoder.encode(content));
            }
          }
        } catch (err) {
          controller.error(err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (error) {
    console.error("💥 CRASH:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
