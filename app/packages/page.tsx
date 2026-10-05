import { CampingHub, campingMetadata } from "@/components/CampingSeries";
export const metadata = campingMetadata("en");
export default function Page() {
  return <CampingHub lang="en" />;
}
