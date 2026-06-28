import type { Metadata } from "next";
import { WhatsAppEnquiryBuilder } from "@/components/WhatsAppEnquiryBuilder";
import {
  InfoCard,
  PageFinalCta,
  SectionHeading,
  SiteFooter,
  SiteTopNav,
} from "@/components/V3PageSections";
import { makeWhatsappLink } from "@/lib/rent-it-data";

export const metadata: Metadata = {
  title: "Sabah Car Rental and Private Charter | AFFT Club",
  description:
    "AFFT private car charter, Tiggo 8 Pro, Alphard and airport transfer support for Sabah routes, campsites and small groups.",
  alternates: {
    canonical: "/car-rental",
  },
  openGraph: {
    title: "Sabah Car Rental and Private Charter | AFFT Club",
    description:
      "Private car movement for airport transfer, Kundasang routes, campsites and flexible Sabah travel.",
    images: [
      {
        url: "/images/tiggo-alphard-charter-cover.webp",
        alt: "AFFT Tiggo and Alphard private charter in Sabah",
      },
    ],
  },
};

const services = [
  {
    href: "/travel-services/tiggo-alphard-charter",
    title: "Tiggo 8 Pro / Alphard Charter",
    image: "/images/tiggo-alphard-charter-cover.webp",
    text: "Private charter for airport transfer, highland routes, city movement and comfortable small-group travel.",
  },
  {
    href: "/travel-services/airport-transfer",
    title: "Airport Transfer",
    image: "/images/airport-transfer-cover.webp",
    text: "Private arrival and departure support between airport, hotel, campsite and next route stop.",
  },
  {
    href: "/private-tours",
    title: "Route Support",
    image: "/images/kundasang-private-tour-cover.webp",
    text: "Use the vehicle plan together with Kundasang, Sandakan, camping or Rent It support.",
  },
];

const facts = [
  {
    title: "WhatsApp first",
    text: "Send pickup, drop-off, timing, guest count and luggage. AFFT can check the practical arrangement before you decide.",
  },
  {
    title: "Private movement",
    text: "Best for families, small groups, airport transfer, highland days and guests who want flexible timing.",
  },
  {
    title: "Trip add-ons",
    text: "Car rental can connect with camping, Rent It gear, private tours and airport transfer support.",
  },
];

export default function CarRentalPage() {
  return (
    <main className="min-h-screen bg-[#10140F] text-white">
      <section
        className="relative bg-cover bg-center px-6 py-8 md:px-10"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(16,20,15,.96), rgba(16,20,15,.72), rgba(16,20,15,.25)), url(/images/tiggo-alphard-charter-cover.webp)",
        }}
      >
        <div className="mx-auto max-w-7xl">
          <SiteTopNav />

          <div className="max-w-4xl py-24 md:py-32">
            <p className="mb-6 inline-block rounded-full border border-white/30 bg-black/30 px-5 py-2 text-sm">
              Sabah Car Rental / Private Charter
            </p>
            <h1 className="text-5xl font-bold leading-tight md:text-7xl">
              Private movement for airport, campsites and Sabah routes.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78 md:text-xl">
              AFFT helps guests arrange practical private car support for
              airport transfer, family movement, highland routes and campsite
              connections.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={makeWhatsappLink(
                  "Hi AFFT, I want details for car rental or private charter in Sabah."
                )}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-[#F3922B] px-8 py-4 font-bold text-black"
              >
                WhatsApp Car Enquiry
              </a>
              <a
                href="#car-services"
                className="rounded-full border border-white/35 bg-black/25 px-8 py-4 font-bold text-white"
              >
                View Options
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="car-services" className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <SectionHeading
          small="Car Support"
          big="Use the car plan as part of the whole Sabah trip."
          text="For AFFT, car rental is not just transport. It helps connect airport, hotel, campsite, mountain routes and private travel days."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {services.map((service) => (
            <a
              key={service.href}
              href={service.href}
              className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-[#F3922B]/40"
            >
              <img
                src={service.image}
                alt={service.title}
                className="h-56 w-full object-cover"
              />
              <div className="p-6">
                <h2 className="text-3xl font-bold">{service.title}</h2>
                <p className="mt-4 text-white/70">{service.text}</p>
                <span className="mt-6 inline-block font-bold text-[#F3922B]">
                  View Details &rarr;
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="bg-[#182015] px-6 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            small="What To Send"
            big="Clear route details make the reply faster."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {facts.map((fact) => (
              <InfoCard key={fact.title} title={fact.title} text={fact.text} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <WhatsAppEnquiryBuilder
          title="Send AFFT the car route details"
          text="The more practical the first message is, the easier it is to check timing, route and vehicle fit."
          defaultService="Car rental / charter"
          defaultInterest="Tiggo 8 Pro, Alphard, airport transfer or private route"
          services={[
            { label: "Car rental / charter", value: "Car rental / charter" },
            { label: "Airport transfer", value: "Airport transfer" },
            { label: "Tiggo 8 Pro charter", value: "Tiggo 8 Pro charter" },
            { label: "Alphard charter", value: "Alphard charter" },
            { label: "Car with private tour", value: "Car with private tour" },
          ]}
        />
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 md:px-10">
        <PageFinalCta
          title="Need private movement around Sabah?"
          text="Send AFFT the date, route, guest count and luggage details. We will reply with the practical next step on WhatsApp."
          message="Hi AFFT, I want details for car rental or private charter in Sabah."
          buttonLabel="WhatsApp AFFT About Car Rental"
        />
      </section>

      <SiteFooter />
    </main>
  );
}
