import {
  buildJimnyCampMetadata,
  JimnyCampPackagePage,
} from "@/components/JimnyCampPackagePage";
import { jimnyAdventureCamp } from "@/lib/jimny-camp-packages";

export const metadata = buildJimnyCampMetadata(jimnyAdventureCamp);

export default function JimnyAdventureCampPage() {
  return <JimnyCampPackagePage pkg={jimnyAdventureCamp} />;
}
