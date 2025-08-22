import { createAgent, createTool } from "@inngest/agent-kit";
import { z } from "zod";
import OpenAI from "openai";
import pdf from "pdf-parse";


const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// Tool: documentParser
export const documentParser = createTool({
  name: "document-parser",
  description:
    "Reads a PDF file from a URL and attempts to pull out structured receipt details.",
  parameters: z.object({
    pdfUrl: z.string().describe("Direct link to the PDF file to be parsed."),
  }),
  handler: async ({ pdfUrl }) => {
    console.log("🔎 [receiptAgent.ts] documentParser called with pdfUrl:", pdfUrl);

    try {
      // 1. Download PDF (Next.js has fetch built-in)
      const res = await fetch(pdfUrl);
      if (!res.ok) {
        throw new Error(`Failed to fetch PDF: ${res.status} ${res.statusText}`);
      }

      // 2. Convert to Buffer for pdf-parse
      const arrayBuffer = await res.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // 3. Extract text from PDF
      const data = await pdf(buffer);
      console.log("📄 Extracted text preview:", data.text.slice(0, 200));

      // 4. Send extracted text to OpenAI
      console.log("🤖 [receiptAgent.ts] Calling OpenAI with model=gpt-4o-mini...");
      console.log("🔑 [receiptAgent.ts] OPENAI_API_KEY present?", !!process.env.OPENAI_API_KEY);

      const result = await client.chat.completions.create({
        model: "gpt-4o-mini", // ✅ cheaper and plenty good for receipts
        messages: [
          {
            role: "user",
            content: `Here is the text of a receipt:\n\n${data.text}\n\nPlease provide a structured JSON object with these fields:
{
  "merchant": { "name": "", "address": "", "contact": "" },
  "transaction": { "date": "", "receipt_number": "", "payment_method": "" },
  "items": [
    { "name": "", "quantity": 0, "unit_price": 0, "total_price": 0 }
  ],
  "totals": { "subtotal": 0, "tax": 0, "total": 0, "currency": "" }
}`,
          },
        ],
        max_completion_tokens: 1500,
      });

      console.log("✅ [receiptAgent.ts] OpenAI returned:", result.choices[0].message);
      return result.choices[0].message;
    } catch (err) {
      console.error("❌ [receiptAgent.ts] Error during OpenAI call:", err);
      throw err;
    }
  },
});

// Agent: receiptAgent
export const receiptAgent = createAgent({
  name: "Receipt Data Agent",
  description: "Extracts and normalizes key information from uploaded receipts.",
  system: `You are a utility agent designed to transform receipt documents into clean JSON.
Follow these principles:
1. Always identify merchant details.
2. Capture transaction information.
3. List items purchased.
4. Provide totals with currency.
5. Correct OCR mistakes.
6. Don’t invent data if missing.`,
  tools: [documentParser],
});
