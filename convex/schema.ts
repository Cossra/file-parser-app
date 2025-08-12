import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// The schema is entirely optional.
// You can delete this file (schema.ts) and the
// app will continue to work.
// The schema provides more precise TypeScript types.
export default defineSchema({
  receipts: defineTable({
    userId: v.string(), // Clerk User ID
    fileName: v.string(),
    fileDisplayName: v.optional(v.string()),
    fileId: v.id("_storage"),
    uploadedAt: v.number(),
    size: v.number(),
    mimeType: v.string(),
    status: v.string(), // pending, processed, error

    // Fields for extracted data
    merchantName: v.optional(v.string()),
    merchantAddress: v.optional(v.string()),
    merchantContact: v.optional(v.string()),
    date: v.optional(v.string()),
    amount: v.optional(v.number()),
    currency: v.optional(v.string()),
    receiptSummary: v.optional(v.string()),
    items: v.optional(
      v.array(
        v.object({
          name: v.optional(v.string()),
          quantity: v.optional(v.number()),
          unitPrice: v.optional(v.number()),
          totalPrice: v.optional(v.number()),
        })
      )
    ),

  }),
});
