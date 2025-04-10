/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
      },
    ],
  },
  typescript: {
    ignoreDevErrors: true, // Ignore TypeScript errors during build
  },
};

export default nextConfig;
