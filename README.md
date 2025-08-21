# 📦 Receipt Tracker SaaS
An AI-powered SaaS platform for managing receipts and tracking expenses, built with modern full-stack tools.

## 🚀 Tech Stack
- **Frontend**: Next.js 15 (App Router)
- **Backend**: Convex (realtime database + serverless functions)
- **Auth**: Clerk
- **Payments**: Stripe
- **Background Jobs**: Inngest
- **AI**: OpenAI API (for receipt parsing)
- **API Schema**: Schematic
- **Styling**: Tailwind CSS

## 🚀 Milestone Achieved
- Full end-to-end receipt tracking loop is functional:
  - Upload PDF → Convex Storage
  - Process with Inngest + OpenAI
  - Save structured data into Convex DB
  - Display results in Next.js frontend

## 📷 Features
- Upload receipt images
- Extract data using AI agents
- View and filter receipt history
- Real-time updates (Convex)
- Subscription billing (Stripe)
- Clerk-powered login & user management


## 🛠 Setup
```bash
pnpm install
pnpm dev
