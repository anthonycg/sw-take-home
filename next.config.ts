import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "sw-th.s3.us-east-2.amazonaws.com",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
