const whatsapp =
  "https://wa.me/601111598920?text=Hi%20AFFT%2C%20I%20am%20interested%20in%20the%20Solo%20Explorer%20Package.";

export default function SoloExplorerPackage() {
  return (
    <main className="min-h-screen bg-[#10140F] text-white">
      <section className="mx-auto max-w-6xl px-6 py-12 md:py-20">
        <a href="/" className="text-sm font-bold text-[#F3922B]">
          ← Back to AFFT.CLUB
        </a>

        <div className="mt-10 grid gap-10 md:grid-cols-2 md:items-center">
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

            <p className="mt-6 text-white/70">
              A simple outdoor camp experience designed for solo explorers who
              want a light, flexible and stylish way to enjoy Sabah outdoors.
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
              src="/images/kiulu-campsite.webp"
              alt="Solo Explorer Camp"
              className="h-[420px] w-full rounded-[1.5rem] object-cover"
            />
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <Info title="Package Type" text="Solo / Light Outdoor Experience" />
          <Info title="Best For" text="Solo explorer, content creator, light camp" />
          <Info title="Booking" text="Contact AFFT via WhatsApp before booking" />
        </div>

        <section className="mt-16 rounded-[2rem] bg-[#182015] p-8 md:p-10">
          <h2 className="text-3xl font-bold">What This Package Is About</h2>

          <p className="mt-4 max-w-3xl text-white/70">
            Solo Explorer is designed as an entry-level AFFT outdoor experience.
            It is suitable for guests who want a simple camp-style setup,
            flexible outdoor movement and a clean visual experience for content,
            relaxation or a short nature escape.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-bold">Need More Details?</h2>

          <p className="mt-4 max-w-3xl text-white/70">
            Talk to AFFT directly. We can explain the campsite option,
            available date, add-on equipment, weather condition and transport
            arrangement.
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

function Info({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-3 text-white/70">{text}</p>
    </div>
  );
}
