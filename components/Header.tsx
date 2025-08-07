"use client";

import { Shield } from "lucide-react";
import Link from "next/Link";

function Header() {
  return (
    <div className="p-4 flex justify-between items-center">
      <Link href="/" className="flex items-center">
      <Shield className="w-6 h-6 text-blue-600 mr-2"/>
      <h1 className="text-xl font-semibold">Expensio</h1>
      </Link>
    </div>
  );
}

export default Header;