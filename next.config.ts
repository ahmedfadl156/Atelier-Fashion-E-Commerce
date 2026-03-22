import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5500",
      },
      {
        protocol: "https",
        hostname: "atelierbackend-production.up.railway.app",
      }
    ]
  }
};

export default nextConfig;
