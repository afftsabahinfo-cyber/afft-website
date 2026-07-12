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

export const offers: Offer[] = [
  {
    offerId: "CAMP-SOLO-399",
    slug: "solo-explorer",
    category: "camping",
    priceFrom: 399,
    priceType: "from",
    capacity: "1 guest",
    duration: "2D1N",
    status: "active",
    lastReviewedAt: "2026-07-12",
    locales: {
      en: {
        name: "Solo Explorer Camp",
        summary: "A compact ready-built camping experience for one guest.",
        inclusions: ["Ready-built camp setup", "Core camping furniture"],
        exclusions: ["Transport", "Campsite fees unless stated"],
        addOns: ["Transport", "Meals", "Extra rental gear"],
        whatsappTemplate: "Hi AFFT, I want to ask about the Solo Explorer Camp (CAMP-SOLO-399).",
      },
      zh: {
        name: "Solo Explorer 单人露营",
        summary: "适合一人的轻量现成露营体验。",
        inclusions: ["现成营地布置", "基本露营桌椅"],
        exclusions: ["交通", "未注明的营地费用"],
        addOns: ["交通", "餐食", "额外租借装备"],
        whatsappTemplate: "你好 AFFT，我想咨询 Solo Explorer 单人露营（CAMP-SOLO-399）。",
      },
    },
  },
  {
    offerId: "CAMP-EXPLORER-599",
    slug: "explorer-camp",
    category: "camping",
    priceFrom: 599,
    priceType: "from",
    capacity: "2 guests",
    duration: "2D1N",
    status: "active",
    lastReviewedAt: "2026-07-12",
    locales: {
      en: {
        name: "Explorer Camp",
        summary: "AFFT's ready-built signature camping experience for two.",
        inclusions: ["Tent and shelter setup", "Table and chairs"],
        exclusions: ["Transport", "Campsite fees unless stated"],
        addOns: ["Transport", "Meals", "Creator gear"],
        whatsappTemplate: "Hi AFFT, I want to ask about Explorer Camp (CAMP-EXPLORER-599).",
      },
      zh: {
        name: "Explorer Camp 双人露营",
        summary: "AFFT 为两人准备的招牌现成露营体验。",
        inclusions: ["帐篷与遮棚布置", "桌椅"],
        exclusions: ["交通", "未注明的营地费用"],
        addOns: ["交通", "餐食", "Creator Gear"],
        whatsappTemplate: "你好 AFFT，我想咨询 Explorer Camp（CAMP-EXPLORER-599）。",
      },
    },
  },
  {
    offerId: "CAMP-ASTRO-799",
    slug: "couple-camp-milky-way",
    category: "camping",
    priceFrom: 799,
    priceType: "from",
    capacity: "2 guests",
    duration: "2D1N",
    status: "active",
    lastReviewedAt: "2026-07-12",
    locales: {
      en: {
        name: "Astro Hunter Couple Camp",
        summary: "A comfort-focused couple camp for night-sky moments.",
        inclusions: ["Ready-built couple setup", "Comfort camp furniture"],
        exclusions: ["Weather guarantee", "Transport unless stated"],
        addOns: ["Transport", "Meals", "Camera gear"],
        whatsappTemplate: "Hi AFFT, I want to ask about Astro Hunter Couple Camp (CAMP-ASTRO-799).",
      },
      zh: {
        name: "Astro Hunter 星空双人露营",
        summary: "以夜空体验为重点的舒适双人露营。",
        inclusions: ["现成双人布置", "舒适露营桌椅"],
        exclusions: ["天气保证", "未注明的交通"],
        addOns: ["交通", "餐食", "摄影装备"],
        whatsappTemplate: "你好 AFFT，我想咨询 Astro Hunter 星空双人露营（CAMP-ASTRO-799）。",
      },
    },
  },
  {
    offerId: "CAMP-FAMILY-CUSTOM",
    slug: "family-camp",
    category: "camping",
    priceFrom: null,
    priceType: "custom",
    capacity: "Family / small group",
    duration: "On request",
    status: "on-request",
    lastReviewedAt: "2026-07-12",
    locales: {
      en: {
        name: "Family Camp",
        summary: "A custom camp plan based on group size, ages and location.",
        inclusions: ["Recommended setup", "Group-size planning"],
        exclusions: ["Final campsite and transport until quoted"],
        addOns: ["Transport", "Meals", "Extra tents"],
        whatsappTemplate: "Hi AFFT, I want a custom Family Camp quote (CAMP-FAMILY-CUSTOM).",
      },
      zh: {
        name: "家庭露营",
        summary: "按人数、年龄和地点定制的家庭露营方案。",
        inclusions: ["合适的装备建议", "按人数规划"],
        exclusions: ["报价前未确认的营地及交通"],
        addOns: ["交通", "餐食", "额外帐篷"],
        whatsappTemplate: "你好 AFFT，我想咨询家庭露营定制报价（CAMP-FAMILY-CUSTOM）。",
      },
    },
  },
];

export function getOffer(offerId?: string) {
  return offers.find((offer) => offer.offerId === offerId);
}

