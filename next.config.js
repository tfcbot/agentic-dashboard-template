/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "img.clerk.com",
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: "images.unsplash.com",
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: "*.cloudfront.net",
        port: '',
        pathname: '/**',
      }
    ],
  },
  env: {
    NEXT_API_URL: process.env.NEXT_API_URL,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    NEXT_SUBSCRIPTION_MANAGEMENT_URL: process.env.NEXT_SUBSCRIPTION_MANAGEMENT_URL,
  },
};

module.exports = nextConfig;
