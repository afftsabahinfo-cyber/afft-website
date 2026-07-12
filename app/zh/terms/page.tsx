import type { Metadata } from "next"; import { PolicyPage } from "@/components/PolicyPage";
export const metadata: Metadata = { title: "网站与服务条款", alternates: { canonical: "/zh/terms", languages: { en: "/terms", "zh-Hans": "/zh/terms" } } };
export default function Page(){ return <PolicyPage policy="terms" language="zh" />; }
