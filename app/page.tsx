const whatsapp = "https://wa.me/601111598920";

const images = {
  hero: "/images/kinabalu-hero.webp",
  kiulu: "/images/kiulu-campsite.webp",
  milkyway: "/images/milky-way-sabah.webp",
  pocket4: "/images/dji-pocket4-creator-combo.webp",
  avata: "/images/dji-avata-360.webp",
  helinox: "/images/helinox-chair.webp",
  blackdog: "/images/blackdog-xingsu59.webp",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#10140F] text-white">
      <section
        className="relative min-h-screen bg-cover bg-center px-6 py-8 md:px-16"
        style={{ backgroundImage: `linear-gradient(90deg, rgba(16,20,15,.95), rgba(16,20,15,.65), rgba(16,20,15,.25)), url(${images.hero})` }}
      >
        <nav className="flex items-center justify-between">
          <div className="text-xl font-bold tracking-[0.35em]">AFFT.CLUB</div>
          <div className="hidden gap-8 text-sm md:flex">
            <a href="#experiences">Experiences</a>
            <a href="#camping">Camping</a>
            <a href="#rent-it">Rent It Series</a>
            <a href="#travel">Travel</a>
          </div>
          <a href={whatsapp} className="rounded-full bg-[#F3922B] px-6 py-3 font-bold text-black">
            WhatsApp
          </a>
        </nav>

        <div className="max-w-4xl pt-28 md:pt-40">
          <p className="mb-6 inline-block rounded-full border border-white/30 bg-black/30 px-5 py-2 text-sm">
            Mount Kinabalu · Sabah Outdoor Base
          </p>
          <h1 className="text-6xl font-bold leading-tight md:text-8xl">
            Explore Sabah Beyond The Tourist Trail
          </h1>
          <p className="mt-8 max-w-2xl text-xl text-white/80">
            Private outdoor experiences, camping adventures, Rent It Series and custom travel services across Sabah.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#experiences" className="rounded-full bg-[#F3922B] px-8 py-4 font-bold text-black">
              Explore Experiences
            </a>
            <a href={whatsapp} className="rounded-full border border-white/40 bg-black/30 px-8 py-4 font-bold">
              Chat With AFFT
            </a>
          </div>
        </div>
      </section>

      <section id="experiences" className="px-6 py-20 md:px-16">
        <Title small="Sabah Outdoor Experiences" big="Mountain, river, forest and stargazing journeys." />
        <div className="grid gap-6 md:grid-cols-3">
          <ImageCard img={images.milkyway} title="Milky Way Hunter" text="Sabah’s signature stargazing experience." />
          <ImageCard img={images.hero} title="Mount Kinabalu Discovery" text="Explore Kundasang and Sabah’s mountain landscapes." />
          <ImageCard img={images.kiulu} title="Kiulu Nature Experience" text="River, forest and countryside adventures." />
        </div>
      </section>

      <section id="camping" className="bg-[#182015] px-6 py-20 md:px-16">
        <Title small="Camping Packages" big="Simple outdoor packages for couples, families and explorers." />
        <div className="grid gap-6 md:grid-cols-4">
          <Card title="Solo Explorer" text="RM399 · PG-1 Mobility Camp" />
          <Card title="Explorer Camp" text="RM599 · AFFT Signature Camp" />
          <Card title="Astro Hunter" text="RM799 · Milky Way Experience" />
          <Card title="Family Camp Series" text="Custom package for family outdoor trips." />
        </div>
      </section>

      <section id="rent-it" className="px-6 py-20 md:px-16">
        <Title small="AFFT Rent It Series" big="Sabah’s outdoor experience rental system." />
        <div className="mb-10 grid gap-6 md:grid-cols-4">
          <Card title="Creator Series" text="Pocket 4 / Action 6 / Mic 3 / Avata" />
          <Card title="Camp Lifestyle Series" text="Coffee / Snow Peak / KZM" />
          <Card title="Premium Camp Series" text="Helinox / Snow Peak Furniture" />
          <Card title="Tent Experience Series" text="Black Dog / Mobi Garden" />
        </div>

        <h3 className="mb-6 text-3xl font-bold">Featured Rent It Products</h3>
        <div className="grid gap-6 md:grid-cols-4">
          <Product img={images.pocket4} title="DJI Pocket 4 Creator Combo" price="RM99 / RM179 / RM239" />
          <Product img={images.avata} title="DJI Avata 360 Fly More Combo" price="RM199 / RM359 / RM499" />
          <Product img={images.helinox} title="Helinox Solo Full Set" price="RM199 / RM359 / RM499" />
          <Product img={images.blackdog} title="Black Dog 星宿5.9" price="RM399 / RM729 / RM999" />
        </div>
      </section>

      <section id="travel" className="bg-[#182015] px-6 py-20 md:px-16">
        <Title small="Travel Services" big="Private Sabah travel support from airport to campsite." />
        <div className="grid gap-6 md:grid-cols-4">
          <Card title="Airport Transfer" text="Private arrival and departure support." />
          <Card title="Kundasang Private Tour" text="Flexible mountain day trip and overnight journey." />
          <Card title="Semporna Island Experience" text="Island trip planning for Sabah travellers." />
          <Card title="Tiggo 8 Pro / Alphard Charter" text="Private car and VIP travel services." />
        </div>
      </section>

      <section className="px-6 py-20 md:px-16">
        <div className="rounded-[2rem] bg-[#F3922B] p-10 text-black md:p-16">
          <h2 className="text-4xl font-bold md:text-6xl">Ready To Explore Sabah?</h2>
          <p className="mt-4 max-w-2xl text-lg">
            Talk to AFFT and build your outdoor experience, camping package or Rent It plan.
          </p>
          <a href={whatsapp} className="mt-8 inline-block rounded-full bg-black px-8 py-4 font-bold text-white">
            WhatsApp +60 11-1159 8920
          </a>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black/30 py-12">
  <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">

    <div>
      <h3 className="text-white font-bold text-lg">
        AFFT.CLUB
      </h3>

      <p className="text-white/70 mt-3">
        Premium Outdoor Experiences,
        Camping Packages,
        Rent It Series &
        Private Travel Services in Sabah.
      </p>
    </div>

    <div>
      <h4 className="text-white font-semibold mb-3">
        Contact
      </h4>

      <p className="text-white/70">
        WhatsApp
      </p>

      <a
        href="https://wa.me/601111598920"
        className="text-[#F3922B]"
      >
        +60 11-1159 8920
      </a>

      <p className="mt-3 text-white/70">
        afft.sabah.info@gmail.com
      </p>
    </div>

    <div>
      <h4 className="text-white font-semibold mb-3">
        Company Information
      </h4>

      <p className="text-white/70">
        ADVENTURE FRONTIER FREEDOM TRAVEL
      </p>

      <p className="text-white/70">
        (202401014720 (1560570-W))
      </p>

      <p className="text-white/70">
        KPL/LN: 12014
      </p>
    </div>

  </div>

  <div className="text-center text-white/40 text-sm mt-10">
    © 2026 AFFT.CLUB. All Rights Reserved.
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
      <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-[#F3922B]">{small}</p>
      <h2 className="max-w-4xl text-4xl font-bold md:text-6xl">{big}</h2>
    </div>
  );
}

function Card({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="mt-4 text-white/70">{text}</p>
      <a href={whatsapp} className="mt-6 inline-block font-bold text-[#F3922B]">
        Contact AFFT →
      </a>
    </div>
  );
}

function ImageCard({ img, title, text }: { img: string; title: string; text: string }) {
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

function Product({ img, title, price }: { img: string; title: string; price: string }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
      <img src={img} alt={title} className="h-56 w-full object-cover bg-white" />
      <div className="p-5">
        <h4 className="font-bold">{title}</h4>
        <p className="mt-2 text-sm text-white/70">{price}</p>
        <a href={whatsapp} className="mt-4 inline-block text-sm font-bold text-[#F3922B]">
          Rent Now →
        </a>
      </div>
    </div>
  );
}
