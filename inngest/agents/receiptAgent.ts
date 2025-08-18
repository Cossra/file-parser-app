import { createAgent, createTool } from "@inngest/agent-kit";
import { z } from "zod";
import { openai } from "inngest";

// Tool: documentParser
const documentParser = createTool({
  name: "document-parser",
  description:
    "Reads a PDF file from a URL and attempts to pull out structured receipt details.",
  parameters: z.object({
    pdfUrl: z.string().describe("Direct link to the PDF file to be parsed."),
  }),
  handler: async ({ pdfUrl }, { step }) => {
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
                  source: {
                    type: "url",
                    url: pdfUrl,
                  },
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
      } as any // 👈 cast fixes TS red squiggles
    );
  },
});


// Agent: receiptAgent
export const receiptAgent = createAgent({
  name: "Receipt Data Agent",
  description:
    "Extracts and normalizes key information from uploaded receipts into a consistent format.",
  system: `You are a utility agent designed to transform receipt documents into clean JSON.
Follow these principles:
1. Always identify merchant details (store name, address, contact).
2. Capture transaction information (date, payment method, receipt number).
3. List items purchased, including name, quantity, unit price, and total.
4. Provide totals with currency, taxes, and final amount.
5. Correct obvious OCR mistakes and standardize formats (dates, amounts).
6. If details are missing, mark them clearly rather than inventing values.`,

  // ✅ Keep openai() but cast to any
  model: openai({
    model: "gpt-4o-mini",
    defaultParameters: {
      max_completion_tokens: 2000,
    },
  }) as any,

  tools: [documentParser],
});


