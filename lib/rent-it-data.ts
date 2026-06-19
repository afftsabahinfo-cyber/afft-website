export const whatsapp = "https://wa.me/601111598920";

export const makeWhatsappLink = (text: string) =>
  `${whatsapp}?text=${encodeURIComponent(text)}`;

export const normalizeRentItTitle = (title: string) => {
  if (title.includes("5.9")) {
    return "Black Dog XingSu 5.9";
  }

  if (title.includes("245")) {
    return "Mobi Garden Commander 245";
  }

  return title;
};

export type MainSeriesSlug =
  | "creator-series"
  | "camp-lifestyle-series"
  | "premium-camp-series"
  | "tent-experience-series";

export type MainSeries = {
  slug: MainSeriesSlug;
  title: string;
  route: string;
  hook: string;
  bestFor: string;
  startingFrom: string;
  image: string;
  imageAlt: string;
};

export type CatalogItem = {
  title: string;
  day1: string;
  day2: string;
  day3: string;
  bestFor: string;
};

export type FeaturedPick = {
  title: string;
  route: string;
  price: string;
  description: string;
  image?: string;
};

export type TentShowcaseItem = {
  title: string;
  capacity: string;
  route: string;
  day1: string;
  day2: string;
  day3: string;
  description: string;
  bestFor: string[];
  image?: string;
};

export type HelinoxTier = {
  title: string;
  price: string;
  includes: string;
};

export type SeriesPageSummary = {
  eyebrow: string;
  title: string;
  intro: string;
  featuredTitle: string;
  featuredPrice: string;
  featuredText: string;
  featuredImage?: string;
  heroImage?: string;
  heroImageAlt?: string;
  bestFor: string;
  priceRange: string;
  route: string;
};

export const rentItStats = [
  { value: "25", label: "gear items and bundle options" },
  { value: "4", label: "rental series to browse" },
  { value: "1", label: "WhatsApp contact for booking help" },
];

export const rentItMainSeries: MainSeries[] = [
  {
    slug: "creator-series",
    title: "Creator Series",
    route: "/rent-it/creator-series",
    hook: "Pocket 4 / Action 6 / Mic 3 / Avata",
    bestFor: "Vlog, travel shooting, road trip edits and stargazing content.",
    startingFrom: "From RM49 / day",
    image: "/images/rent-it-creator-series-cover.webp",
    imageAlt: "AFFT Creator Series cover",
  },
  {
    slug: "camp-lifestyle-series",
    title: "Camp Lifestyle Series",
    route: "/rent-it/camp-lifestyle-series",
    hook: "Coffee / Heater / Snow Peak",
    bestFor: "Coffee corners, compact warmth, light cooking and slower campsite mood.",
    startingFrom: "From RM19 / day",
    image: "/images/rent-it-camp-lifestyle-series-cover.webp",
    imageAlt: "AFFT Camp Lifestyle Series cover",
  },
  {
    slug: "premium-camp-series",
    title: "Premium Camp Series",
    route: "/rent-it/premium-camp-series",
    hook: "Helinox / Snow Peak Furniture",
    bestFor: "Comfort-led camp setups, premium seating and better outdoor rest.",
    startingFrom: "From RM19 / day",
    image: "/images/rent-it-premium-camp-series-cover.webp",
    imageAlt: "AFFT Premium Camp Series cover",
  },
  {
    slug: "tent-experience-series",
    title: "Tent Experience Series",
    route: "/rent-it/tent-experience-series",
    hook: "Black Dog / Mobi Garden",
    bestFor: "Couple glamping, family camp and group camping statements.",
    startingFrom: "From RM159 / day",
    image: "/images/rent-it-tent-experience-series-cover.webp",
    imageAlt: "AFFT Tent Experience Series cover",
  },
];

export const creatorSeriesItems: CatalogItem[] = [
  {
    title: "DJI Pocket 4 Creator Combo",
    day1: "RM99",
    day2: "RM179",
    day3: "RM239",
    bestFor: "Travel vlogs and smooth walk-and-talk shooting.",
  },
  {
    title: "DJI Action 6",
    day1: "RM79",
    day2: "RM139",
    day3: "RM189",
    bestFor: "POV clips, trail action and water-side content.",
  },
  {
    title: "DJI Mic 3",
    day1: "RM49",
    day2: "RM79",
    day3: "RM109",
    bestFor: "Clear voice capture, interviews and creator upgrades.",
  },
  {
    title: "DJI Avata 360 Fly More Combo",
    day1: "RM199",
    day2: "RM359",
    day3: "RM499",
    bestFor: "FPV cinematic flights and adventure reels.",
  },
  {
    title: "DJI Goggles 3 + Motion 3",
    day1: "RM79",
    day2: "RM139",
    day3: "RM189",
    bestFor: "FPV control support and immersive pilot sessions.",
  },
  {
    title: "Pocket 4 + Mic 3",
    day1: "RM139",
    day2: "RM249",
    day3: "RM339",
    bestFor: "Interview-ready travel content with simple setup.",
  },
  {
    title: "Pocket 4 + Action 6",
    day1: "RM129",
    day2: "RM229",
    day3: "RM309",
    bestFor: "Dual-angle creator coverage for active Sabah trips.",
  },
  {
    title: "Creator Full Set",
    day1: "RM169",
    day2: "RM299",
    day3: "RM399",
    bestFor: "Weekend creator setup with stronger flexibility.",
  },
];

export const campLifestyleItems: CatalogItem[] = [
  {
    title: "Mobi Garden Grandburn Heater",
    day1: "RM39",
    day2: "RM69",
    day3: "RM89",
    bestFor: "Cooler nights, warm drinks and slower campsite comfort.",
  },
  {
    title: "Bialetti Coffee Set",
    day1: "RM39",
    day2: "RM69",
    day3: "RM89",
    bestFor: "Morning coffee rituals and campsite brewing moments.",
  },
  {
    title: "KZM Kitchen Tool Set",
    day1: "RM29",
    day2: "RM49",
    day3: "RM69",
    bestFor: "Simple campsite prep and practical cooking support.",
  },
  {
    title: "Snow Peak Flat Burner",
    day1: "RM49",
    day2: "RM89",
    day3: "RM119",
    bestFor: "Premium tabletop cooking with clean presentation.",
  },
  {
    title: "Snow Peak Setsuen Pot",
    day1: "RM39",
    day2: "RM69",
    day3: "RM99",
    bestFor: "Warm meals, noodles and shared campsite dinners.",
  },
  {
    title: "Black Dog Combination Light",
    day1: "RM19",
    day2: "RM29",
    day3: "RM39",
    bestFor: "Ambient glow and softer campsite atmosphere.",
  },
];

export const premiumCampItems: CatalogItem[] = [
  {
    title: "Helinox Chair",
    day1: "RM29",
    day2: "RM49",
    day3: "RM69",
    bestFor: "Ultralight premium seating with better comfort.",
  },
  {
    title: "Helinox Cot Set",
    day1: "RM79",
    day2: "RM139",
    day3: "RM189",
    bestFor: "Better outdoor sleep and elevated rest.",
  },
  {
    title: "Helinox Solo Full Set",
    day1: "RM199",
    day2: "RM359",
    day3: "RM499",
    bestFor: "High-end solo glamping and creator-friendly camp.",
  },
  {
    title: "Snow Peak Director Chair",
    day1: "RM29",
    day2: "RM49",
    day3: "RM69",
    bestFor: "Relaxed outdoor lounge seating with premium feel.",
  },
  {
    title: "Snow Peak Table",
    day1: "RM19",
    day2: "RM29",
    day3: "RM39",
    bestFor: "Compact premium dining and small camp layouts.",
  },
];

export const experienceSetItems: CatalogItem[] = [
  {
    title: "Snow Peak Chill Set (2 chairs + 1 table)",
    day1: "RM59",
    day2: "RM99",
    day3: "RM129",
    bestFor: "Couple chill setup and easy outdoor lounge moments.",
  },
  {
    title: "Outdoor Coffee Set",
    day1: "RM79",
    day2: "RM139",
    day3: "RM179",
    bestFor: "Coffee ritual package for scenic slow mornings.",
  },
  {
    title: "Creator Chill Set",
    day1: "RM139",
    day2: "RM249",
    day3: "RM329",
    bestFor: "Content plus comfort for road trips and glamping days.",
  },
];

export const tentShowcaseItems: TentShowcaseItem[] = [
  {
    title: "Black Dog Modular Tent System",
    capacity: "6-10 pax",
    route: "/rent-it/tent-experience-series",
    day1: "RM499",
    day2: "RM899",
    day3: "RM1199",
    description:
      "A modular statement tent system for family gatherings, group camp weekends and event-style outdoor setups.",
    bestFor: ["Group Camp", "Family Gathering", "Event Camp"],
    image: "/images/blackdog-modular-tent-system.webp",
  },
  {
    title: "Black Dog 星宿 5.9",
    capacity: "1-2 adults or 2 adults + child",
    route: "/rent-it/tent-experience-series",
    day1: "RM159",
    day2: "RM279",
    day3: "RM379",
    description:
      "A luxury couple glamping tent with softer visual appeal for romantic stays and premium overnight content.",
    bestFor: ["Couple Glamping", "Luxury Camp"],
    image: "/images/blackdog-xingsu59.webp",
  },
  {
    title: "Mobi Garden 指挥官245",
    capacity: "2-4 pax",
    route: "/rent-it/tent-experience-series",
    day1: "RM399",
    day2: "RM729",
    day3: "RM999",
    description:
      "A more accessible family camp tent for guests who want comfort without stepping into a huge tent system.",
    bestFor: ["Family Camp", "Entry Level"],
    image: "/images/mobi-garden-commander-245.webp",
  },
];

export const featuredPicks: FeaturedPick[] = [
  {
    title: "DJI Pocket 4 Creator Combo",
    route: "/rent-it/creator-series",
    price: "From RM99 / day",
    description: "Travel-ready storytelling for smooth motion, beach reels and quick Sabah vlogs.",
    image: "/images/dji-pocket4-creator-combo.webp",
  },
  {
    title: "DJI Avata 360 Fly More Combo",
    route: "/rent-it/creator-series",
    price: "From RM199 / day",
    description: "Immersive FPV shots for mountain roads, coastlines and dramatic travel edits.",
    image: "/images/dji-avata-360.webp",
  },
  {
    title: "Mobi Garden Grandburn Heater",
    route: "/rent-it/camp-lifestyle-series",
    price: "From RM39 / day",
    description: "Compact camp warmth for cooler nights, hot drinks and a more memorable campsite mood.",
    image: "/images/mobi-garden-grandburn-heater.webp",
  },
  {
    title: "Helinox Solo Full Set",
    route: "/rent-it/premium-camp-series",
    price: "From RM199 / day",
    description: "A premium solo sleep-and-chill setup built for comfort, style and lighter packing.",
    image: "/images/helinox-chair.webp",
  },
  {
    title: "Black Dog 星宿 5.9",
    route: "/rent-it/tent-experience-series",
    price: "From RM159 / day",
    description: "A couple glamping tent with real atmosphere for Sabah luxury camp stays.",
    image: "/images/blackdog-xingsu59.webp",
  },
  {
    title: "Black Dog Modular Tent System",
    route: "/rent-it/tent-experience-series",
    price: "From RM499 / day",
    description: "A larger statement setup for groups, gatherings and event-style outdoor weekends.",
    image: "/images/blackdog-modular-tent-system.webp",
  },
];

export const helinoxTiers: HelinoxTier[] = [
  {
    title: "Helinox Solo Base Set",
    price: "RM79 / day",
    includes: "Chair, hard top table, cup holder and stool for a lighter chill setup.",
  },
  {
    title: "Helinox Solo Sleep Set",
    price: "RM149 / day",
    includes: "Tac cot convertible, cot legs and solo inner tent for sleep-focused bookings.",
  },
  {
    title: "Helinox Tactical Solo Full Set",
    price: "RM199 / day",
    includes: "The full flagship sleep-and-chill package with stronger premium lifestyle appeal.",
  },
];

export const helinoxNotes = [
  "This is a premium Helinox experience, not a basic chair rental.",
  "A strong fit for Kundasang, Kiulu, glamping, solo slow trips and creator stays.",
  "Ask AFFT about availability, condition notes and any deposit guidance before confirming.",
];

export const comingSoonItems = [
  "DJI Osmo Nano 128GB",
  "DJI Osmo 360",
  "Action 6 Accessories Pack",
  "Pocket 4 Accessories Pack",
  "Snow Peak Titanium Cup Series",
  "Snow Peak IGT System",
  "PG-1 Mobility Camp Set",
];

export const seriesPageSummaries: Record<MainSeriesSlug, SeriesPageSummary> = {
  "creator-series": {
    eyebrow: "Creator Series",
    title: "Travel-ready creator tools for Sabah stories.",
    intro:
      "This series is built for vlog days, road trips, scenic stops and creator weekends where guests want better footage without owning every device.",
    featuredTitle: "DJI Pocket 4 Creator Combo",
    featuredPrice: "From RM99 / day",
    featuredText:
      "The easiest first booking for guests who want smooth travel storytelling with a premium handheld setup.",
    featuredImage: "/images/dji-pocket4-creator-combo.webp",
    heroImage: "/images/rent-it-creator-series-cover.webp",
    heroImageAlt: "AFFT Creator Series hero cover",
    bestFor: "Vlogs, travel shooting, POV content and weekend creator trips.",
    priceRange: "RM49 to RM499 across creator items and bundles.",
    route: "/rent-it/creator-series",
  },
  "camp-lifestyle-series": {
    eyebrow: "Camp Lifestyle Series",
    title: "Coffee, cooking and slower campsite rituals.",
    intro:
      "This series is for guests who care about atmosphere as much as function. It turns a basic campsite into a more memorable, more visual outdoor stay with coffee, cooking and compact warmth.",
    featuredTitle: "Mobi Garden Grandburn Heater",
    featuredPrice: "From RM39 / day",
    featuredText:
      "A compact lifestyle heater for cooler Sabah nights, warm drinks and slower campsite moments without carrying a bulky setup.",
    featuredImage: "/images/mobi-garden-grandburn-heater.webp",
    heroImage: "/images/mobi-garden-grandburn-heater.webp",
    heroImageAlt: "Mobi Garden Grandburn Heater in a campsite setup",
    bestFor: "Coffee rituals, compact heating, simple meals, lifestyle glamping and visual campsite mood.",
    priceRange: "RM19 to RM119 across practical camp lifestyle pieces.",
    route: "/rent-it/camp-lifestyle-series",
  },
  "premium-camp-series": {
    eyebrow: "Premium Camp Series",
    title: "Furniture and sleep systems with stronger comfort value.",
    intro:
      "This is where AFFT moves beyond ordinary camping gear into premium seating, elevated sleep and cleaner outdoor styling.",
    featuredTitle: "Helinox Solo Full Set",
    featuredPrice: "From RM199 / day",
    featuredText:
      "The flagship premium-camp booking for guests who want a stronger lifestyle look and a more complete solo camp experience.",
    featuredImage: "/images/helinox-chair.webp",
    heroImage: "/images/rent-it-premium-camp-series-cover.webp",
    heroImageAlt: "AFFT Premium Camp Series hero cover",
    bestFor: "Comfort-led camp setups, glamping feel and upgraded rest.",
    priceRange: "RM19 to RM499 across premium camp furniture and Helinox systems.",
    route: "/rent-it/premium-camp-series",
  },
  "tent-experience-series": {
    eyebrow: "Tent Experience Series",
    title: "Tent systems that feel like stays, not just shelter.",
    intro:
      "These tents carry more value, more visual identity and a bigger booking decision, so the page should present them like premium experiences.",
    featuredTitle: "Black Dog Modular Tent System",
    featuredPrice: "From RM499 / day",
    featuredText:
      "The standout large-format tent option for group camp, gatherings and event-style outdoor plans.",
    featuredImage: "/images/blackdog-modular-tent-system.webp",
    heroImage: "/images/rent-it-tent-experience-series-cover.webp",
    heroImageAlt: "AFFT Tent Experience Series hero cover",
    bestFor: "Couple glamping, family camp, group camp and event-style stays.",
    priceRange: "RM159 to RM1199 across the current tent lineup.",
    route: "/rent-it/tent-experience-series",
  },
};

export const catalogSections = [
  {
    title: "Creator Series",
    route: "/rent-it/creator-series",
    items: creatorSeriesItems,
  },
  {
    title: "Camp Lifestyle Series",
    route: "/rent-it/camp-lifestyle-series",
    items: campLifestyleItems,
  },
  {
    title: "Premium Camp Series",
    route: "/rent-it/premium-camp-series",
    items: premiumCampItems,
  },
  {
    title: "Experience Set Series",
    route: "/rent-it",
    items: experienceSetItems,
  },
];
