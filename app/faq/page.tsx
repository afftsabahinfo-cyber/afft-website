import type { Metadata } from "next";
import {
  FaqCard,
  PageFinalCta,
  SectionHeading,
  SiteFooter,
  SiteTopNav,
} from "@/components/V3PageSections";
import { makeWhatsappLink } from "@/lib/rent-it-data";

export const metadata: Metadata = {
  title: "AFFT FAQ | Camping, Rent It, Private Tours and Car Rental",
  description:
    "Quick AFFT answers for Sabah camping packages, Rent It gear, private tours, car rental and WhatsApp enquiries.",
  alternates: {
    canonical: "/faq",
  },
};

const faqGroups = [
  {
    title: "Camping Packages",
    items: [
      {
        question: "Do I need camping experience?",
        answer:
          "No. AFFT camping packages are designed to make the first step easier, especially for guests who do not own camping gear.",
      },
      {
        question: "Can AFFT suggest the right package?",
        answer:
          "Yes. Send your date, group size and preferred style on WhatsApp. AFFT can suggest the practical package fit.",
      },
      {
        question: "Can transport be added?",
        answer:
          "Yes. Transport or private car support can be discussed together with the campsite and package plan.",
      },
    ],
  },
  {
    title: "Rent It",
    items: [
      {
        question: "Can I rent gear without booking a package?",
        answer:
          "Yes. Ask AFFT about availability, trip fit, condition notes and pickup or usage details through WhatsApp.",
      },
      {
        question: "What Rent It gear does AFFT focus on?",
        answer:
          "AFFT focuses on creator gear, camp lifestyle gear, premium camp furniture and tent experience systems.",
      },
      {
        question: "Can AFFT help me choose gear?",
        answer:
          "Yes. Send the trip style, group size and what you want to shoot or experience. AFFT can recommend the right setup.",
      },
    ],
  },
  {
    title: "Private Tours and Car Rental",
    items: [
      {
        question: "Are AFFT tours private?",
        answer:
          "AFFT focuses on private movement and flexible route planning where practical, especially for small groups and families.",
      },
      {
        question: "Can AFFT handle airport transfer?",
        answer:
          "Yes. Send flight time, pickup point, drop-off point, guest count and luggage details for a practical check.",
      },
      {
        question: "Can a private tour connect with camping?",
        answer:
          "Yes. AFFT can help connect private route support with camping packages, Rent It gear or campsite movement.",
      },
    ],
  },
  {
    title: "Booking by WhatsApp",
    items: [
      {
        question: "Why does AFFT use WhatsApp first?",
        answer:
          "WhatsApp keeps the first enquiry simple and flexible. AFFT can ask the right follow-up questions before confirming the final arrangement.",
      },
      {
        question: "What should I send first?",
        answer:
          "Send travel date, number of guests, pickup or location, service interest and any special notes such as children, luggage or gear needs.",
      },
      {
        question: "Does the website take online payment?",
        answer:
          "No. The public website is focused on enquiries. Final arrangements should be confirmed directly with AFFT.",
      },
    ],
  },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqGroups.flatMap((group) =>
    group.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    }))
  ),
};

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-[#10140F] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="px-6 py-8 md:px-10">
        <div className="mx-auto max-w-7xl">
          <SiteTopNav />

          <div className="max-w-4xl py-20 md:py-28">
            <p className="mb-6 inline-block rounded-full border border-white/30 bg-black/30 px-5 py-2 text-sm">
              AFFT FAQ
            </p>
            <h1 className="text-5xl font-bold leading-tight md:text-7xl">
              Quick answers before you WhatsApp AFFT.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78 md:text-xl">
              Simple answers for camping packages, Rent It gear, private tours,
              car rental and first enquiries.
            </p>
            <a
              href={makeWhatsappLink(
                "Hi AFFT, I have a question about AFFT camping, Rent It, private tours or car rental."
              )}
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-flex rounded-full bg-[#F3922B] px-8 py-4 font-bold text-black"
            >
              WhatsApp AFFT
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 md:px-10">
        {faqGroups.map((group) => (
          <section key={group.title} className="mb-14">
            <SectionHeading small="FAQ" big={group.title} />
            <div className="grid gap-4 md:grid-cols-3">
              {group.items.map((item) => (
                <FaqCard
                  key={item.question}
                  question={item.question}
                  answer={item.answer}
                />
              ))}
            </div>
          </section>
        ))}

        <PageFinalCta
          title="Still not sure?"
          text="Send AFFT a short WhatsApp message with your date, group size and rough plan. We will help you choose the right next step."
          message="Hi AFFT, I need help choosing the right AFFT service."
        />
      </section>

      <SiteFooter />
    </main>
  );
}
