import type { Metadata } from "next"; import { PolicyPage } from "@/components/PolicyPage";
export const metadata: Metadata = { title: "取消、天气与改期", alternates: { canonical: "/zh/cancellation", languages: { en: "/cancellation", "zh-Hans": "/zh/cancellation" } } };
export default function Page(){ return <PolicyPage policy="cancellation" language="zh" />; }
