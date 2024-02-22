/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BASE_URL: process.env.NEXT_PUBLIC_MAPBOX_API_KEY,
    },
    // output: "export"
}

module.exports = nextConfig
