import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowRight,
  Upload,
  ReceiptText,
  BarChart3,
  Shield,
  Check
} from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-blue-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Intelligent Receipt Scanning
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Scan, analyze, and organize your receipts with AI-powered
                precision. Save time and gain insights from your expenses.
              </p>
            </div>

            <div className="space-x-4">
              <Link href="/receipts">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="outline">Learn More</Button>
              </Link>
            </div>
          </div>
        </div>

        {/* PDF Dropzone */}
        <div className="mt-12 flex justify-center">
          <div className="relative w-full max-w-3xl rounded-lg border border-gray-200 bg-white shadow-lg overflow-hidden dark:border-gray-800 dark:bg-gray-950">
            <div className="p-6 md:p-8 relative">
              <p>PDF dropzone goes here...</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 md:py-24">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Powerful Features
              </h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Our AI-powered platform transforms how you handle receipts and
                track expenses.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {/* Feature 1 */}
              <div className="flex flex-col items-center space-y-2 border border-gray-200 rounded-lg p-6 dark:border-gray-800">
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                  <Upload className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold">Fast Import</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Drag-and-drop PDFs or images. We queue, parse, and index
                  automatically.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col items-center text-center gap-3 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
                <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/40">
                  <ReceiptText className="h-6 w-6 text-emerald-600 dark:text-emerald-300" />
                </div>
                <h3 className="font-semibold">Smart Parsing</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Vendor, date, subtotal, tax, and line items—cleaned and
                  validated.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col items-center text-center gap-3 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
                <div className="p-3 rounded-full bg-violet-100 dark:bg-violet-900/40">
                  <BarChart3 className="h-6 w-6 text-violet-600 dark:text-violet-300" />
                </div>
                <h3 className="font-semibold">Insights & Search</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Filter by vendor or category, see trends over time, and export
                  data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section
        id="pricing"
        className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900/50"
      >
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Simple Pricing
            </h2>
            <p className="max-w-[700px] mx-auto text-gray-600 dark:text-gray-300">
              Start free. Upgrade when you need more volume and team features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-12">
            {/* Free */}
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6 md:p-8 bg-white dark:bg-gray-950">
              <h3 className="text-xl font-semibold">Free</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Great for trying things out.
              </p>
              <div className="mt-4 text-3xl font-bold">$0</div>
              <ul className="mt-6 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" /> 50 receipts / month
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" /> Basic parsing
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" /> CSV export
                </li>
              </ul>
              <Button asChild className="mt-6 w-full">
                <Link href="/manage-plan">Choose Free</Link>
              </Button>
            </div>

            {/* Starter */}
            <div className="rounded-2xl border border-green-300 dark:border-green-800 p-6 md:p-8 bg-green-50/60 dark:bg-green-950/20">
              <h3 className="text-xl font-semibold">Starter</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                For individuals and freelancers.
              </p>
              <div className="mt-4 text-3xl font-bold">
                $5<span className="text-base font-medium">/mo</span>
              </div>
              <ul className="mt-6 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" /> 500 receipts / month
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" /> Standard parsing
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" /> CSV & PDF export
                </li>
              </ul>
              <Button asChild className="mt-6 w-full">
                <Link href="/manage-plan">Choose Starter</Link>
              </Button>
            </div>

            {/* Pro */}
            <div className="rounded-2xl border border-blue-300 dark:border-blue-800 p-6 md:p-8 bg-blue-50/60 dark:bg-blue-950/20">
              <h3 className="text-xl font-semibold">Pro</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                For power users and small teams.
              </p>
              <div className="mt-4 text-3xl font-bold">
                $12<span className="text-base font-medium">/mo</span>
              </div>
              <ul className="mt-6 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" /> 2,000 receipts / month
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" /> Advanced parsing & line items
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" /> Team sharing & API access
                </li>
              </ul>
              <Button asChild className="mt-6 w-full">
                <Link href="/manage-plan">Choose Pro</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section
        id="info"
        className="py-16 md:py-24 bg-blue-600 text-white text-center"
      >
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl font-bold md:text-4xl">Start Scanning Today</h2>
          <p className="mt-3 max-w-[600px] mx-auto text-lg opacity-90">
            Sign up now and let Expensio handle the hard work—so you can focus
            on your business.
          </p>
          <div className="mt-6">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
