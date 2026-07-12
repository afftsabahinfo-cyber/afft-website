import type { Metadata } from "next"; import { PolicyPage } from "@/components/PolicyPage";
export const metadata: Metadata = { title: "Rental Deposit & Damage", alternates: { canonical: "/rental-policy", languages: { en: "/rental-policy", "zh-Hans": "/zh/rental-policy" } } };
export default function Page(){ return <PolicyPage policy="rental-policy" language="en" />; }
