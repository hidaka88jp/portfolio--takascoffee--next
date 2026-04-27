import type { NextConfig } from 'next';

const devOrigin = process.env.DEV_ORIGIN;

const nextConfig: NextConfig = {
  /* config options here */
  ...(process.env.NODE_ENV === 'development' && devOrigin
    ? {
        allowedDevOrigins: [devOrigin],
      }
    : {}),
  cacheComponents: true,
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
