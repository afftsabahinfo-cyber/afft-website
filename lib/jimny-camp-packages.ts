export type JimnyCampPackage = {
  slug: string;
  href: string;
  zhHref: string;
  image: string;
  imageAlt: string;
  priceLabel: string;
  priceValue: number;
  title: string;
  shortTitle: string;
  badge: string;
  summary: string;
  positioning: string;
  cardText: string;
  duration: string;
  pax: string;
  campsite: string;
  bestFor: string;
  includes: string[];
  notIncluded: string[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  whatsappText: string;
};

export const jimnySleepCamp: JimnyCampPackage = {
  slug: "jimny-sleep-camp",
  href: "/packages/jimny-sleep-camp",
  zhHref: "/zh/packages/jimny-sleep-camp",
  image: "/images/jimny-sleep-camp-rm399.webp",
  imageAlt: "AFFT RM399 Jimny Sleep Camp package poster",
  priceLabel: "RM399",
  priceValue: 399,
  title: "JIMNY Sleep Camp",
  shortTitle: "Jimny Sleep Camp",
  badge: "Simple Light Camp",
  summary:
    "A simple 2 days 1 night Jimny camping package for two guests who want to drive in, set up, sleep and enjoy the Jimny experience.",
  positioning:
    "Simple Light Camp. Drive in, set up, sleep, enjoy the Jimny experience.",
  cardText:
    "The lightest Jimny camp option for two guests who want the vehicle, campsite and core sleep setup included.",
  duration: "2 Days 1 Night",
  pax: "2 Pax",
  campsite: "Campsite included",
  bestFor: "2 pax / simple light camp / Jimny sleep experience",
  includes: [
    "Jimny Sierra",
    "Campsite fee",
    "Car sleeping mat Mobi Garden",
    "2 camping chair Black Dog",
    "1 folding table Nature Hike",
    "2 LED lantern Black Dog",
    "1 JBL GO 5 Speaker",
    "2 Snowpeak Mug",
    "2 Refreshing Kit",
    "1 Fly Sheet with Pole Black Dog",
  ],
  notIncluded: [
    "Cooler box",
    "Cookware set",
    "Coffee brewing set",
    "Portable fan",
    "Premium lighting",
    "Food and drinks",
  ],
  faqs: [
    {
      question: "Who should choose JIMNY Sleep Camp?",
      answer:
        "Choose this if you want the simplest Jimny camping experience for two with campsite, car sleep setup and basic camp comfort included.",
    },
    {
      question: "Is food included in RM399?",
      answer:
        "No. Food and drinks are not included. This package focuses on the Jimny, campsite fee and core camping setup.",
    },
    {
      question: "Can I add cooking gear or cooler box?",
      answer:
        "Yes. AFFT can quote add-ons through WhatsApp if you want cookware, cooler box, coffee gear, fan or extra lighting.",
    },
    {
      question: "Is this good for first-time campers?",
      answer:
        "Yes. It is the easiest Jimny camp entry because the setup is intentionally light and not overcomplicated.",
    },
  ],
  whatsappText:
    "Hi AFFT, I want details for the RM399 JIMNY Sleep Camp package.",
};

export const jimnyExplorerCamp: JimnyCampPackage = {
  slug: "jimny-explorer-camp",
  href: "/packages/jimny-explorer-camp",
  zhHref: "/zh/packages/jimny-explorer-camp",
  image: "/images/jimny-explorer-camp-rm599.webp",
  imageAlt: "AFFT RM599 Jimny Explorer Camp package poster",
  priceLabel: "RM599",
  priceValue: 599,
  title: "JIMNY Explorer Camp",
  shortTitle: "Jimny Explorer Camp",
  badge: "Most Popular",
  summary:
    "A complete basic Jimny camping package for two guests with tent, campsite, sleep setup, chairs, table, fan, lighting and simple camp lifestyle items.",
  positioning:
    "The complete basic camping package for two. This is the Most Popular Jimny camp package.",
  cardText:
    "The most balanced Jimny camp package for two, with tent, sleep setup, fan, lighting and campsite included.",
  duration: "2 Days 1 Night",
  pax: "2 Pax",
  campsite: "Campsite included",
  bestFor: "2 pax / first Jimny camp / most popular balance",
  includes: [
    "Jimny Sierra",
    "Campsite fee",
    "2 Pax tent rooftop tent or Base Camp tent",
    "2 sleeping mats Mobi Garden or double bed",
    "2 camping chairs Black Dog",
    "1 folding table Big Black Dog",
    "2 LED Lantern Light",
    "2 Snowpeak Mug",
    "Portable fan with powerbank",
    "1 Fly Sheet with Pole Black Dog",
    "2 Refreshing Kit",
    "JBL GO 5 Speaker",
  ],
  notIncluded: [
    "Cooler box",
    "Coffee brewing set",
    "Food and drinks",
    "Premium camp furniture",
    "Decorative lighting",
  ],
  faqs: [
    {
      question: "Why is RM599 marked Most Popular?",
      answer:
        "It gives two guests the most practical balance: Jimny, campsite, tent, sleeping setup, chairs, table, lighting, fan and small lifestyle items.",
    },
    {
      question: "Is this better than JIMNY Sleep Camp?",
      answer:
        "Yes if you want a real tent setup and more camp comfort. RM399 is lighter; RM599 is the complete basic option.",
    },
    {
      question: "Does it include campsite fee?",
      answer:
        "Yes. The Jimny Camp Series is listed as 2 days 1 night, 2 pax and includes campsite.",
    },
    {
      question: "Can I add coffee or cooler box?",
      answer:
        "Yes. Coffee brewing set and cooler box are not included by default, but AFFT can quote them as add-ons.",
    },
  ],
  whatsappText:
    "Hi AFFT, I want details for the RM599 JIMNY Explorer Camp package.",
};

export const jimnyAdventureCamp: JimnyCampPackage = {
  slug: "jimny-adventure-camp",
  href: "/packages/jimny-adventure-camp",
  zhHref: "/zh/packages/jimny-adventure-camp",
  image: "/images/jimny-adventure-camp-rm799.webp",
  imageAlt: "AFFT RM799 Jimny Adventure Camp package poster",
  priceLabel: "RM799",
  priceValue: 799,
  title: "JIMNY Adventure Camp",
  shortTitle: "Jimny Adventure Camp",
  badge: "Full Experience",
  summary:
    "The full Jimny camping experience for two guests with premium tent, better sleeping setup, Helinox chairs, 270 awning, cooking gear, coffee gear, cooler box and premium lighting.",
  positioning:
    "Full Jimny camping experience. More comfort, better campsite presentation, better photos.",
  cardText:
    "The full Jimny camp setup for two guests who want more comfort, better presentation and photo-ready camp details.",
  duration: "2 Days 1 Night",
  pax: "2 Pax",
  campsite: "Campsite included",
  bestFor: "2 pax / full setup / better comfort and photos",
  includes: [
    "Jimny Sierra",
    "Campsite fee",
    "Premium 2 Pax tent rooftop tent or Base Camp",
    "2 sleeping mats tactical bed or premium air mattress",
    "2 premium camping chairs Helinox",
    "1 camping table Big",
    "Side awning 270",
    "LED lantern set 4 pcs premium setting",
    "Cooking stove Kovea",
    "Cookware set Iwatani",
    "Coffee brewing set Bialetti",
    "Cooler box 26 Liter",
    "Portable fan 2 pcs",
    "JBL GO 5 speaker 2 pcs",
    "2 Snowpeak Mug",
    "2 Refreshing Kit",
  ],
  notIncluded: [],
  faqs: [
    {
      question: "What makes JIMNY Adventure Camp different?",
      answer:
        "It includes the fuller camp setup: premium tent option, Helinox chairs, 270 awning, cooking gear, coffee setup, cooler box and premium lighting.",
    },
    {
      question: "Is RM799 suitable for photos and content?",
      answer:
        "Yes. This package has the strongest campsite presentation and is better for guests who care about comfort and photos.",
    },
    {
      question: "Is cooking gear included?",
      answer:
        "Yes. The package includes Kovea cooking stove, Iwatani cookware set and Bialetti coffee brewing set.",
    },
    {
      question: "Do I still need to bring anything?",
      answer:
        "Bring personal items, clothes, toiletries and your own food or drinks unless AFFT confirms a separate meal arrangement.",
    },
  ],
  whatsappText:
    "Hi AFFT, I want details for the RM799 JIMNY Adventure Camp package.",
};

export const jimnyCampPackages = [
  jimnySleepCamp,
  jimnyExplorerCamp,
  jimnyAdventureCamp,
] as const;

export function getJimnyCampPackage(slug: string) {
  return jimnyCampPackages.find((pkg) => pkg.slug === slug);
}
