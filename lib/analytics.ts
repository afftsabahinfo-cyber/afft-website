import { campaignAttribution, offerForPage, validateSiteMetric, type MetricEventName, type SiteMetric } from "./site-metrics";
import pages from "./metrics-pages.json";
export type AnalyticsEvent = MetricEventName;
type EventParams = Record<string, string | number | boolean | undefined>;
declare global { interface Window { gtag?: (...args: unknown[]) => void; } }
type Session = { id: string; landing: string; source: string; medium: string; campaign: string; test: boolean; touched: number };
const storageKey = "afft-site-session-v1";
let current: Session | undefined;
export function getAnalyticsSession(): Session {
  const now = Date.now();
  const query = new URLSearchParams(window.location.search);
  if (!current) { try {
    const saved = JSON.parse(sessionStorage.getItem(storageKey) || "null") as Session | null;
    if (saved && Number.isFinite(saved.touched) && validateSiteMetric({ id: saved.id, session: saved.id, name: "page_view", page: saved.landing, landing: saved.landing, offer: "general", language: saved.landing === "/zh" || saved.landing.startsWith("/zh/") ? "zh" : "en", source: saved.source, medium: saved.medium, campaign: saved.campaign, test: saved.test }, new Set(pages))) current = saved;
  } catch { /* Storage is optional. */ } }
  const attribution = campaignAttribution(window.location.search, document.referrer);
  const changedCampaign = query.has("utm_source") && current && (current.source !== attribution.source || current.campaign !== attribution.campaign || current.medium !== attribution.medium);
  if (!current || now - current.touched > 30 * 60 * 1000 || changedCampaign) {
    current = { id: crypto.randomUUID(), landing: window.location.pathname.replace(/\/$/, "") || "/", ...attribution, test: query.get("qa") === "1", touched: now };
  }
  current.test ||= query.get("qa") === "1";
  current.touched = now;
  try { sessionStorage.setItem(storageKey, JSON.stringify(current)); } catch { /* Current page still works without storage. */ }
  return current;
}
export function trackEvent(name: AnalyticsEvent, params: EventParams = {}) {
  if (typeof window === "undefined" || navigator.doNotTrack === "1") return;
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  const session = getAnalyticsSession();
  const event: SiteMetric = { id: crypto.randomUUID(), session: session.id, name, page: path, landing: session.landing, offer: typeof params.offer_slug === "string" ? params.offer_slug : offerForPage(path), language: path === "/zh" || path.startsWith("/zh/") ? "zh" : "en", source: session.source, medium: session.medium, campaign: session.campaign, test: session.test };
  // Never send form values, message text, full referrers or query strings.
  if (["afft.club", "www.afft.club"].includes(window.location.hostname)) {
    const body = JSON.stringify(event);
    let queued = false;
    try { queued = navigator.sendBeacon?.("/api/site-events", new Blob([body], { type: "application/json" })) || false; } catch { /* Use keepalive fallback. */ }
    if (!queued) void fetch("/api/site-events", { method: "POST", body, headers: { "Content-Type": "application/json" }, keepalive: true }).catch(() => {});
  }
  if (!session.test) window.gtag?.("event", name, { page_path: path, offer_slug: event.offer, source: event.source, medium: event.medium, campaign: event.campaign, language: event.language });
}
export type InquiryRef = { source: string; medium: string; campaign: string; landingPage: string; currentPage: string; language: "en" | "zh"; offerId: string; timestamp: string; sessionId: string };
export function createInquiryRef(language: "en" | "zh", offerId = "GENERAL"): InquiryRef {
  if (typeof window === "undefined") return { source: "direct", medium: "website", campaign: "none", landingPage: "", currentPage: "", language, offerId, timestamp: "", sessionId: "" };
  const session = getAnalyticsSession();
  return { source: session.source, medium: session.medium, campaign: session.campaign, landingPage: session.landing, currentPage: window.location.pathname, language, offerId, timestamp: new Date().toISOString(), sessionId: session.id };
}
export function formatInquiryRef(ref: InquiryRef) { return `REF: ${ref.source}/${ref.medium}/${ref.campaign} | ${ref.landingPage} | ${ref.language} | ${ref.offerId}\nWebsite page: ${ref.currentPage}\nWebsite visit: ${ref.sessionId}`; }
