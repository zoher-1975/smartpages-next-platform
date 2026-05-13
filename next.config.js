/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,   // Required for static export; remove when using Vercel image optimization
  },
  // Future: i18n for Arabic RTL
  // i18n: { locales: ['en', 'ar'], defaultLocale: 'en' },
}

module.exports = nextConfig
