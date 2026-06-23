/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
      },
    ],
  },

  reactCompiler: true,
  serverExternalPackages: ["@better-auth/kysely-adapter", "kysely"],
};

export default nextConfig;