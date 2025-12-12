const isProd = process.env.NODE_ENV === 'production';
const enablePWA = process.env.NEXT_PUBLIC_ENABLE_PWA === 'true';

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: !isProd || !enablePWA,
  register: true,
  skipWaiting: true,
  fallbacks: {
    document: '/offline'
  }
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true
  }
};

module.exports = enablePWA && isProd ? withPWA(nextConfig) : nextConfig;
