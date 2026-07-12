import type { Metadata } from "next"; import { PolicyPage } from "@/components/PolicyPage";
export const metadata: Metadata = { title: "Cancellation, Weather & Changes", alternates: { canonical: "/cancellation", languages: { en: "/cancellation", "zh-Hans": "/zh/cancellation" } } };
export default function Page(){ return <PolicyPage policy="cancellation" language="en" />; }
