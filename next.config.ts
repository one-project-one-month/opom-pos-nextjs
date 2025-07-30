import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('https://backoffice.opompos.site/storage/**')],
    domains: ['backoffice.opompos.site'],
  },
};

export default nextConfig;
