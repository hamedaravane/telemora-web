/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: 'img.freepik.com',
      },
      {
        hostname: 'picsum.photos',
      },
      {
        hostname: 'loremflickr.com',
      },
      {
        hostname: 'avatars.githubusercontent.com',
      },
      {
        hostname: 'cdn.jsdelivr.net',
      },
    ],
  },
};
export default nextConfig;
