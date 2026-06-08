import { ArrowRight, MapPin } from 'lucide-react';

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-afft-forest pt-16 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(242,140,40,0.35),transparent_28%),linear-gradient(135deg,rgba(31,27,22,0.72),rgba(34,51,34,0.82))]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-afft-cream to-transparent" />
      <div className="container-afft relative grid min-h-[calc(100vh-64px)] items-center gap-10 py-20 md:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur">
            <MapPin size={16} /> Mount Kinabalu · Sabah Outdoor Base
          </div>
          <h1 className="font-serif text-5xl font-semibold leading-[0.98] md:text-7xl">
            Explore Sabah Beyond The Tourist Trail
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/78 md:text-xl">
            Premium outdoor experiences, camping packages, gear rentals and private travel services built around Sabah’s mountain, river and stargazing routes.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#experiences" className="inline-flex items-center justify-center gap-2 rounded-full bg-afft-orange px-6 py-3 font-bold text-white shadow-soft">
              Explore Experiences <ArrowRight size={18} />
            </a>
            <a href="#camping" className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-3 font-bold text-white backdrop-blur hover:bg-white/10">
              View Camping Packages
            </a>
          </div>
        </div>
        <div className="rounded-[2rem] border border-white/20 bg-white/10 p-4 shadow-soft backdrop-blur-md">
          <div className="aspect-[4/5] rounded-[1.5rem] bg-[linear-gradient(160deg,#734C24,#223322_58%,#F28C28)] p-6">
            <div className="flex h-full flex-col justify-between rounded-[1rem] border border-white/20 p-6">
              <p className="text-sm uppercase tracking-[0.28em] text-white/70">AFFT Website V1</p>
              <div>
                <p className="mb-2 text-sm text-white/70">Homepage Order</p>
                <ol className="space-y-3 text-2xl font-bold">
                  <li>01 Sabah Experiences</li>
                  <li>02 Camping Packages</li>
                  <li>03 Rentals</li>
                  <li>04 Travel Services</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
