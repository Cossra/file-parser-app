import { createAgent, createTool } from "@inngest/agent-kit";
import { z } from "zod";
import { openai } from "inngest";

// Tool: documentParser
export const documentParser = createTool({
  name: "document-parser",
  description:
    "Reads a PDF file from a URL and attempts to pull out structured receipt details.",
  parameters: z.object({
    pdfUrl: z.string().describe("Direct link to the PDF file to be parsed."),
  }),
  handler: async ({ pdfUrl }, { step }: { step?: any }) => {
    return await step?.ai.infer(
      "receipt-extraction",
      {
        model: "claude-3-5-sonnet-20241022",
        defaultParameters: {
          max_tokens: 3000,
        },
        body: {
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "document",
                  source: { type: "url", url: pdfUrl },
                },
                {
                  type: "text",
                  text: `Please analyze this receipt and provide a structured JSON object with these fields:
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
            },
          ],
        },
      } as any
    );
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
  model: openai({
    model: "gpt-4o-mini",
    defaultParameters: { max_completion_tokens: 2000 },
  }) as any,
  tools: [documentParser],
});
