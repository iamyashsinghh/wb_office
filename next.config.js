/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    scrollRestoration: true,
  },
  reactStrictMode: false,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.wbcrm.in',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'weddingbanquets.in',
      },
      {
        protocol: 'https',
        hostname: 'blog.weddingbanquets.in',
      },
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
      },
    ],
    domains: [ 'localhost', 'cms.wbcrm.in','lh3.googleusercontent.com',"weddingbanquets.in","blog.weddingbanquets.in"],
  },
  
}


module.exports = nextConfig