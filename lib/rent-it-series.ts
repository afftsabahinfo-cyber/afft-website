import type { RentItLiveProduct } from "@/lib/rent-it-live-catalog";

export type RentItSeriesPresentation = {
  title: string;
  zhTitle: string;
  route: string | null;
  hook: string;
  zhHook: string;
  bestFor: string;
  zhBestFor: string;
  image: string;
  imageAlt: string;
};

export type RentItCatalogLocale = "en" | "zh-Hans";

export const rentItPreferredSeriesOrder = [
  "Creator Series",
  "Camp Lifestyle Series",
  "Premium Camp Series",
  "Experience Set Series",
  "Tent Experience Series",
];

const knownSeries: Record<string, RentItSeriesPresentation> = {
  "Creator Series": {
    title: "Creator Series",
    zhTitle: "创作者系列",
    route: "/rent-it/creator-series",
    hook: "Cameras, audio and creator bundles",
    zhHook: "相机、收音设备与创作组合",
    bestFor: "Vlogs, travel shooting, road-trip edits and outdoor content.",
    zhBestFor: "适合 Vlog、旅行拍摄、公路旅行记录与户外内容创作。",
    image: "/images/rent-it-creator-series-cover.webp",
    imageAlt: "AFFT Creator Series cover",
  },
  "Camp Lifestyle Series": {
    title: "Camp Lifestyle Series",
    zhTitle: "露营生活系列",
    route: "/rent-it/camp-lifestyle-series",
    hook: "Cooking, comfort, cooling, lights and power",
    zhHook: "炊具、舒适、保冷、灯光与电源装备",
    bestFor: "Campsite meals, coffee, projector nights and relaxed outdoor living.",
    zhBestFor: "适合营地用餐、咖啡、投影夜与轻松户外生活。",
    image: "/images/rent-it-camp-lifestyle-series-cover.webp",
    imageAlt: "AFFT Camp Lifestyle Series cover",
  },
  "Premium Camp Series": {
    title: "Premium Camp Series",
    zhTitle: "高级露营系列",
    route: "/rent-it/premium-camp-series",
    hook: "Helinox, Snow Peak and premium furniture",
    zhHook: "Helinox、Snow Peak 与高级露营家具",
    bestFor: "Comfort-led camp setups, premium seating and better outdoor rest.",
    zhBestFor: "适合重视舒适度、高级座椅与户外休息品质的营地布置。",
    image: "/images/rent-it-premium-camp-series-cover.webp",
    imageAlt: "AFFT Premium Camp Series cover",
  },
  "Experience Set Series": {
    title: "Experience Set Series",
    zhTitle: "体验组合系列",
    route: null,
    hook: "Ready-paired outdoor experience sets",
    zhHook: "已经搭配好的户外体验组合",
    bestFor: "Couple chill setups, outdoor coffee and creator-friendly camp days.",
    zhBestFor: "适合情侣休闲布置、户外咖啡与创作者露营日。",
    image: "",
    imageAlt: "AFFT Experience Set Series rental products",
  },
  "Tent Experience Series": {
    title: "Tent Experience Series",
    zhTitle: "帐篷体验系列",
    route: "/rent-it/tent-experience-series",
    hook: "Black Dog, Playdo and Mobi Garden tents",
    zhHook: "BLACKDOG、Playdo 与 Mobi Garden 帐篷",
    bestFor: "Couple glamping, family camp, car-side stays and group weekends.",
    zhBestFor: "适合情侣 Glamping、家庭露营、车边住宿与团体周末。",
    image: "/images/rent-it-tent-experience-series-cover.webp",
    imageAlt: "AFFT Tent Experience Series cover",
  },
};

export function rentItSeriesAnchor(series: string) {
  const trimmedSeries = series.trim();
  const slug = trimmedSeries
    .normalize("NFKD")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const identity = Array.from(trimmedSeries)
    .map((character) => character.codePointAt(0)?.toString(36) ?? "0")
    .join("-");

  return `price-guide-${slug || "series"}-${identity || "empty"}`;
}

export function getRentItSeriesPresentation(
  series: string,
  products: RentItLiveProduct[],
): RentItSeriesPresentation {
  const known = knownSeries[series];
  const productWithImage = products.find((product) => product.image);
  if (known) {
    return known.image || !productWithImage
      ? known
      : {
          ...known,
          image: productWithImage.image,
          imageAlt: productWithImage.altText || known.imageAlt,
        };
  }

  return {
    title: series,
    zhTitle: series,
    route: null,
    hook: `${products.length} current rental option${products.length === 1 ? "" : "s"}`,
    zhHook: `${products.length} 项当前可租选择`,
    bestFor: "Browse the approved products and ask AFFT which option fits your plan.",
    zhBestFor: "查看已核准产品，并向 AFFT 询问哪一项更适合你的计划。",
    image: productWithImage?.image ?? "",
    imageAlt: productWithImage?.altText || `${series} rental products`,
  };
}

export function getRentItSeriesHref(
  series: string,
  products: RentItLiveProduct[],
  {
    locale = "en",
    anchorBasePath = "",
  }: {
    locale?: RentItCatalogLocale;
    anchorBasePath?: string;
  } = {},
) {
  const presentation = getRentItSeriesPresentation(series, products);
  if (presentation.route) {
    return locale === "zh-Hans"
      ? `/zh${presentation.route}`
      : presentation.route;
  }

  return `${anchorBasePath}#${rentItSeriesAnchor(series)}`;
}

export function getRentItSeriesCopy(
  presentation: RentItSeriesPresentation,
  locale: RentItCatalogLocale,
) {
  if (locale === "zh-Hans") {
    return {
      title: presentation.zhTitle,
      hook: presentation.zhHook,
      bestFor: presentation.zhBestFor,
    };
  }

  return {
    title: presentation.title,
    hook: presentation.hook,
    bestFor: presentation.bestFor,
  };
}

export function getRentItSeriesStartingPrice(products: RentItLiveProduct[]) {
  const prices = products
    .map((product) => {
      const match = product.publicPrice.match(/RM\s*([\d,]+(?:\.\d+)?)/i);
      if (!match) return null;
      const amount = Number(match[1].replace(/,/g, ""));
      return Number.isFinite(amount)
        ? { amount, publicPrice: product.publicPrice }
        : null;
    })
    .filter(
      (price): price is { amount: number; publicPrice: string } => price !== null,
    )
    .sort((left, right) => left.amount - right.amount);

  return prices[0]?.publicPrice || products[0]?.publicPrice || "WhatsApp enquiry";
}
