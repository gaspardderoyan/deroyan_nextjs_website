/** @type {import('next').NextConfig} */

const nextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '1337',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: '**',
                port: '',
                pathname: '/**',
            },
        ],
    },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: false,
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: false,
    },
    async redirects() {
        return [
            {
                source: '/tapis',
                destination: '/fr/collection?filters[type][$eq]=carpet',
                permanent: true,
            },
            {
                source: '/tapisseries',
                destination: '/fr/collection?filters[type][$eq]=tapestry',
                permanent: true,
            },
            {
                source: '/autres-textiles',
                destination: '/fr/collection?filters[type][$eq]=textile',
                permanent: true,
            },
            {
                source: '/en/carpets',
                destination: '/en/collection?filters[type][$eq]=carpet',
                permanent: true,
            },
            {
                source: '/en/tapestries',
                destination: '/en/collection?filters[type][$eq]=tapestry',
                permanent: true,
            },
            {
                source: '/en/textiles',
                destination: '/en/collection?filters[type][$eq]=textile',
                permanent: true,
            },

        ];
    },
};

module.exports = nextConfig; 