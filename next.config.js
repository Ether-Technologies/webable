/** @type {import('next').NextConfig} */
const nextConfig = {
  //   output: "export",
  images: {
    // unoptimized: true,
    domains: [
      "prayer.ethertech.io",
      "world.openfoodfacts.org",
      "scanbot.io",
      "go-upc.s3.amazonaws.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  //   trailingSlash: true,
  async rewrites() {
    return [
      {
        source: "/api/lookup/:code",
        destination: "https://scanbot.io/wp-json/upc/v1/lookup/:code",
      },
    ];
  },
};

module.exports = nextConfig;
