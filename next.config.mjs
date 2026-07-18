/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/guides", destination: "/ai-image-detector/guides", permanent: true },
      { source: "/guides/:slug*", destination: "/ai-image-detector/guides/:slug*", permanent: true },
      { source: "/overlai", destination: "/ai-image-detector", permanent: true },
    ];
  },
};
export default nextConfig;
