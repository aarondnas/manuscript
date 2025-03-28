import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    // Deaktiviere Source-Maps
    config.devtool = false;

    // Füge SVGR hinzu, um SVGs als React-Komponenten zu importieren
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default nextConfig;
