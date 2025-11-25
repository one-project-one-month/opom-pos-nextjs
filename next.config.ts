import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('https://pos.kyawmgmglwin.site/storage/**')],
    domains: ['https://pos.kyawmgmglwin.site'],
  },
};

export default nextConfig;
