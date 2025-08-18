import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";

// ✅ Minimal test function
const helloFn = inngest.createFunction(
  { id: "hello.test" },
  { event: "app/hello" },
  async ({ event }) => {
    console.log("Hello Inngest! Event:", event);
    return { message: "Hello from Inngest!" };
  }
);

// ✅ Serve functions here
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [helloFn],  // 👈 add more like extractAndSavePDF later
});
