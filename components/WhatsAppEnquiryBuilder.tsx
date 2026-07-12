"use client";

import { useEffect, useMemo, useState } from "react";
import { createInquiryRef, formatInquiryRef, trackEvent } from "@/lib/analytics";
import { offers } from "@/lib/offers";
import { makeWhatsappLink } from "@/lib/rent-it-data";

type Service = "Camping package" | "Rent It gear" | "Private tour" | "Car rental / charter";
const services: Service[] = ["Camping package", "Rent It gear", "Private tour", "Car rental / charter"];

export function WhatsAppEnquiryBuilder({ title = "Send AFFT the right details first", text = "Answer a few practical questions so AFFT can reply with the right option faster.", defaultService = "Camping package", defaultInterest = "" }: { title?: string; text?: string; defaultService?: string; defaultInterest?: string; services?: {label:string;value:string}[] }) {
  const [service, setService] = useState<Service>(services.includes(defaultService as Service) ? defaultService as Service : "Camping package");
  const [offerId, setOfferId] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [interest, setInterest] = useState(defaultInterest);
  const [addOns, setAddOns] = useState("");
  const [copied, setCopied] = useState(false);
  const [refLine, setRefLine] = useState("REF: preparing website source");
  const campingOffers = offers.filter((offer) => offer.category === "camping");

  useEffect(() => { setRefLine(formatInquiryRef(createInquiryRef("en", offerId || "GENERAL"))); }, [offerId]);

  const message = useMemo(() => {
    const detailLabel = service === "Rent It gear" ? "Gear / use" : service === "Private tour" ? "Route / interests" : service === "Car rental / charter" ? "Route / luggage" : "Camping needs";
    return ["Hi AFFT, I want to plan a Sabah experience.", "", `Service: ${service}`, offerId ? `Offer: ${offerId}` : "", `Date: ${date || "Not confirmed"}`, `Guests: ${guests || "Not confirmed"}`, `Location / pickup: ${location || "Not confirmed"}`, `Budget: ${budget || "Please advise"}`, `${detailLabel}: ${interest || "Please recommend"}`, `Add-ons: ${addOns || "None yet"}`, "", refLine, "", "Please reply with availability, price and the practical next step."].filter(Boolean).join("\n");
  }, [addOns, budget, date, guests, interest, location, offerId, refLine, service]);

  const openHref = makeWhatsappLink(message);
  return <section className="rounded-[2rem] border border-[#F3922B]/20 bg-[#182015] p-6 md:p-8" onFocusCapture={() => trackEvent("start_enquiry", { service })}>
    <div className="grid gap-8 xl:grid-cols-[.8fr_1.2fr]"><div><p className="text-sm font-bold uppercase tracking-[.3em] text-[#F3922B]">WhatsApp Builder 2.0</p><h2 className="mt-3 text-3xl font-bold md:text-4xl">{title}</h2><p className="mt-4 text-white/70">{text}</p><p className="mt-4 text-sm text-white/45">No account required. The website does not store these answers.</p></div>
    <div className="grid gap-4"><div className="grid gap-4 md:grid-cols-2">
      <Field label="Service"><select value={service} onChange={(e)=>{setService(e.target.value as Service);setOfferId("");}} className={control}>{services.map(x=><option key={x}>{x}</option>)}</select></Field>
      {service === "Camping package" ? <Field label="Package"><select value={offerId} onChange={(e)=>setOfferId(e.target.value)} className={control}><option value="">Please recommend</option>{campingOffers.map(o=><option key={o.offerId} value={o.offerId}>{o.locales.en.name} — {o.priceType === "custom" ? "Custom quote" : `From RM${o.priceFrom}`}</option>)}</select></Field> : null}
      <Field label="Date"><input value={date} onChange={e=>setDate(e.target.value)} placeholder="Example: 12 Aug 2026" className={control}/></Field>
      <Field label="Guests"><input value={guests} onChange={e=>setGuests(e.target.value)} placeholder="2 adults, 1 child" className={control}/></Field>
      <Field label="Location / pickup"><input value={location} onChange={e=>setLocation(e.target.value)} placeholder="KK hotel, campsite or route" className={control}/></Field>
      <Field label="Budget"><input value={budget} onChange={e=>setBudget(e.target.value)} placeholder="Example: RM600–900" className={control}/></Field>
    </div>
    <Field label={service === "Rent It gear" ? "Gear and intended use" : service === "Private tour" ? "Places and interests" : service === "Car rental / charter" ? "Route, luggage and child seats" : "Camping needs"}><input value={interest} onChange={e=>setInterest(e.target.value)} placeholder="Tell us what matters most" className={control}/></Field>
    <Field label="Optional add-ons"><input value={addOns} onChange={e=>setAddOns(e.target.value)} placeholder="Transport, meals, creator gear or extra tent" className={control}/></Field>
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4"><p className="text-xs font-bold uppercase tracking-[.24em] text-white/45">Message preview</p><pre className="mt-3 max-h-72 overflow-auto whitespace-pre-wrap font-sans text-sm leading-6 text-white/75">{message}</pre></div>
    <div className="flex flex-wrap gap-3"><a href={openHref} target="_blank" rel="noreferrer" className="rounded-full bg-[#F3922B] px-6 py-3 font-bold text-black">Open WhatsApp</a><button type="button" onClick={async()=>{await navigator.clipboard?.writeText(message);trackEvent("copy_message",{service,offer_id:offerId||"GENERAL"});setCopied(true);setTimeout(()=>setCopied(false),1600);}} className="rounded-full border border-white/15 px-6 py-3 font-bold">{copied ? "Copied" : "Copy message"}</button></div>
    </div></div>
  </section>;
}

const control = "w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-[#F3922B]";
function Field({label,children}:{label:string;children:React.ReactNode}){return <label className="block"><span className="mb-2 block text-sm font-bold text-white/70">{label}</span>{children}</label>}
