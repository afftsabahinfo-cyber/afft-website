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
  title: "Sabah Private Tours | AFFT Club",
  description:
    "Private Sabah tour support for Kundasang, Sandakan, mountain routes, nature stops and flexible small-group travel. WhatsApp AFFT to plan your route.",
  alternates: {
    canonical: "/private-tours",
  },
  openGraph: {
    title: "Sabah Private Tours | AFFT Club",
    description:
      "Flexible private Sabah route planning with AFFT for families, couples and small groups.",
    images: [
      {
        url: "/images/kundasang-private-tour-cover.webp",
        alt: "Mount Kinabalu and Kundasang private tour in Sabah",
      },
    ],
  },
};

const routes = [
  {
    href: "/travel-services/kundasang-private-tour",
    image: "/images/kundasang-private-tour-cover.webp",
    title: "Kundasang Private Tour",
    text: "Cooler highland route for Mount Kinabalu views, food stops, photos and flexible timing.",
  },
  {
    href: "/travel-services/sandakan-private-tour",
    image: "/images/sandakan-private-tour-cover.webp",
    title: "Sandakan Private Tour",
    text: "East coast route for nature, wildlife interest, heritage stops and sea-view movement.",
  },
  {
    href: "/camping",
    image: "/images/kiulu-campsite.webp",
    title: "Camping Add-On Route",
    text: "Connect a private route with campsite support, Rent It gear or a slower outdoor stay.",
  },
];

const planningPoints = [
  {
    title: "Private pace",
    text: "The route can follow your group pace where practical, instead of forcing a rushed shared tour format.",
  },
  {
    title: "Route fit first",
    text: "AFFT checks pickup point, guest count, route distance and weather-sensitive stops before suggesting the next step.",
  },
  {
    title: "Easy WhatsApp start",
    text: "Send your rough idea first. You do not need a perfect itinerary before asking AFFT.",
  },
];

export default function PrivateToursPage() {
  return (
    <main className="min-h-screen bg-[#10140F] text-white">
      <section
        className="relative bg-cover bg-center px-6 py-8 md:px-10"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(16,20,15,.96), rgba(16,20,15,.72), rgba(16,20,15,.28)), url(/images/kundasang-private-tour-cover.webp)",
        }}
      >
        <div className="mx-auto max-w-7xl">
          <SiteTopNav />

          <div className="max-w-4xl py-24 md:py-32">
            <p className="mb-6 inline-block rounded-full border border-white/30 bg-black/30 px-5 py-2 text-sm">
              Private Sabah Tours
            </p>
            <h1 className="text-5xl font-bold leading-tight md:text-7xl">
              Flexible Sabah routes for small groups.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78 md:text-xl">
              AFFT is for travellers who want a more personal route around
              mountain views, nature stops, camping add-ons or private movement.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={makeWhatsappLink(
                  "Hi AFFT, I want to plan a private Sabah tour."
                )}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-[#F3922B] px-8 py-4 font-bold text-black"
              >
                WhatsApp Private Tour Enquiry
              </a>
              <a
                href="#routes"
                className="rounded-full border border-white/35 bg-black/25 px-8 py-4 font-bold text-white"
              >
                View Route Ideas
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="routes" className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <SectionHeading
          small="Route Ideas"
          big="Choose a direction first. AFFT can shape the details by WhatsApp."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {routes.map((route) => (
            <a
              key={route.href}
              href={route.href}
              className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-[#F3922B]/40"
            >
              <img
                src={route.image}
                alt={route.title}
                className="h-56 w-full object-cover"
              />
              <div className="p-6">
                <h2 className="text-3xl font-bold">{route.title}</h2>
                <p className="mt-4 text-white/70">{route.text}</p>
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
            small="AFFT Tour Style"
            big="Private does not need to be complicated."
            text="The goal is to help guests move through Sabah with a route that feels realistic, calm and useful."
          />

          <div className="grid gap-6 md:grid-cols-3">
            {planningPoints.map((item) => (
              <InfoCard key={item.title} title={item.title} text={item.text} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <WhatsAppEnquiryBuilder
          title="Send AFFT your private tour idea"
          text="AFFT can reply faster when the route, date, pickup point and group size are clear."
          defaultService="Private tour"
          defaultInterest="Kundasang, Sandakan, nature stops or camping add-on"
          services={[
            { label: "Private tour", value: "Private tour" },
            { label: "Kundasang route", value: "Kundasang private route" },
            { label: "Sandakan route", value: "Sandakan private route" },
            { label: "Private tour with camping", value: "Private tour with camping" },
            { label: "Private car charter", value: "Private car charter" },
          ]}
        />
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 md:px-10">
        <PageFinalCta
          title="Have a rough Sabah route in mind?"
          text="Send AFFT your date, pickup point, number of guests and main interests. We will help you shape the next practical step."
          message="Hi AFFT, I want to plan a private Sabah tour."
          buttonLabel="WhatsApp AFFT About Private Tours"
        />
      </section>

      <SiteFooter />
    </main>
  );
}
