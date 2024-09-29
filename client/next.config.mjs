/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'sdrive.blr1.cdn.digitaloceanspaces.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'scholar.googleusercontent.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'scholar.google.com',
        pathname: '**',
      },
    ],
  },
  env: {
    API_ENDPOINT: process.env.API_ENDPOINT,
  },
};

export default nextConfig;
