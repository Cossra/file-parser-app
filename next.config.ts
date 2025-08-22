import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "pdf-parse": require.resolve("pdf-parse/lib/pdf-parse.js"), // ✅ force proper entry
    };
    return config;
  },
};

export default nextConfig;
