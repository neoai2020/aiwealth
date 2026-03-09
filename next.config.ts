import type { NextConfig } from "next";

const isGitHubPages = process.env.DEPLOY_TARGET === "gh-pages";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "image.pollinations.ai" },
    ],
  },
  basePath: isGitHubPages ? "/ai-wealth" : undefined,
  assetPrefix: isGitHubPages ? "/ai-wealth/" : undefined,
  trailingSlash: isGitHubPages,
};

export default nextConfig;
