"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";

export function TrackedLink({ eventName, eventParams, onClick, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { eventName: AnalyticsEvent; eventParams?: Record<string, string | number | boolean | undefined> }) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    trackEvent(eventName, eventParams);
    onClick?.(event);
  };
  return <a {...props} onClick={handleClick} />;
}
