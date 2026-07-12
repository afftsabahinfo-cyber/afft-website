import type { Metadata } from "next"; import { PolicyPage } from "@/components/PolicyPage";
export const metadata: Metadata = { title: "付款与确认", alternates: { canonical: "/zh/payment-confirmation", languages: { en: "/payment-confirmation", "zh-Hans": "/zh/payment-confirmation" } } };
export default function Page(){ return <PolicyPage policy="payment-confirmation" language="zh" />; }
