/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "",
  // reactStrictMode: true,
  // env: {
  //     BASE_URL: process.env.NEXT_PUBLIC_MAPBOX_API_KEY,
  // }
  images: {
    domains: ["localhost"],
  },
};

module.exports = nextConfig;

// export default nextConfig
