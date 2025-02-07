/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
  },
  output: 'standalone',
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'logicri-uat.s3.ap-southeast-1.amazonaws.com',
        pathname: '/sms/media/**',
      },
    ],
  },
  webpack: config => {
    config.resolve.alias.canvas = false
    return config
  },
}

export default nextConfig
