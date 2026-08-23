import type { Metadata } from "next";
import {
  FaqCard,
  InfoCard,
  PageFinalCta,
  SectionHeading,
  SiteFooter,
  SiteTopNav,
} from "@/components/V3PageSections";
import {
  jimnyCampPackages,
  type JimnyCampPackage,
} from "@/lib/jimny-camp-packages";
import { makeWhatsappLink } from "@/lib/rent-it-data";

const siteUrl = "https://afft.club";

export function buildJimnyCampMetadata(pkg: JimnyCampPackage): Metadata {
  return {
    title: `${pkg.title} ${pkg.priceLabel} | AFFT Jimny Camp Series`,
    description: pkg.summary,
    alternates: {
      canonical: pkg.href,
      languages: {
        en: pkg.href,
        "zh-Hans": pkg.zhHref,
      },
    },
    openGraph: {
      title: `${pkg.title} ${pkg.priceLabel} | AFFT Jimny Camp Series`,
      description: pkg.summary,
      images: [
        {
          url: pkg.image,
          alt: pkg.imageAlt,
        },
      ],
    },
  };
}

export function JimnyCampPackagePage({ pkg }: { pkg: JimnyCampPackage }) {
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: pkg.title,
    brand: {
      "@type": "Brand",
      name: "AFFT",
    },
    category: "Jimny camping package",
    image: `${siteUrl}${pkg.image}`,
    description: pkg.summary,
    offers: {
      "@type": "Offer",
      url: `${siteUrl}${pkg.href}`,
      priceCurrency: "MYR",
      price: pkg.priceValue,
      availability: "https://schema.org/InStock",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pkg.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Camping Packages",
        item: `${siteUrl}/camping`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: pkg.title,
        item: `${siteUrl}${pkg.href}`,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#10140F] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            productJsonLd,
            faqJsonLd,
            breadcrumbJsonLd,
          ]),
        }}
      />

      <section className="px-6 py-8 md:px-10">
        <div className="mx-auto max-w-7xl">
          <SiteTopNav zhHref={pkg.zhHref} />

          <div className="mt-12 grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <div>
              <a href="/camping" className="text-sm font-bold text-[#F3922B]">
                &larr; Back to Camping Packages
              </a>
              <p className="mt-8 text-sm font-bold uppercase tracking-[0.3em] text-[#F3922B]">
                Jimny Camp Series
              </p>
              <h1 className="mt-4 text-5xl font-bold leading-tight md:text-7xl">
                {pkg.title}
              </h1>
              <p className="mt-6 text-2xl text-white/80">
                {pkg.priceLabel} / {pkg.duration} / {pkg.pax}
              </p>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">
                {pkg.summary}
              </p>
              <p className="mt-5 max-w-2xl rounded-3xl border border-[#F3922B]/25 bg-[#F3922B]/10 p-5 text-white/78">
                {pkg.positioning}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={makeWhatsappLink(pkg.whatsappText)}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-[#F3922B] px-8 py-4 font-bold text-black"
                >
                  Ask About {pkg.shortTitle}
                </a>
                <a
                  href="#package-ladder"
                  className="rounded-full border border-white/30 px-8 py-4 font-bold text-white"
                >
                  Compare Jimny Packages
                </a>
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-2xl shadow-black/30">
              <img
                src={pkg.image}
                alt={pkg.imageAlt}
                className="w-full rounded-[1.5rem] bg-[#07130f] object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        <div className="grid gap-6 md:grid-cols-4">
          <InfoCard title="Price" text={pkg.priceLabel} />
          <InfoCard title="Duration" text={pkg.duration} />
          <InfoCard title="Guests" text={pkg.pax} />
          <InfoCard title="Campsite" text={pkg.campsite} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        <div className="rounded-[2rem] bg-[#182015] p-8 md:p-10">
          <SectionHeading
            small="Package Includes"
            big="Everything listed in this Jimny camp package."
            text="Final availability, campsite fit and date are still confirmed by WhatsApp before booking."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {pkg.includes.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white/72"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 md:p-10">
          <SectionHeading
            small={pkg.notIncluded.length > 0 ? "Not Included" : "Full Experience"}
            big={
              pkg.notIncluded.length > 0
                ? "These items are not part of the base package."
                : "The key comfort, cooking and camp setup items are already included."
            }
            text={
              pkg.notIncluded.length > 0
                ? "You can still ask AFFT to quote suitable add-ons when planning your dates."
                : "Food, drinks and personal items should still be confirmed separately through WhatsApp."
            }
          />

          {pkg.notIncluded.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {pkg.notIncluded.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-black/20 p-4 text-white/65"
                >
                  {item}
                </div>
              ))}
            </div>
          ) : (
            <p className="max-w-3xl text-lg leading-8 text-white/72">
              JIMNY Adventure Camp is the most complete Jimny Camp Series
              option. It is built for guests who want to arrive, camp and enjoy
              a better presented setup without piecing together every item one
              by one.
            </p>
          )}
        </div>
      </section>

      <section
        id="package-ladder"
        className="mx-auto max-w-7xl px-6 py-10 md:px-10"
      >
        <SectionHeading
          small="Package Ladder"
          big="Choose the Jimny camp level that matches your comfort needs."
          text="RM399 is the lightest option, RM599 is the most popular balance, and RM799 is the full camp setup."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {jimnyCampPackages.map((item) => (
            <a
              key={item.slug}
              href={item.href}
              className={`rounded-[2rem] border p-6 transition hover:-translate-y-1 ${
                item.slug === pkg.slug
                  ? "border-[#F3922B]/60 bg-[#F3922B]/10"
                  : "border-white/10 bg-white/5 hover:border-[#F3922B]/40"
              }`}
            >
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#F3922B]">
                {item.badge}
              </p>
              <h2 className="mt-4 text-3xl font-bold">{item.shortTitle}</h2>
              <p className="mt-3 text-xl font-bold text-white/85">
                {item.priceLabel}
              </p>
              <p className="mt-4 text-white/68">{item.cardText}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        <SectionHeading
          small="FAQ"
          big="Quick answers before you WhatsApp AFFT."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {pkg.faqs.map((faq) => (
            <FaqCard
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 pt-10 md:px-10">
        <PageFinalCta
          title={`Want to check ${pkg.shortTitle} availability?`}
          text="Send AFFT your date, pickup point and guest details. We will confirm campsite fit, availability and the next practical step on WhatsApp."
          message={pkg.whatsappText}
          buttonLabel={`WhatsApp AFFT About ${pkg.shortTitle}`}
        />
      </section>

      <SiteFooter />
    </main>
  );
}
