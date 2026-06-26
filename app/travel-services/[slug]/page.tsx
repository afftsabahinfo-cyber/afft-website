import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AfftBrand, AfftLogoMark } from "@/components/AfftBrand";
import { makeWhatsappLink, whatsapp } from "@/lib/rent-it-data";
import {
  getTravelService,
  travelServices,
  type TravelService,
} from "@/lib/travel-services";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return travelServices.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getTravelService(slug);

  if (!service) {
    return {
      title: "Travel Service | AFFT Club",
    };
  }

  return {
    title: `${service.title} | AFFT Travel Services`,
    description: service.intro,
    alternates: {
      canonical: service.href,
    },
    openGraph: {
      title: `${service.title} | AFFT Travel Services`,
      description: service.intro,
      images: [
        {
          url: service.image,
          alt: service.imageAlt,
        },
      ],
    },
  };
}

export default async function TravelServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getTravelService(slug);

  if (!service) {
    notFound();
  }

  const serviceWhatsapp = makeWhatsappLink(service.whatsappText);
  const otherServices = travelServices.filter((item) => item.slug !== service.slug);

  return (
    <main className="min-h-screen bg-[#10140F] text-white">
      <section className="mx-auto max-w-7xl px-6 py-8 md:px-10 md:py-12">
        <nav className="flex items-center justify-between gap-4">
          <AfftBrand
            href="/"
            className="shrink-0"
            markClassName="h-10 w-10 md:h-12 md:w-12"
            labelClassName="hidden text-sm tracking-[0.22em] sm:block md:text-base"
          />

          <div className="flex items-center gap-3 text-sm font-bold">
            <a
              href="/#travel"
              className="hidden rounded-full border border-white/15 px-5 py-3 text-white/85 sm:inline-flex"
            >
              Travel Services
            </a>
            <a
              href={whatsapp}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[#F3922B] px-5 py-3 text-black"
            >
              WhatsApp
            </a>
          </div>
        </nav>

        <div className="mt-10 grid gap-10 xl:grid-cols-[0.85fr_1.15fr] xl:items-start">
          <div className="pt-2">
            <a href="/#travel" className="text-sm font-bold text-[#F3922B]">
              Back to Travel Services
            </a>

            <p className="mt-8 text-sm font-bold uppercase tracking-[0.3em] text-[#F3922B]">
              {service.eyebrow}
            </p>

            <h1 className="mt-4 text-5xl font-bold leading-tight md:text-7xl">
              {service.title}
            </h1>

            <p className="mt-6 max-w-2xl text-xl leading-8 text-white/75">
              {service.intro}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={serviceWhatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-full bg-[#F3922B] px-7 py-4 font-bold text-black"
              >
                WhatsApp About This Service
              </a>
              <a
                href="/#travel"
                className="inline-flex rounded-full border border-white/15 px-7 py-4 font-bold text-white"
              >
                View All Travel Services
              </a>
            </div>
          </div>

          <div className="relative rounded-[2rem] border border-white/10 bg-white p-2 shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
            <img
              src={service.image}
              alt={service.imageAlt}
              className="w-full rounded-[1.5rem]"
            />
            <AfftLogoMark
              decorative
              className="absolute right-5 top-5 h-14 w-14 drop-shadow-[0_10px_24px_rgba(0,0,0,0.35)]"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        <div className="grid gap-8 xl:grid-cols-[1fr_0.95fr]">
          <article className="rounded-[2rem] bg-[#182015] p-8 md:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#F3922B]">
              Service Overview
            </p>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              What this service is for
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/72">
              {service.overview}
            </p>
          </article>

          <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
            {service.quickFacts.map((fact) => (
              <InfoBlock key={fact.label} label={fact.label} value={fact.value} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:px-10 xl:grid-cols-3">
        <ListBlock title="Best For" items={service.goodFor} />
        <ListBlock title="How AFFT Helps" items={service.howAfftHelps} />
        <ListBlock title="Send Us First" items={service.whatToSend} />
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        <div className="rounded-[2rem] bg-[#182015] p-8 md:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#F3922B]">
            FAQ
          </p>
          <h2 className="mt-4 text-3xl font-bold md:text-4xl">
            Quick answers before you WhatsApp AFFT
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {service.faqs.map((faq) => (
              <FaqItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#F3922B]">
            More Travel Services
          </p>
          <h2 className="mt-4 text-3xl font-bold md:text-4xl">
            Other AFFT routes guests ask about
          </h2>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {otherServices.map((item) => (
            <a
              key={item.slug}
              href={item.href}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-[#F3922B]/40"
            >
              <img
                src={item.image}
                alt={item.imageAlt}
                className="h-40 w-full bg-white object-contain p-2"
              />
              <div className="p-5">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#F3922B]">
                  {item.eyebrow}
                </p>
                <h3 className="mt-3 text-xl font-bold">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/65">{item.text}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 pt-10 md:px-10">
        <div className="rounded-[2rem] bg-[#F3922B] p-8 text-black md:p-12">
          <h2 className="text-4xl font-bold md:text-5xl">
            Want this service for your Sabah trip?
          </h2>
          <p className="mt-4 max-w-3xl text-lg">
            Send AFFT your date, group size and route idea. We will reply on
            WhatsApp with the practical next step.
          </p>
          <a
            href={serviceWhatsapp}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex rounded-full bg-black px-8 py-4 font-bold text-white"
          >
            WhatsApp AFFT About {service.title}
          </a>
        </div>
      </section>
    </main>
  );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#F3922B]">
        {label}
      </p>
      <p className="mt-3 text-lg font-bold text-white">{value}</p>
    </div>
  );
}

function ListBlock({
  title,
  items,
}: {
  title: string;
  items: TravelService["goodFor"];
}) {
  return (
    <article className="rounded-[2rem] border border-white/10 bg-white/5 p-7">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="mt-6 grid gap-3">
        {items.map((item) => (
          <div key={item} className="rounded-2xl bg-[#182015] p-4 text-white/72">
            {item}
          </div>
        ))}
      </div>
    </article>
  );
}

function FaqItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h3 className="text-xl font-bold">{question}</h3>
      <p className="mt-3 leading-7 text-white/70">{answer}</p>
    </article>
  );
}
