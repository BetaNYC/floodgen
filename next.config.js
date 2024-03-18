/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    basePath: '/docs',
    // reactStrictMode: true,
    trailingSlash: true,
    env: {
        BASE_URL: process.env.NEXT_PUBLIC_MAPBOX_API_KEY,
    }

}

module.exports = nextConfig

// export default nextConfig
