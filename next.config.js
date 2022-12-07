/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Recommended for the `pages` directory, default in `app`.
  swcMinify: true,
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['knex'],
    transpilePackages: [
      'react-syntax-highlighter',
      'swagger-client',
      'swagger-ui-react',
    ],
  },
  async rewrites() {
    return [
      {
        source: '/users/:profileId/lists',
        destination: '/lists-by-profile-id?profileId=:profileId',
      },
      {
        source: '/users/:profileId/favorite-lists',
        destination: '/favorite-lists-by-profile-id?profileId=:profileId',
      },
    ];
  },
};

module.exports = nextConfig;
