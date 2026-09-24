import path from "path";
import type { NextConfig } from "next";

// Sanity does `import useSWR from "swr"`. Next's react-server condition loads a
// build with no default export. Alias the package to the browser build.
const swrBrowser = path.join(process.cwd(), "node_modules/swr/dist/index/index.mjs");

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/**" },
    ],
  },
  turbopack: {
    resolveAlias: {
      swr: "./node_modules/swr/dist/index/index.mjs",
    },
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      swr: swrBrowser,
    };
    return config;
  },
};

export default nextConfig;
