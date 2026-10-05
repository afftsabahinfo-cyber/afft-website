export const metricEvents = ["page_view", "view_offer", "start_enquiry", "whatsapp_click", "copy_message", "language_switch", "review_request"] as const;
export type MetricEventName = (typeof metricEvents)[number];
export const metricSources = ["direct", "google", "bing", "facebook", "instagram", "tiktok", "xiaohongshu", "whatsapp", "email", "partner", "other"] as const;
export const metricMediums = ["website", "organic", "social", "referral", "email", "paid"] as const;
export const metricCampaigns = ["none", "jimny599", "explorer599", "rent-it", "camping", "partner-camping"] as const;
export type Attribution = { source: string; medium: string; campaign: string };
export type SiteMetric = Attribution & { id: string; session: string; name: MetricEventName; page: string; landing: string; offer: string; language: "en" | "zh"; test: boolean };

export function campaignAttribution(search: string, referrer: string): Attribution {
  const query = new URLSearchParams(search);
  const requested = query.get("utm_source")?.toLowerCase();
  const aliases: Record<string, string> = { fb: "facebook", ig: "instagram", xhs: "xiaohongshu", rednote: "xiaohongshu" };
  let source = requested ? aliases[requested] || requested : "direct";
  let medium = query.get("utm_medium")?.toLowerCase() || "website";
  if (!requested && referrer) {
    try {
      const host = new URL(referrer).hostname;
      if (!/^(www\.)?afft\.club$/.test(host)) {
        source = /(^|\.)google\./.test(host) ? "google" : /(^|\.)bing\.com$/.test(host) ? "bing" : /(^|\.)facebook\.com$/.test(host) ? "facebook" : /(^|\.)instagram\.com$/.test(host) ? "instagram" : /(^|\.)tiktok\.com$/.test(host) ? "tiktok" : /(^|\.)(xiaohongshu\.com|xhslink\.com)$/.test(host) ? "xiaohongshu" : "other";
        medium = ["google", "bing"].includes(source) ? "organic" : ["facebook", "instagram", "tiktok", "xiaohongshu"].includes(source) ? "social" : "referral";
      }
    } catch { /* Invalid referrer is treated as direct. */ }
  }
  return { source: metricSources.includes(source as typeof metricSources[number]) ? source : "other", medium: metricMediums.includes(medium as typeof metricMediums[number]) ? medium : "website", campaign: metricCampaigns.includes(query.get("utm_campaign") as typeof metricCampaigns[number]) ? query.get("utm_campaign")! : "none" };
}
export function offerForPage(path: string): string {
  const publicPath = path.replace(/^\/zh(?=\/|$)/, "");
  return /^\/(packages|rent-it|travel-services)\/[a-z0-9-]+$/.test(publicPath) ? publicPath.split("/").at(-1)! : "general";
}
export function validateSiteMetric(input: unknown, pages: ReadonlySet<string>): SiteMetric | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const event = input as Record<string, unknown>;
  const keys = ["id", "session", "name", "page", "landing", "offer", "language", "source", "medium", "campaign", "test"];
  if (Object.keys(event).some(key => !keys.includes(key))) return null;
  const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (typeof event.id !== "string" || !uuid.test(event.id) || typeof event.session !== "string" || !uuid.test(event.session)) return null;
  if (!metricEvents.includes(event.name as MetricEventName) || typeof event.page !== "string" || !pages.has(event.page) || typeof event.landing !== "string" || !pages.has(event.landing)) return null;
  if (!metricSources.includes(event.source as typeof metricSources[number]) || !metricMediums.includes(event.medium as typeof metricMediums[number]) || !metricCampaigns.includes(event.campaign as typeof metricCampaigns[number])) return null;
  if (event.language !== (event.page === "/zh" || event.page.startsWith("/zh/") ? "zh" : "en") || typeof event.test !== "boolean") return null;
  if (typeof event.offer !== "string" || !(event.offer === "general" || pages.has(`/packages/${event.offer}`) || pages.has(`/rent-it/${event.offer}`) || pages.has(`/travel-services/${event.offer}`))) return null;
  return event as SiteMetric;
}
