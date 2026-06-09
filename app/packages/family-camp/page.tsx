const whatsapp =
  "https://wa.me/601111598920?text=Hi%20AFFT%2C%20I%20am%20interested%20in%20the%20Family%20Camp%20Series.";

export default function FamilyCampPackage() {
  return (
    <main className="min-h-screen bg-[#10140F] text-white">
      <section className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-20">
        <a href="/" className="text-sm font-bold text-[#F3922B]">
          ← Back to AFFT.CLUB
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
              Custom Family Outdoor Experience
            </p>

            <p className="mt-6 max-w-xl text-lg text-white/70">
              A family-friendly camping experience designed for parents and
              children who want to enjoy Sabah outdoors together in a safe,
              comfortable and memorable environment.
            </p>

            <a
              href={whatsapp}
              target="_blank"
              className="mt-8 inline-block rounded-full bg-[#F3922B] px-8 py-4 font-bold text-black"
            >
              WhatsApp AFFT
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
          <Info title="Package Type" text="Family Outdoor Experience" />
          <Info title="Duration" text="Customisable" />
          <Info title="Suitable For" text="Parents • Children • Family Groups" />
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
            Family Camp Series is designed for families who want a meaningful
            outdoor experience together. The package focuses on comfort,
            safety, nature appreciation and quality family bonding time while
            enjoying Sabah's beautiful landscapes.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-bold">Need More Details?</h2>

          <p className="mt-4 max-w-3xl text-white/70">
            Contact AFFT directly for campsite recommendations, family group
            sizing, transport arrangements, equipment upgrades and available
            dates.
          </p>

          <a
            href={whatsapp}
            target="_blank"
            className="mt-8 inline-block rounded-full bg-[#F3922B] px-8 py-4 font-bold text-black"
          >
            Ask About Family Camp Series
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
