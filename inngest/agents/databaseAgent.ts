import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import convex from "@/lib/convexClient";
import { client } from "@/lib/schematic";
import { createAgent, createTool, openai } from "@inngest/agent-kit";
import { z } from "zod";

// Schema
const SaveToDbParams = z.object({
  userId: z.string().describe("Clerk user ID for the owner of the receipt"),
  fileDisplayName: z.string(),
  receiptId: z.string(),
  merchantName: z.string(),
  merchantAddress: z.string(),
  merchantContact: z.string(),
  transactionDate: z.string(),
  transactionAmount: z.coerce.number(),
  receiptSummary: z.string(),
  currency: z.string(),
  items: z.array(
    z.object({
      name: z.string(),
      quantity: z.number(),
      unitPrice: z.number(),
      totalPrice: z.number(),
    })
  ),
});
type SaveToDbParams = z.infer<typeof SaveToDbParams>;

// Tool
export const saveToDatabaseTool = createTool({
  name: "save-to-database",
  description: "Saves the given data to the Convex database.",
  parameters: SaveToDbParams,
  handler: async (params: SaveToDbParams, { step }) => {
    const {
      userId,
      fileDisplayName,
      receiptId,
      merchantName,
      merchantAddress,
      merchantContact,
      transactionDate,
      transactionAmount,
      receiptSummary,
      currency,
      items,
    } = params;

    // Call Convex mutation inside a step
      try {
        const args = {
          id: receiptId as Id<"receipts">,
          fileDisplayName,
          merchantName,
          merchantAddress,
          merchantContact,
          date: transactionDate,
          amount: transactionAmount,
          receiptSummary,
          currency,
          items,
        };

        const updatedReceiptId = await convex.mutation(
          api.receipts.updateReceiptWithExtractedData,
          args
        );

        // Optional: track with schematic
        await client.track({
          event: "scan",
          company: { id: userId },
          user: { id: userId },
        });

        return {
          addedToDb: "Success" as const,
          updatedReceiptId,
          ...params,
        };
      } catch (error) {
        return {
          addedToDb: "Failed" as const,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }
});

// Agent
export const databaseAgent = createAgent({
  name: "Database Agent",
  description:
    "Responsible for taking key information regarding receipts and saving it to the Convex database.",
  system:
    "You are a helpful assistant that extracts and saves receipt details to the database.",
  model: openai({
    model: "gpt-4o-mini",
    defaultParameters: { max_completion_tokens: 1000 },
  }),
  tools: [saveToDatabaseTool],
});
