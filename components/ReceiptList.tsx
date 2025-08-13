"use client";

import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";

function ReceiptList() {
    const { user } = useUser();
    const receipts = useQuery(api.receipts.getReceipts, {
        userId: user?.id || "",
    });

if (!user) {
    return (
        <div className="w-full p-8 text-center">
            <p className="text-gray-600">Please sign in to view your receipts.</p>
        </div>
    );
}

if (!receipts) {
    return (
        <div className="w-full p-8 text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading receipts...</p>
        </div>
    );
}

if (receipts.length === 0) {
    return (
        <div className="w-full p-8 text-center border border-gray-200 rounded-lg bg-gray-50">
            <p className="mt-2 text-gray-600">No receipts have been uploaded yet.</p>
        </div>
    );
}

  return (
    <div>ReceiptList</div>
  )
}

export default ReceiptList