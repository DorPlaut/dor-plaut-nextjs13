/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    serverComponentsExternalPackages: ['mongoose'],
  },
  images: {
    domains: [
      'images.pexels.com',
      'images-api.printify.com',
      'res.cloudinary.com',
    ],
  },
  reactStrictMode: true,
};
