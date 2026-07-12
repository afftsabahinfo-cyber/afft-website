import type { Metadata } from "next"; import { PolicyPage } from "@/components/PolicyPage";
export const metadata: Metadata = { title: "隐私说明", alternates: { canonical: "/zh/privacy", languages: { en: "/privacy", "zh-Hans": "/zh/privacy" } } };
export default function Page(){ return <PolicyPage policy="privacy" language="zh" />; }
