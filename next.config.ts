import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGitHubPages ? "/Portfolio-UpamanyuSamal" : "";

const nextConfig: NextConfig = {
  ...(isGitHubPages && { output: "export", basePath, images: { unoptimized: true } }),
  // Exposed to client code so plain <a href> links to /public files get the prefix too.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  trailingSlash: true,
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  reactStrictMode: true,
};

export default nextConfig;
