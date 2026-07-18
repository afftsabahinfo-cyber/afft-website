import {
  campLifestyleItems,
  creatorSeriesItems,
  experienceSetItems,
  premiumCampItems,
  tentShowcaseItems,
  type CatalogItem,
  type TentShowcaseItem,
} from "@/lib/rent-it-data";
import type {
  RentItLiveCatalog,
  RentItLiveProduct,
} from "@/lib/rent-it-live-catalog";

function fallbackSlug(series: string, title: string, index: number) {
  const value = `${series}-${title}`
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return value || `rent-it-fallback-${index + 1}`;
}

function fallbackDailyPrice(value: string) {
  return /\/\s*day\s*$/i.test(value) ? value : `${value} / day`;
}

function catalogItemToFallbackProduct(
  series: string,
  item: CatalogItem,
  index: number,
): RentItLiveProduct {
  const slug = fallbackSlug(series, item.title, index);
  return {
    productId: `FALLBACK-${slug}-${index + 1}`,
    officialName: item.title,
    slug,
    series,
    status: "Active",
    publicPrice: fallbackDailyPrice(item.day1),
    publicDescription: item.description ?? item.bestFor,
    bestFor: [item.bestFor],
    availability: "Availability is subject to AFFT confirmation.",
    deliveryCollection: "Confirm pickup, delivery or transport with AFFT.",
    setup: "Confirm any setup assistance with AFFT.",
    image: "",
    altText: item.title,
  };
}

function tentToFallbackProduct(
  item: TentShowcaseItem,
  index: number,
): RentItLiveProduct {
  const series = "Tent Experience Series";
  const slug = fallbackSlug(series, item.title, index);
  return {
    productId: `FALLBACK-${slug}-${index + 1}`,
    officialName: item.title,
    slug,
    series,
    status: "Active",
    publicPrice: fallbackDailyPrice(item.day1),
    publicDescription: item.description,
    bestFor: item.bestFor,
    availability: "Availability is subject to AFFT confirmation.",
    deliveryCollection: "Confirm pickup, delivery or transport with AFFT.",
    setup: "Confirm any setup assistance with AFFT.",
    image: item.image ?? "",
    altText: item.title,
  };
}

export function createCheckedInRentItFallbackCatalog(): RentItLiveCatalog {
  const sections: Array<{ series: string; items: CatalogItem[] }> = [
    { series: "Creator Series", items: creatorSeriesItems },
    { series: "Camp Lifestyle Series", items: campLifestyleItems },
    { series: "Premium Camp Series", items: premiumCampItems },
    { series: "Experience Set Series", items: experienceSetItems },
  ];

  return {
    version: null,
    updatedAt: null,
    products: [
      ...sections.flatMap(({ series, items }) =>
        items.map((item, index) =>
          catalogItemToFallbackProduct(series, item, index),
        ),
      ),
      ...tentShowcaseItems.map(tentToFallbackProduct),
    ],
  };
}

export const checkedInRentItFallbackCatalog =
  createCheckedInRentItFallbackCatalog();
