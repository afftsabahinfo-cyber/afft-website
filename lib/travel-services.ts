export type TravelService = {
  slug: string;
  href: string;
  eyebrow: string;
  title: string;
  image: string;
  imageAlt: string;
  text: string;
  whatsappText: string;
  intro: string;
  overview: string;
  quickFacts: Array<{
    label: string;
    value: string;
  }>;
  goodFor: string[];
  howAfftHelps: string[];
  whatToSend: string[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
};

export const travelServices: TravelService[] = [
  {
    slug: "airport-transfer",
    href: "/travel-services/airport-transfer",
    eyebrow: "Airport",
    title: "Airport Transfer",
    image: "/images/airport-transfer-cover.webp",
    imageAlt: "AFFT private airport transfer and car support in Sabah",
    text: "Private arrival and departure support for airport, hotel and campsite movement.",
    whatsappText:
      "Hi AFFT, I want details for the Airport Transfer service in Sabah.",
    intro:
      "A simple private transfer option for guests who want a smoother arrival or departure in Sabah.",
    overview:
      "AFFT can help connect your airport timing with hotel check-in, campsite movement or the next part of your Sabah route. This is useful when you are carrying luggage, travelling with family or arriving at a time where you do not want to arrange transport from zero.",
    quickFacts: [
      { label: "Service Type", value: "Private transfer" },
      { label: "Best For", value: "Airport, hotel and campsite movement" },
      { label: "Contact", value: "WhatsApp first" },
    ],
    goodFor: [
      "Airport pickup or drop-off",
      "Hotel to campsite transfer",
      "Small groups carrying luggage",
      "Guests who want direct WhatsApp coordination",
    ],
    howAfftHelps: [
      "Confirm pickup point, date and timing before the trip",
      "Match the vehicle plan to guest count and luggage",
      "Keep the route practical for airport, town, hotel or campsite movement",
      "Give simple WhatsApp coordination before arrival",
    ],
    whatToSend: [
      "Flight number and arrival or departure time",
      "Pickup and drop-off location",
      "Number of guests and luggage size",
      "Any campsite, hotel or next-stop timing",
    ],
    faqs: [
      {
        question: "Can AFFT handle airport pickup and drop-off?",
        answer:
          "Yes. Send your date, flight time, pickup point and drop-off point so AFFT can check the best arrangement.",
      },
      {
        question: "Is this only for airport to hotel?",
        answer:
          "No. It can also support hotel, campsite and next-stop movement when the route is practical.",
      },
    ],
  },
  {
    slug: "kundasang-private-tour",
    href: "/travel-services/kundasang-private-tour",
    eyebrow: "Mountain",
    title: "Kundasang Private Tour",
    image: "/images/kundasang-private-tour-cover.webp",
    imageAlt: "Mount Kinabalu and Kundasang mountain view in Sabah",
    text: "Flexible mountain day trip and overnight journey around Kundasang.",
    whatsappText:
      "Hi AFFT, I want details for the Kundasang Private Tour.",
    intro:
      "A private highland route for guests who want Mount Kinabalu views, cooler air and a calmer Sabah day.",
    overview:
      "Kundasang works well for couples, families and small groups who want a flexible mountain day without joining a fixed group tour. AFFT can help shape the route around scenic stops, food breaks, weather, group pace and transport comfort.",
    quickFacts: [
      { label: "Service Type", value: "Private day tour or overnight route" },
      { label: "Best For", value: "Mountain views and cooler highlands" },
      { label: "Route Style", value: "Flexible private movement" },
    ],
    goodFor: [
      "Mount Kinabalu view stops",
      "Couples and small groups",
      "Family-friendly private movement",
      "Guests who prefer flexible timing",
    ],
    howAfftHelps: [
      "Plan a realistic highland route based on your pickup point",
      "Keep timing flexible around weather and scenic stops",
      "Suggest a comfortable vehicle setup for mountain roads",
      "Coordinate add-ons such as camping, Rent It gear or longer route support",
    ],
    whatToSend: [
      "Preferred travel date",
      "Pickup location and number of guests",
      "Day trip or overnight preference",
      "Main interest: views, food, photos, campsite or slow travel",
    ],
    faqs: [
      {
        question: "Can the Kundasang route be private?",
        answer:
          "Yes. AFFT focuses on private movement so the route can follow your group pace where practical.",
      },
      {
        question: "Can this connect with camping?",
        answer:
          "Yes. Tell AFFT if you want camping, campsite support or Rent It gear added to the route.",
      },
    ],
  },
  {
    slug: "sandakan-private-tour",
    href: "/travel-services/sandakan-private-tour",
    eyebrow: "Sandakan",
    title: "Sandakan Private Tour",
    image: "/images/sandakan-private-tour-cover.webp",
    imageAlt:
      "AFFT Sandakan private tour cover with city, sea, wildlife and heritage highlights",
    text: "Private east coast route for Sandakan city, nature, wildlife and heritage stops.",
    whatsappText:
      "Hi AFFT, I want details for the Sandakan Private Tour.",
    intro:
      "A private east coast Sabah route for guests interested in Sandakan nature, wildlife, sea views and heritage stops.",
    overview:
      "Sandakan is a good fit for visitors who want a different side of Sabah beyond the highlands. AFFT can help plan a private route around city movement, nature stops, wildlife interest and a practical travel pace.",
    quickFacts: [
      { label: "Service Type", value: "Private nature and city route" },
      { label: "Best For", value: "Nature, wildlife and heritage interest" },
      { label: "Route Area", value: "Sandakan and east coast Sabah" },
    ],
    goodFor: [
      "Nature-focused Sabah travellers",
      "Wildlife and rainforest interest",
      "Sandakan city and sea-view stops",
      "Guests who want a private route instead of a rushed group tour",
    ],
    howAfftHelps: [
      "Plan a route around your Sandakan arrival and stay duration",
      "Balance nature, wildlife and heritage stops in one realistic day",
      "Coordinate private movement for small groups or families",
      "Keep the enquiry simple through WhatsApp before confirming details",
    ],
    whatToSend: [
      "Sandakan travel date and arrival point",
      "Number of guests",
      "Main interest: wildlife, nature, city, sea view or heritage",
      "One-day or multi-day preference",
    ],
    faqs: [
      {
        question: "Is this the same as a Semporna island trip?",
        answer:
          "No. This service is focused on Sandakan nature, wildlife, heritage and east coast route planning.",
      },
      {
        question: "Can AFFT help with a nature-focused route?",
        answer:
          "Yes. Tell AFFT your main nature or wildlife interest so the route can be planned around it where practical.",
      },
    ],
  },
  {
    slug: "tiggo-alphard-charter",
    href: "/travel-services/tiggo-alphard-charter",
    eyebrow: "Private Car",
    title: "Tiggo 8 Pro / Alphard Charter",
    image: "/images/tiggo-alphard-charter-cover.webp",
    imageAlt: "AFFT Tiggo and Alphard private charter cover",
    text: "Private car charter for airport transfer, flexible Sabah routes and comfortable group movement.",
    whatsappText:
      "Hi AFFT, I want details for the Tiggo 8 Pro, Alphard charter or VIP travel service.",
    intro:
      "A private charter option for guests who want more comfortable movement around Sabah.",
    overview:
      "This service fits families, small groups and visitors who prefer a private vehicle for airport transfer, highland routes, city movement or multi-stop Sabah days. AFFT can help match the route and vehicle style to the group size and luggage.",
    quickFacts: [
      { label: "Service Type", value: "Private car charter" },
      { label: "Vehicle Focus", value: "Tiggo 8 Pro / Alphard" },
      { label: "Best For", value: "Families, small groups and VIP movement" },
    ],
    goodFor: [
      "Airport transfer with more comfort",
      "Kundasang and highland routes",
      "Small group Sabah movement",
      "Guests who want private timing instead of fixed public transport",
    ],
    howAfftHelps: [
      "Understand group size, route and luggage before suggesting the setup",
      "Plan private movement for airport, city, highland or multi-stop days",
      "Keep communication direct through WhatsApp",
      "Coordinate the charter around your Sabah travel plan",
    ],
    whatToSend: [
      "Travel date and route idea",
      "Number of guests and luggage size",
      "Preferred vehicle type if any",
      "Pickup point, drop-off point and stops you want",
    ],
    faqs: [
      {
        question: "Can I use this for a full-day route?",
        answer:
          "Yes. Send your route idea, timing and number of stops so AFFT can check the practical arrangement.",
      },
      {
        question: "Which vehicle should I choose?",
        answer:
          "AFFT can suggest the better fit after checking guest count, luggage and route type.",
      },
    ],
  },
];

export const getTravelService = (slug: string) =>
  travelServices.find((service) => service.slug === slug);
