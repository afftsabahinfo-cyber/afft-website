import type { Metadata } from "next";
import { ExplorerLandingPage } from "@/components/ExplorerLandingPage";
export const metadata: Metadata = {
  title: "Explorer Camp from RM599 for Two | AFFT Sabah Camping",
  description: "A 2D1N ready-built Sabah camp for two from RM599. Compare with Jimny Explorer Camp. Check transport, campsite fees and your total quote on WhatsApp.",
  alternates: { canonical: "/packages/explorer-camp", languages: { en: "/packages/explorer-camp", "zh-Hans": "/zh/packages/explorer-camp" } },
  openGraph: { title: "Explorer Camp from RM599 for Two | AFFT", description: "Ready-built camp for two. Transport and unstated campsite fees quoted separately.", images: [{ url: "/images/customer-stories/explorer-camp-rm599/explorer-camp-rm599-setup-01.webp", alt: "Real AFFT Explorer Camp setup" }] },
};
export default function ExplorerCampPage() { return <ExplorerLandingPage slug="explorer-camp" />; }
