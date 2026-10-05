"use client";
import Script from "next/script";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { createInquiryRef, formatInquiryRef, trackEvent } from "@/lib/analytics";
import { offerForPage } from "@/lib/site-metrics";
const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
export function Analytics() {
  const path = usePathname();
  const measured = useRef("");
  useEffect(() => {
    if (measured.current !== path) { measured.current = path; trackEvent("page_view"); if (/\/(packages|rent-it|travel-services)\//.test(path)) trackEvent("view_offer"); }
    const handleClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest("a") : null;
      if (!(target instanceof HTMLAnchorElement)) return;
      const link = new URL(target.href);
      const language = path === "/zh" || path.startsWith("/zh/") ? "zh" : "en";
      if (link.hostname === "wa.me" && link.pathname === "/601111598920") {
        const productLink = target.closest("tr")?.querySelector<HTMLAnchorElement>('a[href^="/rent-it/"],a[href^="/zh/rent-it/"]');
        const offer = target.dataset.offerSlug || offerForPage(productLink?.pathname || path);
        const original = link.searchParams.get("text") || (language === "zh" ? "你好 AFFT，我想了解你们的沙巴服务。" : "Hi AFFT, I want to ask about your Sabah services.");
        const content = original.replace(/\n\nREF: [\s\S]*$/, "");
        link.searchParams.set("text", `${content}\n\n${formatInquiryRef(createInquiryRef(language, offer))}`);
        target.href = link.toString();
        trackEvent("whatsapp_click", { offer_slug: offer });
      }
      if (target.textContent?.trim() === "ZH" || target.textContent?.trim() === "EN") trackEvent("language_switch");
    };
    document.addEventListener("click", handleClick, true);
    document.addEventListener("auxclick", handleClick, true);
    return () => { document.removeEventListener("click", handleClick, true); document.removeEventListener("auxclick", handleClick, true); };
  }, [path]);
  if (!measurementId) return null;
  return <><Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" /><Script id="afft-analytics" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${measurementId}',{allow_google_signals:false,allow_ad_personalization_signals:false,send_page_view:false});`}</Script></>;
}
