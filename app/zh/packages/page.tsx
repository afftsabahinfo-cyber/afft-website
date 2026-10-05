import { CampingHub, campingMetadata } from "@/components/CampingSeries";
export const metadata = campingMetadata("zh");
export default function Page() {
  return <CampingHub lang="zh" />;
}
