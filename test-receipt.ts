import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

async function testReceipt() {
  const pdfUrl =
    "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"; // replace with your receipt URL

  const result = await client.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Please analyze this receipt (${pdfUrl}) and provide a structured JSON object with these fields:
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
    max_completion_tokens: 1000,
  });

  console.log("✅ AI response:");
  console.log(result.choices[0].message);
}

testReceipt().catch(console.error);
