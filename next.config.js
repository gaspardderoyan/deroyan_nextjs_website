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
        ignoreBuildErrors: true,
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    async redirects() {
        return [
            {
                source: '/tapis',
                destination: '/collection?filters[type][$eq]=carpet',
                permanent: true,
            },
            {
                source: '/tapisseries',
                destination: '/collection?filters[type][$eq]=tapestry',
                permanent: true,
            },
            {
                source: '/autres-textiles',
                destination: '/collection?filters[type][$eq]=textiles',
                permanent: true,
            },
            // TODO: add redirects for the english(en) versions of the pages

        ];
    },
};

module.exports = nextConfig; 