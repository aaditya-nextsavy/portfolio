/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  
  // Optional: Add these if you need them
//   images: {
//     domains: ['example.com'], // Add domains where you host images
//   },
  
//   reactStrictMode: true,
};

export default nextConfig;