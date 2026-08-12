import type { MetadataRoute } from "next";
import { campsiteRegions, campsiteSpots } from "@/lib/campsite-guide-data";
import {
  activeRentItSeoProducts,
  getRentItProductLastModified,
  getRentItProductPath,
} from "@/lib/rent-it-product-seo";

const baseUrl = "https://afft.club";
const siteContentLastModified = "2026-08-12";

export const dynamic = "force-static";

const bilingualStaticRoutes: Array<[english: string, chinese: string]> = [
  ["", "/zh"],
  ["/camping", "/zh/camping"],
  ["/camping-spots", "/zh/camping-spots"],
  ["/rent-it", "/zh/rent-it"],
  ["/rent-it/creator-series", "/zh/rent-it/creator-series"],
  ["/rent-it/camp-lifestyle-series", "/zh/rent-it/camp-lifestyle-series"],
  ["/rent-it/premium-camp-series", "/zh/rent-it/premium-camp-series"],
  ["/rent-it/tent-experience-series", "/zh/rent-it/tent-experience-series"],
  ["/packages/solo-explorer", "/zh/packages/solo-explorer"],
  ["/packages/explorer-camp", "/zh/packages/explorer-camp"],
  ["/packages/couple-camp-milky-way", "/zh/packages/couple-camp-milky-way"],
  ["/packages/family-camp", "/zh/packages/family-camp"],
  ["/private-tours", "/zh/private-tours"],
  ["/car-rental", "/zh/car-rental"],
  ["/travel-services/airport-transfer", "/zh/travel-services/airport-transfer"],
  ["/travel-services/kundasang-private-tour", "/zh/travel-services/kundasang-private-tour"],
  ["/travel-services/sandakan-private-tour", "/zh/travel-services/sandakan-private-tour"],
  ["/travel-services/tiggo-alphard-charter", "/zh/travel-services/tiggo-alphard-charter"],
  ["/about", "/zh/about"],
  ["/faq", "/zh/faq"],
  ["/customer-stories", "/zh/customer-stories"],
  ["/privacy", "/zh/privacy"],
  ["/terms", "/zh/terms"],
  ["/cancellation", "/zh/cancellation"],
  ["/rental-policy", "/zh/rental-policy"],
  ["/payment-confirmation", "/zh/payment-confirmation"],
];

function absolute(path: string) {
  return `${baseUrl}${path}`;
}

function absoluteImage(url: string) {
  return /^https?:\/\//iu.test(url) ? url : absolute(url);
}

function bilingualEntries(
  englishPath: string,
  chinesePath: string,
  lastModified: string,
  images?: string[],
): MetadataRoute.Sitemap {
  const languages = {
    en: absolute(englishPath),
    "zh-Hans": absolute(chinesePath),
    "x-default": absolute(englishPath),
  };

  return [englishPath, chinesePath].map((path) => ({
    url: absolute(path),
    lastModified,
    alternates: { languages },
    images,
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = bilingualStaticRoutes.flatMap(([english, chinese]) =>
    bilingualEntries(english, chinese, siteContentLastModified),
  );

  const campsiteEntries = [
    ...campsiteRegions.flatMap((region) =>
      bilingualEntries(
        `/camping-spots/${region.id}`,
        `/zh/camping-spots/${region.id}`,
        siteContentLastModified,
      ),
    ),
    ...campsiteSpots.flatMap((spot) =>
      bilingualEntries(
        spot.href,
        spot.zhHref,
        siteContentLastModified,
        spot.photoUrl ? [absoluteImage(spot.photoUrl)] : undefined,
      ),
    ),
  ];

  const rentItProductEntries = activeRentItSeoProducts.flatMap((product) =>
    bilingualEntries(
      getRentItProductPath(product, "en"),
      getRentItProductPath(product, "zh-Hans"),
      getRentItProductLastModified(product),
      product.image ? [absoluteImage(product.image)] : undefined,
    ),
  );

  const englishOnlyEntries: MetadataRoute.Sitemap = [
    {
      url: absolute("/packages"),
      lastModified: siteContentLastModified,
      alternates: {
        languages: {
          en: absolute("/packages"),
          "x-default": absolute("/packages"),
        },
      },
    },
  ];

  return [
    ...staticEntries,
    ...englishOnlyEntries,
    ...campsiteEntries,
    ...rentItProductEntries,
  ];
}
