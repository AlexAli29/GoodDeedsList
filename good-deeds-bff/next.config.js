/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone'
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/about',
  //       destination: 'http://localhost:3000/api/auth',
  //     },
  //   ]
  // },
}

module.exports = nextConfig
