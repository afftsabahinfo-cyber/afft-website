import type { Metadata } from "next"; import { PolicyPage } from "@/components/PolicyPage";
export const metadata: Metadata = { title: "Payment & Confirmation", alternates: { canonical: "/payment-confirmation", languages: { en: "/payment-confirmation", "zh-Hans": "/zh/payment-confirmation" } } };
export default function Page(){ return <PolicyPage policy="payment-confirmation" language="en" />; }
