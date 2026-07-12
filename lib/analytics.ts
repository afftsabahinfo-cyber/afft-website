export type AnalyticsEvent =
  | "view_offer"
  | "start_enquiry"
  | "whatsapp_click"
  | "copy_message"
  | "language_switch"
  | "review_request";

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: AnalyticsEvent, params: EventParams = {}) {
  if (typeof window === "undefined") return;
  const safeParams = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined),
  );
  window.gtag?.("event", name, safeParams);
}

export type InquiryRef = {
  source: string;
  medium: string;
  campaign: string;
  landingPage: string;
  language: "en" | "zh";
  offerId: string;
  timestamp: string;
};

export function createInquiryRef(language: "en" | "zh", offerId = "GENERAL"): InquiryRef {
  if (typeof window === "undefined") {
    return { source: "direct", medium: "website", campaign: "none", landingPage: "", language, offerId, timestamp: "" };
  }
  const query = new URLSearchParams(window.location.search);
  return {
    source: query.get("utm_source") || "direct",
    medium: query.get("utm_medium") || "website",
    campaign: query.get("utm_campaign") || "none",
    landingPage: window.location.pathname,
    language,
    offerId,
    timestamp: new Date().toISOString(),
  };
}

export function formatInquiryRef(ref: InquiryRef) {
  return `REF: ${ref.source}/${ref.medium}/${ref.campaign} | ${ref.landingPage} | ${ref.language} | ${ref.offerId} | ${ref.timestamp}`;
}

