/** @type {import('next').NextConfig} */

// Set NEXT_PUBLIC_BASE_PATH=/gutcheck at build time to serve the app under a
// subpath (e.g. dennisdelgado.com/gutcheck). Leave unset for root / local dev.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
};

export default nextConfig;
