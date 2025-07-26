import type { NextConfig } from "next";
const foropenurl = process.env.STRAPI_OPEN_URL || "http://strapi:1337";
const openurl = foropenurl.replace(/^https?:\/\//, "");

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
        hostname: openurl,
      },
    ],
  },
};

export default nextConfig;
