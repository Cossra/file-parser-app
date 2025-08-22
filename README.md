# 📦 File Parser App

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![Convex](https://img.shields.io/badge/Backend-Convex-blue?logo=convex)](https://convex.dev/)
[![Inngest](https://img.shields.io/badge/Background%20Jobs-Inngest-593D88?logo=serverless)](https://www.inngest.com/)
[![Clerk](https://img.shields.io/badge/Auth-Clerk-purple?logo=clerk)](https://clerk.com/)
[![Stripe](https://img.shields.io/badge/Payments-Stripe-blueviolet?logo=stripe)](https://stripe.com/)
[![OpenAI](https://img.shields.io/badge/AI-OpenAI-412991?logo=openai)](https://openai.com/)
[![TailwindCSS](https://img.shields.io/badge/Styling-TailwindCSS-06B6D4?logo=tailwind-css)](https://tailwindcss.com/)

An **AI-powered SaaS app** that parses uploaded files, extracts structured information, and saves it for the user to view and manage.  

---

## 🚀 Tech Stack

- **Frontend**: Next.js 15 (App Router) — modern framework
- **Backend**: Convex (Realtime DB + cloud storage) — realtime backend
- **Auth**: Clerk with **Google OAuth login**
- **Payments**: Stripe (for SaaS subscriptions) — subscription billing
- **Background Jobs**: Inngest (event-driven processing) — async workflows
- **AI**: OpenAI API (LLM-powered file parsing & structured JSON output)
- **Schema Management**: Schematic — contract enforcement 
- **Styling**: Tailwind CSS + shadcn/ui — responsive design 

---

## 🎯 Milestone Achieved

✔️ End-to-end file parsing flow is fully functional:  
1. User uploads a file (PDF or image) → stored in Convex  
2. File sent to Inngest workflow → parsed by OpenAI  
3. Extracted structured data stored in Convex  
4. User dashboard displays parsed info in realtime  

---

## 📷 Features

- 📤 Upload and parse PDF/image files  
- 🤖 AI extracts key entities (merchant, transactions, items, totals, etc.)  
- 🔎 Search, filter, and manage parsed history  
- ⚡ Live updates via Convex  
- 🔐 **Google OAuth login via Clerk**  
- 💳 Subscription billing with Stripe  
- 🧩 Scalable event-driven architecture with Inngest  

---

## 🛠 Getting Started

```bash
# Follow these steps to run the app locally:

# 1. Clone the repository
git clone https://github.com/Cossra/file-parser-app.git
cd file-parser-app

# 2. Install dependencies
pnpm install

# 3. Start the development server
pnpm dev

# Your app will now be running at http://localhost:3000 🎉
