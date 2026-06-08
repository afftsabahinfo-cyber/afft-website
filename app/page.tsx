import { Compass, TentTree, Camera, Car, MessageCircle } from 'lucide-react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { SectionTitle } from '@/components/SectionTitle';
import { experienceCards, packages } from '@/lib/site-data';

const icons = [Compass, TentTree, Camera, Car];

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />

      <section id="experiences" className="bg-afft-cream py-20 md:py-28">
        <div className="container-afft">
          <SectionTitle
            eyebrow="AFFT Core Direction"
            title="Sabah outdoor experiences first. Everything else supports the journey."
            text="Website V1 keeps the message simple: AFFT is not only a rental page, but a Sabah outdoor experience brand centered around Mount Kinabalu."
          />
          <div className="grid gap-5 md:grid-cols-4">
            {experienceCards.map((card, index) => {
              const Icon = icons[index];
              return (
                <article key={card.title} className="rounded-[1.5rem] border border-afft-brown/10 bg-white p-6 shadow-soft">
                  <div className="mb-6 flex items-center justify-between">
                    <span className="rounded-full bg-afft-sand px-3 py-1 text-xs font-bold text-afft-brown">{card.tag}</span>
                    <Icon className="text-afft-orange" />
                  </div>
                  <h3 className="text-xl font-bold text-afft-ink">{card.title}</h3>
                  <p className="mt-3 leading-7 text-afft-ink/65">{card.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="camping" className="bg-afft-ink py-20 text-white md:py-28">
        <div className="container-afft">
          <SectionTitle
            eyebrow="Camping Packages"
            title="Ready-built camping, designed for guests who fly into Sabah."
            text="Clear package cards for quick WhatsApp conversion. V1 avoids complicated booking logic first."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {packages.map((item) => (
              <article key={item.name} className="rounded-[1.6rem] border border-white/10 bg-white/8 p-7 backdrop-blur">
                <p className="text-sm uppercase tracking-[0.22em] text-afft-orange">From {item.price}</p>
                <h3 className="mt-4 text-2xl font-bold">{item.name}</h3>
                <p className="mt-4 leading-7 text-white/65">{item.detail}</p>
                <a href="#contact" className="mt-6 inline-block rounded-full bg-white px-5 py-3 text-sm font-bold text-afft-ink">Ask Availability</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="rentals" className="bg-white py-20 md:py-28">
        <div className="container-afft grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.32em] text-afft-orange">Rentals</p>
            <h2 className="font-serif text-4xl font-semibold md:text-5xl">Outdoor gear and creator tools for real Sabah routes.</h2>
            <p className="mt-5 text-lg leading-8 text-afft-ink/70">
              Tents, tables, chairs, cooking setup, lighting, DJI / Insta360 camera gear and practical accessories. Each rental series should feel complete, not like a loose item list.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {['Camping Kit', 'Camera Kit', 'Mobility Series', 'Family Series'].map((name) => (
              <div key={name} className="rounded-[1.4rem] bg-afft-sand p-6">
                <p className="text-xl font-bold text-afft-brown">{name}</p>
                <p className="mt-2 text-sm text-afft-ink/65">AFFT Rent-it Series</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="travel" className="bg-afft-sand py-20 md:py-28">
        <div className="container-afft rounded-[2rem] bg-afft-brown p-8 text-white shadow-soft md:p-14">
          <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-end">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.32em] text-afft-orange">Travel Services</p>
              <h2 className="font-serif text-4xl font-semibold md:text-5xl">Private Sabah trips with Tiggo 8 Pro comfort.</h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/72">
                Airport pickup, Kundasang day trip, camping transfer, island connection and custom family itinerary. Website V1 should push users to WhatsApp for final arrangement.
              </p>
            </div>
            <a href="#contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-afft-orange px-7 py-4 font-bold text-white">
              Plan My Sabah Trip <MessageCircle size={18} />
            </a>
          </div>
        </div>
      </section>

      <footer id="contact" className="bg-afft-ink py-12 text-white">
        <div className="container-afft flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-2xl font-bold tracking-[0.2em]">AFFT.CLUB</p>
            <p className="mt-2 text-white/60">Adventure Frontier Freedom Travel · Sabah</p>
          </div>
          <a href="https://wa.me/60100000000" className="rounded-full bg-afft-orange px-6 py-3 text-center font-bold">WhatsApp Us</a>
        </div>
      </footer>
    </main>
  );
}
