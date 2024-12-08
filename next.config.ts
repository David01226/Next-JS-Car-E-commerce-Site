import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['raw.githubusercontent.com'], // Add allowed domains for external images here
  },
};

export default nextConfig;
