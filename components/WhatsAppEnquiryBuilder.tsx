"use client";

import { useMemo, useState } from "react";
import { makeWhatsappLink } from "@/lib/rent-it-data";

type ServiceOption = {
  label: string;
  value: string;
};

const defaultServices: ServiceOption[] = [
  { label: "Camping package", value: "Camping package" },
  { label: "Rent It gear", value: "Rent It gear" },
  { label: "Private tour", value: "Private tour" },
  { label: "Car rental / charter", value: "Car rental / charter" },
  { label: "Airport transfer", value: "Airport transfer" },
];

export function WhatsAppEnquiryBuilder({
  title = "Send AFFT the right details first",
  text = "Use this simple WhatsApp helper so AFFT can reply with the practical next step faster.",
  defaultService = "Camping package",
  defaultInterest = "",
  services = defaultServices,
}: {
  title?: string;
  text?: string;
  defaultService?: string;
  defaultInterest?: string;
  services?: ServiceOption[];
}) {
  const [service, setService] = useState(defaultService);
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("");
  const [pickup, setPickup] = useState("");
  const [interest, setInterest] = useState(defaultInterest);
  const [notes, setNotes] = useState("");
  const [copied, setCopied] = useState(false);

  const message = useMemo(() => {
    const lines = [
      "Hi AFFT, I want to plan a Sabah trip.",
      "",
      `Service: ${service || "Not sure yet"}`,
      `Travel date: ${date || "Not confirmed yet"}`,
      `Guests: ${guests || "Not confirmed yet"}`,
      `Pickup / location: ${pickup || "Not confirmed yet"}`,
      `Interest: ${interest || "Please recommend the right option"}`,
      notes ? `Notes: ${notes}` : "",
      "",
      "Please reply with available options and the practical next step.",
    ];

    return lines.filter(Boolean).join("\n");
  }, [date, guests, interest, notes, pickup, service]);

  const copyMessage = async () => {
    if (!navigator.clipboard) {
      return;
    }

    await navigator.clipboard.writeText(message);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section className="rounded-[2rem] border border-[#F3922B]/20 bg-[#182015] p-6 md:p-8">
      <div className="grid gap-8 xl:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#F3922B]">
            WhatsApp Helper
          </p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">{title}</h2>
          <p className="mt-4 text-white/70">{text}</p>
        </div>

        <div className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Service">
              <select
                value={service}
                onChange={(event) => setService(event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-white outline-none focus:border-[#F3922B]"
              >
                {services.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Travel date">
              <input
                value={date}
                onChange={(event) => setDate(event.target.value)}
                placeholder="Example: 12 Aug 2026"
                className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-[#F3922B]"
              />
            </Field>

            <Field label="Guests">
              <input
                value={guests}
                onChange={(event) => setGuests(event.target.value)}
                placeholder="Example: 2 adults, 1 child"
                className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-[#F3922B]"
              />
            </Field>

            <Field label="Pickup / location">
              <input
                value={pickup}
                onChange={(event) => setPickup(event.target.value)}
                placeholder="Example: KK city hotel"
                className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-[#F3922B]"
              />
            </Field>
          </div>

          <Field label="Interest">
            <input
              value={interest}
              onChange={(event) => setInterest(event.target.value)}
              placeholder="Example: Explorer Camp with transport"
              className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-[#F3922B]"
            />
          </Field>

          <Field label="Notes">
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Budget, preferred route, luggage, gear, special requests"
              rows={3}
              className="w-full resize-none rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-[#F3922B]"
            />
          </Field>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/45">
              Message Preview
            </p>
            <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-6 text-white/75">
              {message}
            </pre>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={makeWhatsappLink(message)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#F3922B] px-6 py-3 font-bold text-black"
            >
              Open WhatsApp
            </a>
            <button
              type="button"
              onClick={copyMessage}
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 font-bold text-white"
            >
              {copied ? "Copied" : "Copy Message"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-white/70">{label}</span>
      {children}
    </label>
  );
}
