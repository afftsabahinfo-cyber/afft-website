import { CampingDetail, campingMetadata } from "@/components/CampingSeries";
import { getCamp } from "@/lib/camping-series";
const item = getCamp("jimny-drive-camp")!;
export const metadata = campingMetadata("en", item);
export default function Page() {
  return <CampingDetail item={item} legacy />;
}
