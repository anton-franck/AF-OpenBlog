import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1338",
      },
      {
        protocol: "http",
        hostname: "strapi",
        port: "1338",
      },
      {
        protocol: "http",
        hostname: "strapi",
        port: "1337",
      },
      {
        protocol: "https",
        hostname: "laby.afnetwork.de",
      },
    ],
  },
};

export default nextConfig;
