import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";

import { documentParser } from "@/inngest/agents/receiptAgent";
import { saveToDatabaseTool } from "@/inngest/agents/databaseAgent";
import { getFileDownloadUrl } from "@/actions/getFileDownloadUrl";

// 🔹 Helpers so casts don’t pollute main function
async function parseReceiptFile(pdfUrl: string, step: unknown) {
  return documentParser.handler({ pdfUrl }, { step } as any);
}

async function saveReceiptToDb(params: any, step: unknown) {
  return saveToDatabaseTool.handler(params, { step } as any);
}

// test function
const helloFn = inngest.createFunction(
  { id: "hello.test" },
  { event: "app/hello" },
  async () => ({ message: "Hello from Inngest!" })
);

// process receipt upload
const processReceiptUpload = inngest.createFunction(
  { id: "receipt.process" },
  { event: "app/receipt.uploaded" },
  async ({ event, step }) => {
    const { fileId, fileName, mimeType, userId, receiptId } = event.data;

    if (mimeType !== "application/pdf") {
      return { status: "skipped", reason: "Not a PDF" };
    }

    // 1. Downloadable URL from Convex
    const fileUrl = await getFileDownloadUrl(fileId);
    console.log("🔑 Convex client using URL:", process.env.NEXT_PUBLIC_CONVEX_URL);
console.log("📥 fileId passed in:", fileId);

    if (!fileUrl.success) {
      return { status: "failed", reason: "Could not get file URL" };
    }

    console.log("📂 File URL from Convex:", fileUrl.downloadUrl);


    // 2. Parse the PDF with the documentParser tool
    const parsed = await parseReceiptFile(fileUrl.downloadUrl!, step);

    // 3. Save extracted data with the saveToDatabaseTool
    const dbResult = await saveReceiptToDb(
      {
        userId,
        fileDisplayName: fileName,
        receiptId,
        merchantName: parsed?.merchant?.name ?? "",
        merchantAddress: parsed?.merchant?.address ?? "",
        merchantContact: parsed?.merchant?.contact ?? "",
        transactionDate: parsed?.transaction?.date ?? "",
        transactionAmount: parsed?.totals?.total ?? 0,
        receiptSummary: "Extracted via agent",
        currency: parsed?.totals?.currency ?? "USD",
        items: parsed?.items ?? [],
      },
      step
    );

    return { status: "processed", fileId, fileName, dbResult };
  }
);

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [helloFn, processReceiptUpload],
});
