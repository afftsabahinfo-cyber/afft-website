const whatsapp =
  "https://wa.me/601111598920?text=Hi%20AFFT%2C%20I%20am%20interested%20in%20the%20RM399%20Solo%20Explorer%20Package.";

export default function SoloExplorerPackage() {
  return (
    <main className="min-h-screen bg-[#10140F] text-white">
      <section className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-20">

        <a
          href="/"
          className="text-sm font-bold text-[#F3922B] hover:opacity-80"
        >
          ← Back to AFFT.CLUB
        </a>

        <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:items-start">

          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#F3922B]">
              Camping Package
            </p>

            <h1 className="text-5xl font-bold leading-tight md:text-7xl">
              Solo Explorer
            </h1>

            <p className="mt-6 text-2xl text-white/80">
              RM399 · PG-1 Mobility Camp
            </p>

            <p className="mt-6 max-w-xl text-lg text-white/70">
              Designed for solo travellers, creators and outdoor lovers who
              want a simple yet premium AFFT camping experience in Sabah.
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
              src="/images/solo-explorer-poster.webp"
              alt="AFFT Solo Explorer Package"
              className="w-full rounded-[1.5rem]"
            />
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">

          <Info
            title="Package Type"
            text="Solo Outdoor Experience"
          />

          <Info
            title="Duration"
            text="2 Days 1 Night"
          />

          <Info
            title="Suitable For"
            text="Solo Traveller • Creator • Light Camper"
          />

        </div>

        <section className="mt-16 rounded-[2rem] bg-[#182015] p-8 md:p-10">

          <h2 className="text-3xl font-bold">
            Package Includes
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2">

            <Item text="PG-1 Mobility Camp Setup" />
            <Item text="Camping Furniture Setup" />
            <Item text="Basic Camp Lighting" />
            <Item text="Campsite Arrangement" />
            <Item text="AFFT Experience Support" />
            <Item text="Photo Friendly Camp Layout" />

          </div>

        </section>

        <section className="mt-16 rounded-[2rem] bg-[#182015] p-8 md:p-10">

          <h2 className="text-3xl font-bold">
            What This Package Is About
          </h2>

          <p className="mt-5 max-w-4xl text-white/70">
            Solo Explorer is AFFT's entry-level camping experience designed for
            guests who want to enjoy Sabah outdoors without investing in
            expensive camping equipment. It combines mobility, simplicity and
            comfort while maintaining the AFFT premium outdoor lifestyle
            experience.
          </p>

        </section>

        <section className="mt-16">

          <h2 className="text-3xl font-bold">
            Need More Details?
          </h2>

          <p className="mt-4 max-w-3xl text-white/70">
            Contact AFFT directly for campsite availability, weather advice,
            transportation arrangements and add-on equipment options.
          </p>

          <a
            href={whatsapp}
            target="_blank"
            className="mt-8 inline-block rounded-full bg-[#F3922B] px-8 py-4 font-bold text-black"
          >
            Ask About Solo Explorer
          </a>

        </section>

      </section>
    </main>
  );
}

function Info({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
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
