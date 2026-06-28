import type { MetadataRoute } from "next";

const baseUrl = "https://afft.club";

export const dynamic = "force-static";

const routes = [
  "",
  "/zh",
  "/camping",
  "/rent-it",
  "/rent-it/creator-series",
  "/rent-it/camp-lifestyle-series",
  "/rent-it/premium-camp-series",
  "/rent-it/tent-experience-series",
  "/packages",
  "/packages/solo-explorer",
  "/packages/explorer-camp",
  "/packages/couple-camp-milky-way",
  "/packages/family-camp",
  "/private-tours",
  "/car-rental",
  "/travel-services/airport-transfer",
  "/travel-services/kundasang-private-tour",
  "/travel-services/sandakan-private-tour",
  "/travel-services/tiggo-alphard-charter",
  "/about",
  "/faq",
  "/customer-stories",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: "2026-06-28",
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
