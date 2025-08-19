// app/api/upload-pdf/route.ts
import { NextResponse } from "next/server";
import { uploadPDF } from "@/actions/uploadPDF";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const result = await uploadPDF(formData);

    return NextResponse.json(result);
  } catch (err: any) {
    console.error("Upload API error:", err);

    return NextResponse.json(
      { success: false, error: err.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
