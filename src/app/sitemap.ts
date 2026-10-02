import { opportunities } from "@/lib/opportunities";
import type { MetadataRoute } from "next";
import { focusAreas, research, learning, people } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/about",
    "/our-work",
    "/research",
    "/learning",
    "/people",
    "/opportunities",
    "/events",
    "/contact",
    "/ethics",
    "/privacy",
    ...focusAreas.map(({ slug }) => `/our-work/${slug}`),
    ...research.map(({ slug }) => `/research/${slug}`),
    ...learning.map(({ slug }) => `/learning/${slug}`),
    ...opportunities.map(({ slug }) => `/opportunities/${slug}`),
    ...people.map(({ slug }) => `/people/${slug}`),
  ];
  return paths.map((path) => ({ url: `https://ceidbd.com${path}` }));
}
