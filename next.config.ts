import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('https://18a5731454f0.ngrok-free.app/storage/**')],
    domains: ['https://18a5731454f0.ngrok-free.app'],
  },
};

export default nextConfig;
