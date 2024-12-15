import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: { unoptimized: true },
  eslint: {
    ignoreDuringBuilds: true
  },
  output: "standalone"
};

export default nextConfig;
