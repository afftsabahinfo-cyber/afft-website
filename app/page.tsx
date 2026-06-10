import type { FeaturedPick, MainSeries } from "@/lib/rent-it-data";
import { featuredPicks, rentItMainSeries, whatsapp } from "@/lib/rent-it-data";

const images = {
  hero: "/images/kinabalu-hero.webp",
  kiulu: "/images/kiulu-campsite.webp",
  milkyway: "/images/milky-way-sabah.webp",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#10140F] text-white">
      <section
        className="relative min-h-screen bg-cover bg-center px-6 py-8 md:px-16"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(16,20,15,.95), rgba(16,20,15,.65), rgba(16,20,15,.25)), url(${images.hero})`,
        }}
      >
        <nav className="flex items-center justify-between">
          <div className="text-xl font-bold tracking-[0.35em]">AFFT.CLUB</div>
          <div className="hidden gap-8 text-sm md:flex">
            <a href="#experiences">Experiences</a>
            <a href="#camping">Camping</a>
            <a href="#rent-it">Rent It Series</a>
            <a href="#travel">Travel</a>
          </div>
          <a
            href={whatsapp}
            className="rounded-full bg-[#F3922B] px-6 py-3 font-bold text-black"
          >
            WhatsApp
          </a>
        </nav>

        <div className="max-w-4xl pt-28 md:pt-40">
          <p className="mb-6 inline-block rounded-full border border-white/30 bg-black/30 px-5 py-2 text-sm">
            Mount Kinabalu / Sabah Outdoor Base
          </p>
          <h1 className="text-6xl font-bold leading-tight md:text-8xl">
            Explore Sabah Beyond The Tourist Trail
          </h1>
          <p className="mt-8 max-w-2xl text-xl text-white/80">
            Private outdoor experiences, camping adventures, Rent It Series and
            custom travel services across Sabah.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#experiences"
              className="rounded-full bg-[#F3922B] px-8 py-4 font-bold text-black"
            >
              Explore Experiences
            </a>
            <a
              href={whatsapp}
              className="rounded-full border border-white/40 bg-black/30 px-8 py-4 font-bold"
            >
              Chat With AFFT
            </a>
          </div>
        </div>
      </section>

      <section id="experiences" className="px-6 py-20 md:px-16">
        <Title
          small="Sabah Outdoor Experiences"
          big="Mountain, river, forest and stargazing journeys."
        />
        <div className="grid gap-6 md:grid-cols-3">
          <ImageCard
            img={images.milkyway}
            title="Milky Way Hunter"
            text="Sabah's signature stargazing experience."
          />
          <ImageCard
            img={images.hero}
            title="Mount Kinabalu Discovery"
            text="Explore Kundasang and Sabah's mountain landscapes."
          />
          <ImageCard
            img={images.kiulu}
            title="Kiulu Nature Experience"
            text="River, forest and countryside adventures."
          />
        </div>
      </section>

      <section id="camping" className="bg-[#182015] px-6 py-20 md:px-16">
        <Title
          small="Camping Packages"
          big="Simple outdoor packages for couples, families and explorers."
        />

        <div className="grid gap-6 md:grid-cols-4">
          <a href="/packages/solo-explorer" className="block">
            <Card title="Solo Explorer" text="RM399 / PG-1 Mobility Camp" />
          </a>

          <a href="/packages/explorer-camp" className="block">
            <Card title="Explorer Camp" text="RM599 / AFFT Signature Camp" />
          </a>

          <a href="/packages/astro-hunter" className="block">
            <Card title="Astro Hunter" text="RM799 / Milky Way Experience" />
          </a>

          <a href="/packages/family-camp" className="block">
            <Card
              title="Family Camp Series"
              text="Custom package for family outdoor trips."
            />
          </a>
        </div>
      </section>

      <section id="rent-it" className="px-6 py-20 md:px-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-4xl">
            <Title
              small="AFFT Rent It Series"
              big="Premium outdoor gear, creator tools and tent experiences without owning the whole setup."
            />
          </div>
          <div className="max-w-xl text-white/70">
            <p className="text-lg font-semibold text-[#F3922B]">
              Use the best. Do not own it.
            </p>
            <p className="mt-3">
              Rent It should feel experience-led, not like a crowded product
              list. Guests start with the main series, see the strongest hero
              products, then move into the full catalog on the dedicated page.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {rentItMainSeries.map((series) => (
            <RentItSeriesCard key={series.slug} series={series} />
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h3 className="text-3xl font-bold md:text-4xl">
              Featured Rent It Picks
            </h3>
            <p className="mt-3 max-w-3xl text-white/70">
              Lead with the products that sell the premium idea first: creator
              gear, Helinox comfort and standout tent experiences.
            </p>
          </div>
          <a
            href="/rent-it"
            className="inline-flex rounded-full border border-white/15 px-6 py-3 font-bold text-white"
          >
            View Full Rent It Series
          </a>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {featuredPicks.map((pick) => (
            <RentItFeaturedCard key={pick.title} pick={pick} />
          ))}
        </div>

        <div className="mt-12 rounded-[2rem] border border-white/10 bg-[#182015] p-8 md:flex md:items-center md:justify-between md:gap-8">
          <div>
            <h3 className="text-2xl font-bold md:text-3xl">
              Need help choosing gear?
            </h3>
            <p className="mt-3 max-w-2xl text-white/70">
              AFFT can recommend the right setup based on trip type, group size,
              creator needs or campsite mood.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 md:mt-0">
            <a
              href={whatsapp}
              className="inline-flex rounded-full bg-[#F3922B] px-6 py-3 font-bold text-black"
            >
              WhatsApp AFFT
            </a>
            <a
              href="/rent-it"
              className="inline-flex rounded-full border border-white/15 px-6 py-3 font-bold text-white"
            >
              Open Full Catalog
            </a>
          </div>
        </div>
      </section>

      <section id="travel" className="bg-[#182015] px-6 py-20 md:px-16">
        <Title
          small="Travel Services"
          big="Private Sabah travel support from airport to campsite."
        />
        <div className="grid gap-6 md:grid-cols-4">
          <Card title="Airport Transfer" text="Private arrival and departure support." />
          <Card
            title="Kundasang Private Tour"
            text="Flexible mountain day trip and overnight journey."
          />
          <Card
            title="Semporna Island Experience"
            text="Island trip planning for Sabah travellers."
          />
          <Card
            title="Tiggo 8 Pro / Alphard Charter"
            text="Private car and VIP travel services."
          />
        </div>
      </section>

      <section className="px-6 py-20 md:px-16">
        <div className="rounded-[2rem] bg-[#F3922B] p-10 text-black md:p-16">
          <h2 className="text-4xl font-bold md:text-6xl">
            Ready To Explore Sabah?
          </h2>
          <p className="mt-4 max-w-2xl text-lg">
            Talk to AFFT and build your outdoor experience, camping package or
            Rent It plan.
          </p>
          <a
            href={whatsapp}
            className="mt-8 inline-block rounded-full bg-black px-8 py-4 font-bold text-white"
          >
            WhatsApp +60 11-1159 8920
          </a>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black/30 py-12">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-bold text-white">AFFT.CLUB</h3>
            <p className="mt-3 text-white/70">
              Premium Outdoor Experiences, Camping Packages, Rent It Series and
              Private Travel Services in Sabah.
            </p>
          </div>

          <div>
            <h4 className="mb-3 font-semibold text-white">Contact</h4>
            <p className="text-white/70">WhatsApp</p>
            <a href={whatsapp} className="text-[#F3922B]">
              +60 11-1159 8920
            </a>
            <p className="mt-3 text-white/70">afft.sabah.info@gmail.com</p>
          </div>

          <div>
            <h4 className="mb-3 font-semibold text-white">Company Information</h4>
            <p className="text-white/70">ADVENTURE FRONTIER FREEDOM TRAVEL</p>
            <p className="text-white/70">(202401014720 (1560570-W))</p>
            <p className="text-white/70">KPL/LN: 12014</p>
          </div>
        </div>

        <div className="mt-10 text-center text-sm text-white/40">
          Â© 2026 AFFT.CLUB. All Rights Reserved.
        </div>
      </footer>

      <a
        href={whatsapp}
        className="fixed bottom-6 right-6 rounded-full bg-[#F3922B] px-6 py-4 font-bold text-black shadow-xl"
      >
        WhatsApp
      </a>
    </main>
  );
}

function Title({ small, big }: { small: string; big: string }) {
  return (
    <div className="mb-10">
      <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-[#F3922B]">
        {small}
      </p>
      <h2 className="max-w-4xl text-4xl font-bold md:text-6xl">{big}</h2>
    </div>
  );
}

function Card({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-[#F3922B]/40">
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="mt-4 text-white/70">{text}</p>
      <a href={whatsapp} className="mt-6 inline-block font-bold text-[#F3922B]">
        Contact AFFT &rarr;
      </a>
    </div>
  );
}

function ImageCard({
  img,
  title,
  text,
}: {
  img: string;
  title: string;
  text: string;
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
      <img src={img} alt={title} className="h-64 w-full object-cover" />
      <div className="p-6">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="mt-4 text-white/70">{text}</p>
      </div>
    </div>
  );
}

function RentItSeriesCard({ series }: { series: MainSeries }) {
  return (
    <a
      href={series.route}
      className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-[#F3922B]/40"
    >
      <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#F3922B]">
        {series.startingFrom}
      </p>
      <h3 className="mt-4 text-2xl font-bold">{series.title}</h3>
      <p className="mt-4 text-white/70">{series.hook}</p>
      <p className="mt-4 text-sm leading-6 text-white/55">{series.bestFor}</p>
      <span className="mt-6 inline-block font-bold text-[#F3922B]">
        Open Series &rarr;
      </span>
    </a>
  );
}

function RentItFeaturedCard({ pick }: { pick: FeaturedPick }) {
  return (
    <a
      href={pick.route}
      className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-[#F3922B]/40"
    >
      {pick.image ? (
        <img
          src={pick.image}
          alt={pick.title}
          className="h-56 w-full object-cover bg-white"
        />
      ) : (
        <div className="flex h-56 items-end bg-[linear-gradient(145deg,#734C24,#182015_60%,#10140F)] p-6">
          <p className="max-w-[12rem] text-2xl font-bold leading-tight">
            {pick.title}
          </p>
        </div>
      )}
      <div className="p-5">
        <h4 className="font-bold">{pick.title}</h4>
        <p className="mt-2 text-sm font-bold text-[#F3922B]">{pick.price}</p>
        <p className="mt-3 text-sm leading-6 text-white/65">{pick.description}</p>
        <span className="mt-4 inline-block text-sm font-bold text-[#F3922B]">
          View Details &rarr;
        </span>
      </div>
    </a>
  );
}
