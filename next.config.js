/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow importing images from demo merchant
  images: {
    remotePatterns: [],
    // Static demo images live in /public — no external domains needed yet
  },

  // Strict mode catches issues early
  reactStrictMode: true,

  // We'll add i18n (en/ar RTL) in a later phase
  // i18n: { locales: ['en', 'ar'], defaultLocale: 'en' },
}

module.exports = nextConfig
