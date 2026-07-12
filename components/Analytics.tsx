"use client";

import Script from "next/script";
import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function Analytics() {
  useEffect(() => {
    const path = window.location.pathname;
    if (/\/(packages|rent-it|travel-services)\//.test(path)) {
      trackEvent("view_offer", { landing_page: path, language: path.startsWith("/zh/") ? "zh" : "en" });
    }

    const handleClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest("a,button") : null;
      if (!target) return;
      if (target instanceof HTMLAnchorElement && /wa\.me\/601111598920/.test(target.href)) {
        trackEvent("whatsapp_click", { landing_page: path, language: path.startsWith("/zh") ? "zh" : "en" });
      }
      if (target instanceof HTMLAnchorElement && (target.pathname === "/zh" || (!target.pathname.startsWith("/zh") && target.textContent?.trim() === "EN"))) {
        trackEvent("language_switch", { landing_page: path, target_language: target.pathname.startsWith("/zh") ? "zh" : "en" });
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  if (!measurementId) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
      <Script id="afft-analytics" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${measurementId}',{anonymize_ip:true,allow_google_signals:false,allow_ad_personalization_signals:false});`}
      </Script>
    </>
  );
}
