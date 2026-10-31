/** @type {import('next').NextConfig} */
const nextConfig = {
  // Lint runs as its own CI step (npm run lint), not inside next build.
  eslint: { ignoreDuringBuilds: true },
};
export default nextConfig;
