import { notFound } from "next/navigation";
import { CampingDetail, campingMetadata } from "@/components/CampingSeries";
import { campItems, campAliases, getCamp } from "@/lib/camping-series";
type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return [...campItems.map((p) => p.slug), ...Object.keys(campAliases)].map(
    (slug) => ({ slug }),
  );
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const p = getCamp(slug);
  return p ? campingMetadata("zh", p) : {};
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const p = getCamp(slug);
  if (!p) notFound();
  return (
    <CampingDetail item={p} lang="zh" legacy={Boolean(campAliases[slug])} />
  );
}
