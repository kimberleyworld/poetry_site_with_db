import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: (() => {
          if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
            throw new Error("Environment variable NEXT_PUBLIC_SUPABASE_URL is not defined.");
          }
          return new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname;
        })(),
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
