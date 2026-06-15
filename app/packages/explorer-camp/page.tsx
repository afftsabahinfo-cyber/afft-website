import { RentItBackLink } from "@/components/rent-it-shared";

const whatsapp =
  "https://wa.me/601111598920?text=Hi%20AFFT%2C%20I%20am%20interested%20in%20the%20RM599%20Explorer%20Camp%20Package.";

export default function ExplorerCampPackage() {
  return (
    <main className="min-h-screen bg-[#10140F] text-white">
      <section className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-20">
        <RentItBackLink />

        <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#F3922B]">
              Camping Package
            </p>

            <h1 className="text-5xl font-bold leading-tight md:text-7xl">
              Explorer Camp
            </h1>

            <p className="mt-6 text-2xl text-white/80">
              RM599 / AFFT Signature Camp
            </p>

            <p className="mt-6 max-w-xl text-lg text-white/70">
              AFFT&apos;s signature 2D1N setup for couples, friends and
              first-time campers who want a comfortable outdoor stay without
              handling the hard part themselves.
            </p>

            <a
              href={whatsapp}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-block rounded-full bg-[#F3922B] px-8 py-4 font-bold text-black"
            >
              Ask About Explorer Camp
            </a>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-4">
            <img
              src="/images/afft-explorer-camp-rm599-sabah.webp"
              alt="AFFT Explorer Camp RM599 Sabah Camping Package"
              className="w-full rounded-[1.5rem]"
            />
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <Info title="Package Type" text="AFFT signature camp" />
          <Info title="Duration" text="2 Days 1 Night" />
          <Info title="Suitable For" text="Couples / friends / first-time campers" />
        </div>

        <section className="mt-16 rounded-[2rem] bg-[#182015] p-8 md:p-10">
          <h2 className="text-3xl font-bold">Package Includes</h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Item text="Premium Camp Setup" />
            <Item text="Tent & Sleeping Arrangement" />
            <Item text="Camping Table & Chair Setup" />
            <Item text="Basic Camp Lighting" />
            <Item text="Coffee & Outdoor Lifestyle Setup" />
            <Item text="AFFT Experience Support" />
          </div>
        </section>

        <section className="mt-16 rounded-[2rem] bg-[#182015] p-8 md:p-10">
          <h2 className="text-3xl font-bold">What This Package Is About</h2>

          <p className="mt-5 max-w-4xl text-white/70">
            Explorer Camp is the easiest way to step into AFFT camping. It
            gives guests a more complete tent, furniture and lifestyle setup,
            so the trip feels intentional, comfortable and photo-ready instead
            of rough or overly technical.
          </p>
        </section>

        <section className="mt-16 rounded-[2rem] bg-[#182015] p-8 md:p-10">
          <h2 className="text-3xl font-bold">FAQ</h2>

          <div className="mt-8 grid gap-4">
            <FaqItem
              question="Who is Explorer Camp best for?"
              answer="Explorer Camp works best for couples, friends and first-time campers who want a more complete AFFT setup and a comfortable 2D1N experience."
            />
            <FaqItem
              question="Do we need to set up the tent ourselves?"
              answer="No. The package is designed around a ready-made AFFT setup so the trip feels easier and less technical."
            />
            <FaqItem
              question="How many people can join this package?"
              answer="The best arrangement depends on your group size and campsite plan. AFFT can confirm the right setup through WhatsApp."
            />
            <FaqItem
              question="Can we add transport or extra gear?"
              answer="Yes. AFFT can help with transport, campsite planning and additional gear if your group needs a more complete setup."
            />
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-bold">Need More Details?</h2>

          <p className="mt-4 max-w-3xl text-white/70">
            Ask AFFT about campsite options, weather, transport and extra gear
            for your group size before you lock in a date.
          </p>

          <a
            href={whatsapp}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-block rounded-full bg-[#F3922B] px-8 py-4 font-bold text-black"
          >
            Ask About Explorer Camp
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

function FaqItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h3 className="text-xl font-bold">{question}</h3>
      <p className="mt-3 text-white/70">{answer}</p>
    </div>
  );
}
