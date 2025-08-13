import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Creating upload URL for the client

export const generateUploadUrl = mutation({
    args: {},
    handler: async (ctx) => {
        // Generate URL to upload file 
        return await ctx.storage.generateUploadUrl();
    },
});

// Store a receipt file and add it to the database
export const storeReceipt = mutation({
    args: {
        userId: v.string(),
        fileId: v.id("_storage"),
        fileName: v.string(),
        size: v.number(),
        mimeType: v.string(),
    },
    handler: async (ctx, args) => {
        // Saves Receipt to database
        const receiptId = await ctx.db.insert("receipts", {
            userId: args.userId,
            fileName: args.fileName,
            fileId: args.fileId,
            uploadedAt: Date.now(),
            size: args.size,
            mimeType: args.mimeType,
            status: "pending",
            // Initialize extracted data fields as null
            merchantName: undefined,
            merchantAddress: undefined,
            merchantContact: undefined,
            date: undefined,
            amount: undefined,
            currency: undefined,
            items: [],
        });
        return receiptId;
    },
})

// Function that gets all reciepts for the user 

export const getReceipts = query({
    args: {
        userId: v.string(),
    },
    handler: async (ctx, args) => {
        // Only returning receipts for authenticated user
        return await ctx.db
        .query("receipts")
        .filter((q) => q.eq(q.field("userId"), args.userId))
        .order("desc")
        .collect();
    },
});

//Function to get a single receipt by ID
export const getReceiptById = query({
    args: {
        id: v.id("receipts"),
    },
    handler: async (ctx, args) => {
        // Get the receipt
        const receipt = await ctx.db.get(args.id);

        // Verify user has access the the receipt
        if (receipt) {
            const identity = await ctx.auth.getUserIdentity();
            if (!identity) {
                throw new Error("Not authenticated");
            }

            const userId = identity.subject;
            if (receipt.userId !== userId) {
                throw new Error("Not authorized to accesss this receipt");
            }
        }
        
        return receipt;
    },
});

// Generate a URL to download a receipt file
export const getReceiptDownLoadUrl = query({
    args: {
        fileId: v.id("_storage"),
    },
    handler: async (ctx, args) => {
        // Get a temp URL that is used to download the file
        return await ctx.storage.getUrl(args.fileId);
    },
});

// Update a receipt with extracted data
export const updateReceiptWithExtractedData = mutation({
  args: {
    id: v.id("receipts"),

    // Optional so you can patch only what you have
    fileDisplayName: v.optional(v.string()),
    merchantName: v.optional(v.string()),
    merchantAddress: v.optional(v.string()),
    merchantContact: v.optional(v.string()),
    date: v.optional(v.string()),          // was transactionDate
    amount: v.optional(v.number()),        // was transactionAmount (and string)
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
    status: v.optional(v.string()),        // in case you want to flip pending->processed
  },
  handler: async (ctx, args) => {
    const { id, ...patch } = args;

    // Verify the receipt exists
    const receipt = await ctx.db.get(id);
    if (!receipt) {
      throw new Error("Receipt not found");
    }

    // Apply patch with only provided fields
    await ctx.db.patch(id, patch);
    return id;
  },
});
