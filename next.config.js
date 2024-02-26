/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["static.shoeprize.com"],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

module.exports = nextConfig;
