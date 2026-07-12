import type { Metadata } from "next"; import { PolicyPage } from "@/components/PolicyPage";
export const metadata: Metadata = { title: "Website & Service Terms", alternates: { canonical: "/terms", languages: { en: "/terms", "zh-Hans": "/zh/terms" } } };
export default function Page(){ return <PolicyPage policy="terms" language="en" />; }
