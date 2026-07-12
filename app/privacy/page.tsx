import type { Metadata } from "next"; import { PolicyPage } from "@/components/PolicyPage";
export const metadata: Metadata = { title: "Privacy Notice", alternates: { canonical: "/privacy", languages: { en: "/privacy", "zh-Hans": "/zh/privacy" } } };
export default function Page(){ return <PolicyPage policy="privacy" language="en" />; }
