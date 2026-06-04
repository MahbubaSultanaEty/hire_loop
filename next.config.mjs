/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
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
   serverExternalPackages: ["@better-auth/kysely-adapter"],
};

export default nextConfig;
