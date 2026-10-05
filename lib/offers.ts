import { campItems, campMessage } from "./camping-series";
export type OfferLocale = {
  name: string;
  summary: string;
  inclusions: string[];
  exclusions: string[];
  addOns: string[];
  whatsappTemplate: string;
};

export type Offer = {
  offerId: string;
  slug: string;
  category: "camping" | "rent-it" | "tour" | "car-rental";
  priceFrom: number | null;
  priceType: "fixed" | "from" | "custom";
  capacity: string;
  duration: string;
  status: "active" | "seasonal" | "on-request";
  lastReviewedAt: string;
  locales: { en: OfferLocale; zh: OfferLocale };
};

export const offers: Offer[] = campItems
  .filter((p) => p.kind !== "addon")
  .map((p) => ({
    offerId: p.slug,
    slug: p.slug,
    category: "camping",
    priceFrom: p.price,
    priceType: p.from ? "from" : "fixed",
    capacity: p.audience.en,
    duration: p.duration.en,
    status: "active",
    lastReviewedAt: "2026-10-05",
    locales: Object.fromEntries(
      (["en", "zh"] as const).map((l) => [
        l,
        {
          name: p.name[l],
          summary: p.summary[l],
          inclusions: p.includes.map((t) => t[l]),
          exclusions: p.excludes.map((t) => t[l]),
          addOns: [],
          whatsappTemplate: campMessage(p, l),
        },
      ]),
    ) as unknown as Offer["locales"],
  }));
export function getOffer(offerId?: string) {
  return offers.find((p) => p.offerId === offerId);
}
