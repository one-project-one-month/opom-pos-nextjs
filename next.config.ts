import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('https://ed38c55d1fdd.ngrok-free.app/storage/**')],
    domains: ['https://ed38c55d1fdd.ngrok-free.app'],
  },
};

export default nextConfig;
