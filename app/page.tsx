const whatsapp = "https://wa.me/601111598920";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#10140F] text-white">
      <section className="px-6 py-24 md:px-16">
        <p className="mb-6 inline-block rounded-full border border-white/20 px-5 py-2 text-sm">
          Mount Kinabalu · Sabah Outdoor Base
        </p>

        <h1 className="max-w-4xl text-6xl font-bold leading-tight md:text-8xl">
          Explore Sabah Beyond The Tourist Trail
        </h1>

        <p className="mt-8 max-w-2xl text-xl text-white/75">
          Private outdoor experiences, camping adventures, Rent It Series and custom travel services across Sabah.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a href="#experiences" className="rounded-full bg-[#F3922B] px-8 py-4 font-bold text-black">
            Explore Experiences
          </a>
          <a href={whatsapp} className="rounded-full border border-white/30 px-8 py-4 font-bold">
            WhatsApp AFFT
          </a>
        </div>
      </section>

      <Section id="experiences" title="Sabah Outdoor Experiences">
        <Card title="Milky Way Hunter" text="Sabah’s signature stargazing experience." />
        <Card title="Mount Kinabalu Discovery" text="Explore Kundasang and Sabah’s mountain landscapes." />
        <Card title="Kiulu Nature Experience" text="River, forest and countryside adventures." />
        <Card title="Family Outdoor Experience" text="Easy outdoor journeys for families." />
      </Section>

      <Section id="camping" title="Camping Packages">
        <Card title="Solo Explorer" text="RM399 · PG-1 Mobility Camp" />
        <Card title="Explorer Camp" text="RM599 · AFFT Signature Camp" />
        <Card title="Astro Hunter" text="RM799 · Milky Way Experience" />
        <Card title="Family Camp Series" text="Custom package for family outdoor trips." />
      </Section>

      <Section id="rent-it" title="AFFT Rent It Series">
        <Card title="Creator Series" text="Pocket 4 / Action 6 / Mic 3 / Avata" />
        <Card title="Camp Lifestyle Series" text="Coffee / Snow Peak / KZM" />
        <Card title="Premium Camp Series" text="Helinox / Snow Peak Furniture" />
        <Card title="Tent Experience Series" text="Black Dog / Mobi Garden" />

        <div className="col-span-full mt-10">
          <h3 className="mb-6 text-3xl font-bold">Featured Rent It Products</h3>
          <div className="grid gap-4 md:grid-cols-5">
            <Mini title="DJI Pocket 4 Creator Combo" price="RM99 / RM179 / RM239" />
            <Mini title="DJI Avata 360 Fly More Combo" price="RM199 / RM359 / RM499" />
            <Mini title="Helinox Solo Full Set" price="RM199 / RM359 / RM499" />
            <Mini title="Black Dog 星宿5.9" price="RM399 / RM729 / RM999" />
            <Mini title="Black Dog Modular Tent System" price="RM499 / RM899 / RM1199" />
          </div>
        </div>
      </Section>

      <Section id="travel" title="Travel Services">
        <Card title="Airport Transfer" text="Private arrival and departure support." />
        <Card title="Kundasang Private Tour" text="Flexible mountain day trip and overnight journey." />
        <Card title="Semporna Island Experience" text="Island trip planning for Sabah travellers." />
        <Card title="Tiggo 8 Pro / Alphard Charter" text="Private car and VIP travel services." />
      </Section>

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
    </main>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="px-6 py-20 md:px-16">
      <h2 className="mb-10 text-4xl font-bold md:text-6xl">{title}</h2>
      <div className="grid gap-6 md:grid-cols-4">{children}</div>
    </section>
  );
}

function Card({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="mt-4 text-white/70">{text}</p>
      <a href={whatsapp} className="mt-6 inline-block text-[#F3922B] font-bold">
        Contact AFFT →
      </a>
    </div>
  );
}

function Mini({ title, price }: { title: string; price: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
      <h4 className="font-bold">{title}</h4>
      <p className="mt-2 text-sm text-white/70">{price}</p>
    </div>
  );
}
