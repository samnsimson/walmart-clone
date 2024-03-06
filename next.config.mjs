/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
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
