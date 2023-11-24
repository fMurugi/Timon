/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        //rwrite to my express srver that runs on port 3006

        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:3006/api/:path*',
            },
        ]
    }
}

module.exports = nextConfig
