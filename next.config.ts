import type { NextConfig } from "next";
const config: NextConfig = {
  poweredByHeader: false,
  outputFileTracingExcludes: { "/*": ["./.env*", "./.private-mail/**/*"] },
  async headers() {
    const headers = [
      { key: "Cache-Control", value: "private, no-store, max-age=0" },
      { key: "X-Robots-Tag", value: "noindex, nofollow" },
      { key: "Referrer-Policy", value: "no-referrer" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "X-Content-Type-Options", value: "nosniff" },
    ];
    return [
      { source: "/admin/:path*", headers },
      { source: "/api/admin/:path*", headers },
    ];
  },
  async redirects() {
    return [
      {
        source: "/research/environmental-stress",
        destination: "/research",
        permanent: true,
      },
      {
        source: "/research/university-student-wellbeing",
        destination: "/research",
        permanent: true,
      },
      {
        source: "/research/social-exclusion-rural-transformation",
        destination: "/research",
        permanent: true,
      },
      {
        source: "/research/ecological-precarity",
        destination: "/research",
        permanent: true,
      },
      {
        source: "/research/young-men-mental-health",
        destination: "/research",
        permanent: true,
      },
      {
        source: "/research/climate-migration",
        destination: "/research",
        permanent: true,
      },
      {
        source: "/research/heat-informal-workers",
        destination: "/research",
        permanent: true,
      },
      {
        source: "/research/rural-development-brief",
        destination: "/research",
        permanent: true,
      },
      {
        source: "/research/displaced-community-wellbeing",
        destination: "/research",
        permanent: true,
      },
    ];
  },
  images: { formats: ["image/avif", "image/webp"] },
};
export default config;
