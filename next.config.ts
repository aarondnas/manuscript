import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack(config) {
    // Deaktiviere Source-Maps, indem du `devtool` auf false setzt
    config.devtool = false;
    return config;
  }
};

export default nextConfig;
