import { Inngest } from "inngest";
// Debug env load (safe)
console.log(
  "🔐 [env-check] OPENAI_API_KEY is loaded:",
  process.env.OPENAI_API_KEY ? "✅ present" : "❌ missing"
);

export const inngest = new Inngest({
  id: "receipt-tracker-app", 
});
