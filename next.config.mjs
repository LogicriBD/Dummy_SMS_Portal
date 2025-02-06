/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
  },
  output: 'standalone',
  reactStrictMode: false,
  webpack: config => {
    config.resolve.alias.canvas = false
    return config
  },
}

export default nextConfig
