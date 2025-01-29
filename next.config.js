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
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL,
    NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL,
  },
};

module.exports = nextConfig;
