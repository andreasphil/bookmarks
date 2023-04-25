/** @type {import('next').NextConfig} */
export default {
  experimental: { appDir: true },
  redirects: async () => [
    { source: "/", destination: "/development", permanent: true },
  ],
};
