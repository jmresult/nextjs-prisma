module.exports = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://api.example.com/:path*',
            },
        ]
    },
    async headers() {
        return [
            {
                source: '/api/:path*',
                headers: [
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: '"*"',
                    },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value: '*',
                    },
                ],
            },
        ]
    },
}
