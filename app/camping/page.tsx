import type { Metadata } from "next";
import { WhatsAppEnquiryBuilder } from "@/components/WhatsAppEnquiryBuilder";
import {
  InfoCard,
  PageFinalCta,
  SectionHeading,
  SiteFooter,
  SiteTopNav,
} from "@/components/V3PageSections";
import { jimnyCampPackages } from "@/lib/jimny-camp-packages";
import { makeWhatsappLink } from "@/lib/rent-it-data";

export const metadata: Metadata = {
  title: "Sabah Camping Packages | AFFT Club",
  description:
    "AFFT camping packages in Sabah including Jimny Camp Series, couples, solo travellers, families and stargazing trips. WhatsApp AFFT to plan your dates, group size and setup.",
  alternates: {
    canonical: "/camping",
  },
  openGraph: {
    title: "Sabah Camping Packages | AFFT Club",
    description:
      "Ready-built Sabah camping experiences with AFFT support, real campsite planning and WhatsApp-first coordination.",
    images: [
      {
        url: "/images/mount-kinabalu-camping-experience-rm699-en.webp",
        alt: "AFFT Mount Kinabalu Camping Experience RM699 poster",
      },
    ],
  },
};

const packages = [
  ...jimnyCampPackages.map((pkg) => ({
    href: pkg.href,
    image: pkg.image,
    price: pkg.priceLabel,
    title: pkg.shortTitle,
    text: pkg.cardText,
    bestFor: pkg.bestFor,
  })),
  {
    href: "/packages/solo-explorer",
    image: "/images/solo-explorer-poster.webp",
    price: "From RM399",
    title: "Solo Explorer",
    text: "Light outdoor reset for solo travellers, creators and first-time campers.",
    bestFor: "1 person / light setup / short getaway",
  },
  {
    href: "/packages/explorer-camp",
    image: "/images/afft-explorer-camp-rm599-sabah.webp",
    price: "From RM599",
    title: "Explorer Camp",
    text: "AFFT signature 2D1N setup for couples, friends and first-time campers.",
    bestFor: "2-4 pax / comfort / easy first camp",
  },
  {
    href: "/packages/couple-camp-milky-way",
    image: "/images/afft-astro-hunter-rm799-milky-way-sabah.webp",
    price: "From RM799",
    title: "Couple Camp Milky Way",
    text: "Night-focused camp for cooler air, star views and photo-friendly moments.",
    bestFor: "Couples / stargazing / special nights",
  },
  {
    href: "/packages/family-camp",
    image: "/images/afft-family-camp-series-sabah.webp",
    price: "Custom quote",
    title: "Family Camp Series",
    text: "Family-friendly camping shaped around children, comfort and easier planning.",
    bestFor: "Parents / children / slower outdoor time",
  },
];

const steps = [
  {
    title: "Tell AFFT your group",
    text: "Send the date, number of guests, preferred pickup point and whether you want a simple camp, family camp or starry-night setup.",
  },
  {
    title: "Match the campsite and setup",
    text: "AFFT can recommend the practical campsite direction, tent style, furniture level and add-ons based on your group.",
  },
  {
    title: "Confirm by WhatsApp",
    text: "The enquiry stays simple. You get the next practical step on WhatsApp before deciding the final arrangement.",
  },
];

const faqs = [
  {
    question: "Do I need to own camping gear?",
    answer:
      "No. AFFT camping packages are built for guests who want the outdoor experience without buying the whole setup first.",
  },
  {
    question: "Can AFFT help with transport?",
    answer:
      "Yes. Tell AFFT your pickup point and group size. Transport or car charter can be discussed together with the camping plan.",
  },
  {
    question: "Which package should first-time campers choose?",
    answer:
      "Explorer Camp is usually the easiest starting point because it gives a fuller ready-made setup without becoming too complicated.",
  },
  {
    question: "Can I add Rent It gear?",
    answer:
      "Yes. Guests can ask about creator gear, camp furniture, lighting, tents or other Rent It items when planning the trip.",
  },
];

export default function CampingPage() {
  return (
    <main className="min-h-screen bg-[#10140F] text-white">
      <section
        className="relative bg-cover bg-center px-6 py-8 md:px-10"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(16,20,15,.96), rgba(16,20,15,.74), rgba(16,20,15,.32)), url(/images/customer-stories/explorer-camp-rm599/explorer-camp-rm599-cover.webp)",
        }}
      >
        <div className="mx-auto max-w-7xl">
          <SiteTopNav />

          <div className="max-w-4xl py-24 md:py-32">
            <p className="mb-6 inline-block rounded-full border border-white/30 bg-black/30 px-5 py-2 text-sm">
              Sabah Camping Packages
            </p>
            <h1 className="text-5xl font-bold leading-tight md:text-7xl">
              Camping made easier for real Sabah outdoor time.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78 md:text-xl">
              AFFT helps guests start with a ready camp setup, practical
              campsite planning and WhatsApp-first coordination.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={makeWhatsappLink(
                  "Hi AFFT, I want help choosing a Sabah camping package."
                )}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-[#F3922B] px-8 py-4 font-bold text-black"
              >
                WhatsApp Camping Enquiry
              </a>
              <a
                href="#packages"
                className="rounded-full border border-white/35 bg-black/25 px-8 py-4 font-bold text-white"
              >
                View Packages
              </a>
              <a
                href="/camping-spots"
                className="rounded-full border border-white/35 bg-black/25 px-8 py-4 font-bold text-white"
              >
                View Campsite Guide
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        id="mount-kinabalu-camping-experience"
        className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:px-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center"
      >
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl shadow-black/30">
          <img
            src="/images/mount-kinabalu-camping-experience-rm699-en.webp"
            alt="Mount Kinabalu Camping Experience RM699 AFFT poster"
            className="w-full bg-[#07130f] object-contain"
          />
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#F3922B]">
            Featured Camping Experience
          </p>
          <h2 className="mt-4 text-4xl font-bold leading-tight md:text-6xl">
            Mount Kinabalu Camping Experience from RM699 / pax.
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/72">
            A simple 2 days 1 night Kundasang camping package for guests who
            want the mountain view, a ready Mobi Garden 245 tent setup and Tiggo
            8 Pro private movement without handling the gear themselves.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <InfoCard title="Duration" text="2 days 1 night camping experience." />
            <InfoCard title="Location" text="Kundasang, Sabah / Mount Kinabalu view direction." />
            <InfoCard title="Best For" text="First-time campers, couples and private small groups." />
            <InfoCard title="Includes" text="Tent setup, basic camping equipment, Tiggo 8 Pro and AFFT support." />
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={makeWhatsappLink(
                "Hi AFFT, I want details for the Mount Kinabalu Camping Experience RM699 package."
              )}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[#F3922B] px-8 py-4 font-bold text-black"
            >
              Ask About RM699 Experience
            </a>
            <a
              href="#packages"
              className="rounded-full border border-white/30 px-8 py-4 font-bold text-white"
            >
              Compare Other Packages
            </a>
          </div>
        </div>
      </section>

      <section id="packages" className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <SectionHeading
          small="Package Options"
          big="Start from the trip style, then WhatsApp AFFT to confirm fit."
          text="These packages are intentionally simple. The final plan can still adjust around campsite, weather, transport and guest count."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {packages.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-[#F3922B]/40"
            >
              <img
                src={item.image}
                alt={`${item.title} AFFT camping package`}
                className="h-56 w-full bg-white object-contain p-2"
              />
              <div className="p-6">
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#F3922B]">
                  {item.price}
                </p>
                <h2 className="mt-4 text-3xl font-bold">{item.title}</h2>
                <p className="mt-4 text-white/70">{item.text}</p>
                <p className="mt-4 text-sm text-white/55">{item.bestFor}</p>
                <span className="mt-6 inline-block font-bold text-[#F3922B]">
                  View Package &rarr;
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="bg-[#182015] px-6 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            small="How It Works"
            big="Keep the planning practical before you commit."
          />

          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step) => (
              <InfoCard key={step.title} title={step.title} text={step.text} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <WhatsAppEnquiryBuilder
          title="Ask AFFT about camping with the key details ready"
          text="Send date, guests and the kind of camp you want. AFFT can reply with the package fit, add-ons and next step."
          defaultService="Camping package"
          defaultInterest="Jimny Camp Series, Explorer Camp, family camp or Milky Way camping"
        />
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 md:px-10">
        <SectionHeading
          small="Camping FAQ"
          big="Quick answers before you WhatsApp AFFT."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {faqs.map((faq) => (
            <InfoCard key={faq.question} title={faq.question} text={faq.answer} />
          ))}
        </div>

        <div className="mt-16">
          <PageFinalCta
            title="Ready to plan a Sabah camping trip?"
            text="Send AFFT your date, group size and preferred camping style. We will reply on WhatsApp with the practical next step."
            message="Hi AFFT, I want to plan a Sabah camping trip."
            buttonLabel="WhatsApp AFFT About Camping"
          />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
