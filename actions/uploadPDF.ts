"use server";

import { currentUser } from "@clerk/nextjs/server";
import { api } from "@/convex/_generated/api";
import convex from "@/lib/convexClient"; // Convex (HTTP) client instance
import { getFileDownloadUrl } from "./getFileDownloadUrl";

export async function uploadPDF(formData: FormData) {
  const user = await currentUser();
  if (!user) return { success: false, error: "Not authenticated" };

  try {
    const file = formData.get("file") as File | null;
    if (!file) return { success: false, error: "No file provided" };

    // basic PDF validation
    const isPdf = file.type?.toLowerCase().includes("pdf") ||
                  file.name?.toLowerCase().endsWith(".pdf");
    if (!isPdf) return { success: false, error: "Only PDF files are allowed" };

    // Gets upload URL from Convex (note: correct name + imported `api`)
    const uploadUrl = await convex.mutation(api.receipts.generateUploadUrl, {});
    
    // Convert to arrayBuffer for fetch API
    const arrayBuffer = await file.arrayBuffer();

    // Post to Convex storage
    const uploadResponse = await fetch(uploadUrl, {
        method: "POST",
        headers: {
            "Content-Type": file.type,
        },
        body: new Uint8Array(arrayBuffer),
    })

    if (!uploadResponse.ok) {
        throw new Error(`Failed to upload file: ${uploadResponse.statusText}`);
    }

    // Get storage ID from the response
    const { storageId } = await uploadResponse.json();

    // Add receipt to the database
    const receiptId = await convex.mutation(api.receipts.storeReceipt, {
        userId: user.id,
        fileId: storageId,
        fileName: file.name,
        size: file.size,
        mimeType: file.type,
    });

    // Generate the file URL
    const fileUrl = await getFileDownloadUrl(storageId);

    // TODO: Initiate ingest agents..

    return {
        success: true,
        data: {
            receiptId,
            fileName: file.name
        }
    }

  } catch (error) {
    console.error("Server action upload error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
