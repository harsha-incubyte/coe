import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  // Enable compatibility with existing codebase if needed
  reactStrictMode: true,
};

export default nextConfig;
