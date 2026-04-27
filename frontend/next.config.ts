/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.digitalrealm-entertainment.com',
      },
    ],
  },
}

export default nextConfig
