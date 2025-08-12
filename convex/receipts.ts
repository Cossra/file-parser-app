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
        fieldId: v.id("_storage"),
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
            transactionDate: undefined,
            transactionAmount: undefined,
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
})