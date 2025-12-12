import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Fix Turbopack error
  turbopack: {},

  // 1. Image Config
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "gateway.pinata.cloud" }
    ],
  },

  // 2. Required Web3 Docker Fix
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },

  // 3. Disable TS errors (optional)
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
