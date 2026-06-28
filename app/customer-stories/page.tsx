import type { Metadata } from "next";
import {
  PageFinalCta,
  SectionHeading,
  SiteFooter,
  SiteTopNav,
} from "@/components/V3PageSections";
import { makeWhatsappLink } from "@/lib/rent-it-data";

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
        url: "/images/customer-stories/explorer-camp-rm599/explorer-camp-rm599-group-01-blur.webp",
        alt: "AFFT Explorer Camp real customer story",
      },
    ],
  },
};

const stories = [
  {
    image:
      "/images/customer-stories/explorer-camp-rm599/explorer-camp-rm599-group-01-blur.webp",
    title: "Explorer Camp RM599 in real use",
    eyebrow: "Camping Story",
    text: "A recent Explorer Camp booking showed how the setup feels beyond the poster: shelter, tent, table area and a slower 2D1N Sabah rhythm.",
    detail:
      "This story helps first-time campers understand what AFFT means by a ready-made camp experience.",
    href: "/packages/explorer-camp",
    cta: "View Explorer Camp",
    whatsapp: "Hi AFFT, I want details for the RM599 Explorer Camp package.",
  },
  {
    image:
      "/images/customer-stories/tiggo-8-pro-charter/tiggo-8-pro-charter-group-01-blur.webp",
    title: "Tiggo 8 Pro private Sabah mountain movement",
    eyebrow: "Private Car Story",
    text: "A private group used AFFT Tiggo 8 Pro Charter for a smoother Sabah mountain trip with more comfortable private movement.",
    detail:
      "This story is useful for guests who need transport support, not only a camping package.",
    href: "/car-rental",
    cta: "View Car Rental",
    whatsapp:
      "Hi AFFT, I want details for the Tiggo 8 Pro charter and private car service in Sabah.",
  },
];

const explorerPhotos = [
  {
    image:
      "/images/customer-stories/explorer-camp-rm599/explorer-camp-rm599-setup-01.webp",
    caption: "Real campsite setup before guests settled in.",
  },
  {
    image:
      "/images/customer-stories/explorer-camp-rm599/explorer-camp-rm599-detail-01.webp",
    caption: "Covered area and camp details for slower outdoor time.",
  },
  {
    image:
      "/images/customer-stories/explorer-camp-rm599/explorer-camp-rm599-night-01.webp",
    caption: "Night mood that makes the stay feel complete.",
  },
];

export default function CustomerStoriesPage() {
  return (
    <main className="min-h-screen bg-[#10140F] text-white">
      <section
        className="relative bg-cover bg-center px-6 py-8 md:px-10"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(16,20,15,.96), rgba(16,20,15,.74), rgba(16,20,15,.35)), url(/images/customer-stories/explorer-camp-rm599/explorer-camp-rm599-group-01-blur.webp)",
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
          {stories.map((story) => (
            <article
              key={story.title}
              className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5"
            >
              <img
                src={story.image}
                alt={story.title}
                className="h-80 w-full object-cover"
              />
              <div className="p-8">
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#F3922B]">
                  {story.eyebrow}
                </p>
                <h2 className="mt-4 text-3xl font-bold md:text-4xl">
                  {story.title}
                </h2>
                <p className="mt-5 text-white/72">{story.text}</p>
                <p className="mt-4 text-white/55">{story.detail}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={story.href}
                    className="rounded-full border border-white/15 px-6 py-3 font-bold text-white"
                  >
                    {story.cta}
                  </a>
                  <a
                    href={makeWhatsappLink(story.whatsapp)}
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
            {explorerPhotos.map((photo) => (
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
      </section>

      <SiteFooter />
    </main>
  );
}
