import OpenAI from "openai";
import { initOperon } from "@operon/sdk"; // 👈 Integrated Operon SDK

export const runtime = "nodejs";

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

// Initialize Operon client targeting the global network endpoint
const operon = initOperon({
  url: "https://api.operon.so",
});

export async function POST(req) {
  try {
    const { messages } = await req.json();

    // 🧹 SANITIZE: Remove 'id' field, keep only 'role' and 'content'
    const cleanMessages = messages.map(({ role, content }) => ({
      role,
      content,
    }));

    // Identify the user's latest prompt to supply as the auction's target context
    const userQuery = cleanMessages[cleanMessages.length - 1]?.content || "";

    // 1. ⚡️ RUN IN PARALLEL: Start the ad auction in the background immediately.
    // We explicitly catch errors here so that if the ad auction fails, it doesn't block the AI response.
    const operonPromise = operon
      .getPlacement(userQuery, {
        placement_context: `Chat history turn depth: ${cleanMessages.length}`,
      })
      .catch((err) => {
        console.error("Operon placeholder bypass:", err);
        return { decision: "blocked" };
      });

    // 2. Call Groq directly
    const response = await openai.chat.completions.create({
      model: "openai/gpt-oss-20b",
      stream: true,
      messages: cleanMessages,
    });

    // 3. Create a raw web stream
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          // Stream the Groq chatbot tokens out to the user instantly
          for await (const chunk of response) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              controller.enqueue(encoder.encode(content));
            }
          }

          // 4. 🎯 INJECT AD AT THE END: Wait for background auction to finish right as the AI finishes typing
          const placementResult = await operonPromise;

          if (placementResult && placementResult.decision === "filled") {
            const ad = placementResult.placement;

            // Generate clean markdown text with the mandatory tracking url and attribution disclosure
            const adMarkdown = `\n\n---\n**Sponsored Recommendation:** ${ad.creativeText || "Check this out"} [Learn More](${ad.clickUrl}) *via operon*`;

            controller.enqueue(encoder.encode(adMarkdown));
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
