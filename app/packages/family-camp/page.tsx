const whatsapp =
  "https://wa.me/601111598920?text=Hi%20AFFT%2C%20I%20am%20interested%20in%20the%20Family%20Camp%20Series.";

export default function FamilyCampPackage() {
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
              Family Camp Series
            </h1>

            <p className="mt-6 text-2xl text-white/80">
              Custom quote / Family outdoor setup
            </p>

            <p className="mt-6 max-w-xl text-lg text-white/70">
              A family-friendly camping package for parents who want an easier
              Sabah outdoor trip with children, comfort and room to slow down
              together.
            </p>

            <a
              href={whatsapp}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-block rounded-full bg-[#F3922B] px-8 py-4 font-bold text-black"
            >
              Plan Family Camp
            </a>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-4">
            <img
              src="/images/afft-family-camp-series-sabah.webp"
              alt="AFFT Family Camp Series Sabah"
              className="w-full rounded-[1.5rem]"
            />
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <Info title="Package Type" text="Family outdoor experience" />
          <Info title="Duration" text="Custom 2D1N or longer" />
          <Info title="Suitable For" text="Parents / children / family groups" />
        </div>

        <section className="mt-16 rounded-[2rem] bg-[#182015] p-8 md:p-10">
          <h2 className="text-3xl font-bold">Package Includes</h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Item text="Family Camping Setup" />
            <Item text="Family Size Tent Arrangement" />
            <Item text="Camping Tables & Chairs" />
            <Item text="Outdoor Lifestyle Equipment" />
            <Item text="Coffee & Relaxation Area" />
            <Item text="AFFT Family Experience Support" />
          </div>
        </section>

        <section className="mt-16 rounded-[2rem] bg-[#182015] p-8 md:p-10">
          <h2 className="text-3xl font-bold">What This Package Is About</h2>

          <p className="mt-5 max-w-4xl text-white/70">
            Family Camp Series is for parents who want the family camping
            experience without overpacking, overbuying or managing every detail
            alone. AFFT can shape the setup around group size, children&apos;s ages
            and the comfort level your family needs.
          </p>
        </section>

        <section className="mt-16 rounded-[2rem] bg-[#182015] p-8 md:p-10">
          <h2 className="text-3xl font-bold">FAQ</h2>

          <div className="mt-8 grid gap-4">
            <FaqItem
              question="Is Family Camp suitable for young children?"
              answer="Yes. AFFT can adjust the setup based on your children's ages, your comfort level and the type of campsite that fits your family better."
            />
            <FaqItem
              question="Why is this package a custom quote?"
              answer="The final price depends on family size, campsite, number of nights, transport needs and any comfort upgrades you want to add."
            />
            <FaqItem
              question="Can AFFT suggest easier campsites for families?"
              answer="Yes. AFFT can recommend campsites that are more suitable for family trips, slower pacing and easier access."
            />
            <FaqItem
              question="Can we include transport or meal planning?"
              answer="Yes. You can ask AFFT about transport, meal support and extra equipment when planning your family trip."
            />
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-bold">Need More Details?</h2>

          <p className="mt-4 max-w-3xl text-white/70">
            Ask AFFT about family group size, campsite fit, transport, meal
            planning and optional gear upgrades before you choose the setup.
          </p>

          <a
            href={whatsapp}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-block rounded-full bg-[#F3922B] px-8 py-4 font-bold text-black"
          >
            Plan Family Camp
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
