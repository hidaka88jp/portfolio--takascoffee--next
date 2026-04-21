import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'takascoffee.takanorihidaka.com',
      },
    ],
  },
};

export default nextConfig;
