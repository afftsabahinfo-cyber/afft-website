import type { Metadata } from "next";
import {
  PageFinalCta,
  SectionHeading,
  SiteFooter,
  SiteTopNav,
} from "@/components/V3PageSections";
import {
  customerStories,
  explorerCampPhotos,
} from "@/lib/customer-stories-data";
import { makeWhatsappLink } from "@/lib/rent-it-data";
import { TrackedLink } from "@/components/TrackedLink";

const leadStory = customerStories[0];

export const metadata: Metadata = {
  title: "AFFT Customer Stories | Real Sabah Camping and Travel Support",
  description:
    "Real AFFT customer stories from Explorer Camp, private car charter and Sabah outdoor support. See what guests actually book before WhatsApping AFFT.",
  alternates: {
    canonical: "/customer-stories",
  },
  openGraph: {
    title: "AFFT Customer Stories",
    description:
      "Real customer stories from AFFT camping packages, private car charter and Sabah outdoor support.",
    images: [
      {
        url: leadStory.image,
        alt: leadStory.en.imageAlt,
      },
    ],
  },
};

export default function CustomerStoriesPage() {
  return (
    <main className="min-h-screen bg-[#10140F] text-white">
      <section
        className="relative bg-cover bg-center px-6 py-8 md:px-10"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(16,20,15,.96), rgba(16,20,15,.74), rgba(16,20,15,.35)), url(${leadStory.image})`,
        }}
      >
        <div className="mx-auto max-w-7xl">
          <SiteTopNav />

          <div className="max-w-4xl py-24 md:py-32">
            <p className="mb-6 inline-block rounded-full border border-white/30 bg-black/30 px-5 py-2 text-sm">
              Customer Stories
            </p>
            <h1 className="text-5xl font-bold leading-tight md:text-7xl">
              Real AFFT stories make the booking clearer.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78 md:text-xl">
              See real examples from camping and private travel support before
              asking AFFT what fits your own Sabah trip.
            </p>
            <a
              href={makeWhatsappLink(
                "Hi AFFT, I saw the customer stories and want to plan my own Sabah trip."
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

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <SectionHeading
          small="Real Examples"
          big="What guests actually booked with AFFT."
          text="Each story should help future guests understand what they are asking about before they WhatsApp."
        />

        <div className="grid gap-8 xl:grid-cols-2">
          {customerStories.map((story) => (
            <article
              key={story.slug}
              className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5"
            >
              <img
                src={story.image}
                alt={story.en.imageAlt}
                className="h-80 w-full object-cover"
              />
              <div className="p-8">
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#F3922B]">
                  {story.en.eyebrow}
                </p>
                <h2 className="mt-4 text-3xl font-bold md:text-4xl">
                  {story.en.title}
                </h2>
                <p className="mt-5 text-white/72">{story.en.text}</p>
                <p className="mt-4 text-white/55">{story.en.detail}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={story.en.href}
                    className="rounded-full border border-white/15 px-6 py-3 font-bold text-white"
                  >
                    {story.en.cta}
                  </a>
                  <a
                    href={makeWhatsappLink(story.en.whatsappText)}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-[#F3922B] px-6 py-3 font-bold text-black"
                  >
                    Ask AFFT
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#182015] px-6 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            small="Explorer Camp Details"
            big="More real photos help guests understand the setup."
          />

          <div className="grid gap-6 md:grid-cols-3">
            {explorerCampPhotos.map((photo) => (
              <figure
                key={photo.image}
                className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5"
              >
                <img
                  src={photo.image}
                  alt={photo.caption}
                  className="h-72 w-full object-cover"
                />
                <figcaption className="p-5 text-white/70">{photo.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <PageFinalCta
          title="Want a trip like these stories?"
          text="Send AFFT the story you liked, your travel date and your group size. We will reply with the right package, route or car support."
          message="Hi AFFT, I saw the customer stories and want help planning my own Sabah trip."
        />
        <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-7">
          <h2 className="text-2xl font-bold">Already travelled with AFFT?</h2>
          <p className="mt-3 text-white/70">Share honest feedback and real photos. AFFT will ask permission before publishing anything and will never invent a review.</p>
          <TrackedLink eventName="review_request" eventParams={{ language: "en" }} href={makeWhatsappLink("Hi AFFT, I completed an AFFT experience and want to share honest feedback or photos.")} target="_blank" rel="noreferrer" className="mt-5 inline-flex rounded-full border border-white/15 px-6 py-3 font-bold">Share feedback</TrackedLink>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
