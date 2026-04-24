import type { NextConfig } from 'next';

const devOrigin = process.env.DEV_ORIGIN;

const nextConfig: NextConfig = {
  /* config options here */
  // allowedDevOrigins: ['192.168.68.105'],
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
