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
  title: "About AFFT | Sabah Outdoor Experiences",
  description:
    "AFFT is a Sabah outdoor experience brand focused on camping packages, Rent It gear, private tours and car rental support through WhatsApp.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About AFFT | Sabah Outdoor Experiences",
    description:
      "AFFT helps travellers experience Sabah through camping, private routes, Rent It gear and practical WhatsApp coordination.",
    images: [
      {
        url: "/images/kinabalu-hero.webp",
        alt: "Mount Kinabalu Sabah outdoor landscape",
      },
    ],
  },
};

const values = [
  {
    title: "Not a traditional travel agency",
    text: "AFFT focuses on outdoor experience, private movement and practical planning instead of fixed generic tour packages.",
  },
  {
    title: "Outdoor lifestyle first",
    text: "Camping, gear rental and private routes are connected into one simpler Sabah planning experience.",
  },
  {
    title: "WhatsApp-first service",
    text: "Guests can start with one message and let AFFT help clarify the right next step before committing.",
  },
];

const markets = [
  "Taiwan travellers",
  "Malaysia travellers",
  "Thailand travellers",
  "International visitors",
  "Creators and small groups",
  "Families and couples",
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#10140F] text-white">
      <section
        className="relative bg-cover bg-center px-6 py-8 md:px-10"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(16,20,15,.96), rgba(16,20,15,.70), rgba(16,20,15,.30)), url(/images/kinabalu-hero.webp)",
        }}
      >
        <div className="mx-auto max-w-7xl">
          <SiteTopNav />

          <div className="max-w-4xl py-24 md:py-32">
            <p className="mb-6 inline-block rounded-full border border-white/30 bg-black/30 px-5 py-2 text-sm">
              About AFFT
            </p>
            <h1 className="text-5xl font-bold leading-tight md:text-7xl">
              Sabah outdoor travel should feel personal and practical.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78 md:text-xl">
              Adventure Frontier Freedom Travel helps guests start real Sabah
              outdoor experiences through camping, Rent It gear, private tours
              and car rental support.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={makeWhatsappLink(
                  "Hi AFFT, I want to understand which AFFT service fits my Sabah trip."
                )}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-[#F3922B] px-8 py-4 font-bold text-black"
              >
                WhatsApp AFFT
              </a>
              <a
                href="/customer-stories"
                className="rounded-full border border-white/35 bg-black/25 px-8 py-4 font-bold text-white"
              >
                View Customer Stories
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <SectionHeading
          small="AFFT Positioning"
          big="AFFT is built around Sabah outdoor experience, not generic travel."
          text="The public website should help guests understand what AFFT does and then move them into a useful WhatsApp conversation."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {values.map((value) => (
            <InfoCard key={value.title} title={value.title} text={value.text} />
          ))}
        </div>
      </section>

      <section className="bg-[#182015] px-6 py-20 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 xl:grid-cols-[0.95fr_1.05fr] xl:items-center">
          <div>
            <SectionHeading
              small="What AFFT Offers"
              big="One brand, four practical starting points."
              text="Guests can start from the experience they understand fastest, then ask AFFT to connect the missing pieces."
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <a href="/camping" className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-2xl font-bold">Camping Packages</h2>
              <p className="mt-3 text-white/70">
                Ready-built outdoor stays for first-time campers, couples and families.
              </p>
            </a>
            <a href="/rent-it" className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-2xl font-bold">Rent It</h2>
              <p className="mt-3 text-white/70">
                Creator gear, camp lifestyle gear, premium furniture and tent systems.
              </p>
            </a>
            <a href="/private-tours" className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-2xl font-bold">Private Tours</h2>
              <p className="mt-3 text-white/70">
                Flexible Sabah routes around Kundasang, Sandakan, nature and campsites.
              </p>
            </a>
            <a href="/car-rental" className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-2xl font-bold">Car Rental</h2>
              <p className="mt-3 text-white/70">
                Private car charter and airport transfer support for small groups.
              </p>
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <SectionHeading
          small="Who AFFT Serves"
          big="Built for travellers who want a smoother first step into Sabah."
        />

        <div className="grid gap-4 md:grid-cols-3">
          {markets.map((market) => (
            <div
              key={market}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 text-lg font-bold"
            >
              {market}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 md:px-10">
        <WhatsAppEnquiryBuilder
          title="Not sure where to start?"
          text="Tell AFFT your travel date, group size and rough interest. We can point you to camping, Rent It, private tour or car support."
          defaultService="Not sure yet"
          defaultInterest="Please recommend the right AFFT service"
          services={[
            { label: "Not sure yet", value: "Not sure yet" },
            { label: "Camping package", value: "Camping package" },
            { label: "Rent It gear", value: "Rent It gear" },
            { label: "Private tour", value: "Private tour" },
            { label: "Car rental / charter", value: "Car rental / charter" },
          ]}
        />

        <div className="mt-16">
          <PageFinalCta
            title="Start with one WhatsApp message."
            text="Send AFFT your date, group size and what kind of Sabah outdoor experience you want. We will reply with the practical next step."
            message="Hi AFFT, I want help choosing the right AFFT service for my Sabah trip."
          />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
