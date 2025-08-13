import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import convex from "@/lib/convexClient";

/**
 * Server action to get a download URL for a file in Convex storage
 */
export async function getFileDownloadUrl(fileId: Id<"_storage"> | string) {
    try{
        // Get download URL fro Convex
        const downloadUrl = await convex.query(api.receipts.getReceiptDownLoadUrl, {
            fileId: fileId as Id<"_storage">,
        });
        if (!downloadUrl) {
            throw new Error("Could not generate download URL");
        }

        return {
            success: true,
            downloadUrl,
        };
    } catch (error) {
        console.error("Error generating download URL:", error);
        return {
            success: false,
            error:
                error instanceof Error ? error.message: "Unknown error has occurred",
        };
    }
}