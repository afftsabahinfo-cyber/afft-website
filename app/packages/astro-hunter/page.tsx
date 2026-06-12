const whatsapp =
  "https://wa.me/601111598920?text=Hi%20AFFT%2C%20I%20am%20interested%20in%20the%20RM799%20Astro%20Hunter%20Package.";

export default function AstroHunterPackage() {
  return (
    <main className="min-h-screen bg-[#10140F] text-white">
      <section className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-20">
        <a href="/" className="text-sm font-bold text-[#F3922B]">
          &larr; Back to AFFT.CLUB
        </a>

        <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#F3922B]">
              Camping Package
            </p>

            <h1 className="text-5xl font-bold leading-tight md:text-7xl">
              Astro Hunter
            </h1>

            <p className="mt-6 text-2xl text-white/80">
              RM799 / Milky Way Experience
            </p>

            <p className="mt-6 max-w-xl text-lg text-white/70">
              A night-focused camping setup for guests who want cooler air,
              slower outdoor time and a better chance to enjoy Sabah&apos;s Milky
              Way atmosphere.
            </p>

            <a
              href={whatsapp}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-block rounded-full bg-[#F3922B] px-8 py-4 font-bold text-black"
            >
              Ask About Astro Hunter
            </a>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-4">
            <img
              src="/images/afft-astro-hunter-rm799-milky-way-sabah.webp"
              alt="AFFT Astro Hunter RM799 Milky Way Camping Experience Sabah"
              className="w-full rounded-[1.5rem]"
            />
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <Info title="Package Type" text="Milky Way Camping Experience" />
          <Info title="Duration" text="2 Days 1 Night" />
          <Info title="Suitable For" text="Couples / creators / stargazing lovers" />
        </div>

        <section className="mt-16 rounded-[2rem] bg-[#182015] p-8 md:p-10">
          <h2 className="text-3xl font-bold">Package Includes</h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Item text="Premium Camp Setup" />
            <Item text="Milky Way Viewing Arrangement" />
            <Item text="Comfortable Camping Furniture" />
            <Item text="Basic Camp Lighting" />
            <Item text="Outdoor Coffee Experience" />
            <Item text="AFFT Night Sky Support" />
          </div>
        </section>

        <section className="mt-16 rounded-[2rem] bg-[#182015] p-8 md:p-10">
          <h2 className="text-3xl font-bold">What This Package Is About</h2>

          <p className="mt-5 max-w-4xl text-white/70">
            Astro Hunter is built around the night experience. It suits guests
            who want a calmer premium camp, a photo-friendly layout and better
            conditions for star watching, content shooting and slow outdoor
            conversation.
          </p>
        </section>

        <section className="mt-16 rounded-[2rem] bg-[#182015] p-8 md:p-10">
          <h2 className="text-3xl font-bold">FAQ</h2>

          <div className="mt-8 grid gap-4">
            <FaqItem
              question="When is the best time for Astro Hunter?"
              answer="Usually on darker nights with better weather. AFFT can suggest more suitable dates based on moon phase and forecast."
            />
            <FaqItem
              question="Does this package guarantee Milky Way visibility?"
              answer="No. Night sky conditions always depend on weather and cloud cover, but AFFT can help you choose better dates and campsites."
            />
            <FaqItem
              question="Is Astro Hunter only for photographers?"
              answer="No. It also suits couples, creators and guests who simply want a slower night camp with a stronger stargazing mood."
            />
            <FaqItem
              question="What should I prepare for a night-focused camp?"
              answer="Bring a warm layer, personal items, phone charger or power bank, and anything you need to stay comfortable after dark."
            />
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-bold">Need More Details?</h2>

          <p className="mt-4 max-w-3xl text-white/70">
            Ask AFFT about moon phase, weather, campsite choice and the best
            dates for clearer night skies.
          </p>

          <a
            href={whatsapp}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-block rounded-full bg-[#F3922B] px-8 py-4 font-bold text-black"
          >
            Ask About Astro Hunter
          </a>
        </section>
      </section>
    </main>
  );
}

function Info({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-3 text-white/70">{text}</p>
    </div>
  );
}

function Item({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      {text}
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h3 className="text-xl font-bold">{question}</h3>
      <p className="mt-3 text-white/70">{answer}</p>
    </div>
  );
}
