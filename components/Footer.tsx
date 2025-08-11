import { Shield } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="p-4 flex flex-col items-center justify-center bg-blue-50 border-t border-blue-100">
      <Link href="/" className="flex items-center mb-2">
        <Shield className="w-6 h-6 text-blue-600 mr-2" />
        <span className="text-xl font-semibold">Expensio</span>
      </Link>
      <p className="text-sm text-gray-500 text-center">
        © {new Date().getFullYear()} Expensio. All rights reserved.
      </p>
    </footer>
  );
}
