import type { Metadata } from "next"; import { PolicyPage } from "@/components/PolicyPage";
export const metadata: Metadata = { title: "租借押金与损坏", alternates: { canonical: "/zh/rental-policy", languages: { en: "/rental-policy", "zh-Hans": "/zh/rental-policy" } } };
export default function Page(){ return <PolicyPage policy="rental-policy" language="zh" />; }
