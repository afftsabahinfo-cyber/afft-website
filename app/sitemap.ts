import type { MetadataRoute } from "next";
import { campsiteRegions, campsiteSpots } from "@/lib/campsite-guide-data";

const baseUrl = "https://afft.club";

export const dynamic = "force-static";

const routes = [
  "",
  "/zh",
  "/zh/camping",
  "/zh/camping-spots",
  "/zh/rent-it",
  "/zh/rent-it/creator-series",
  "/zh/rent-it/camp-lifestyle-series",
  "/zh/rent-it/premium-camp-series",
  "/zh/rent-it/tent-experience-series",
  "/zh/packages/solo-explorer",
  "/zh/packages/explorer-camp",
  "/zh/packages/couple-camp-milky-way",
  "/zh/packages/family-camp",
  "/zh/private-tours",
  "/zh/car-rental",
  "/zh/travel-services/airport-transfer",
  "/zh/travel-services/kundasang-private-tour",
  "/zh/travel-services/sandakan-private-tour",
  "/zh/travel-services/tiggo-alphard-charter",
  "/zh/about",
  "/zh/faq",
  "/zh/customer-stories",
  "/zh/privacy",
  "/zh/terms",
  "/zh/cancellation",
  "/zh/rental-policy",
  "/zh/payment-confirmation",
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
  "/privacy",
  "/terms",
  "/cancellation",
  "/rental-policy",
  "/payment-confirmation",
  "/camping-spots",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const campsiteRoutes = [
    ...campsiteRegions.flatMap((region) => [
      `/camping-spots/${region.id}`,
      `/zh/camping-spots/${region.id}`,
    ]),
    ...campsiteSpots.flatMap((spot) => [spot.href, spot.zhHref]),
  ];

  return [...routes, ...campsiteRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: "2026-07-09",
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
