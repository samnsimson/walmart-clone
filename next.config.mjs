/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/out",
  assetPrefix: "/out",
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i5.walmartimages.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
