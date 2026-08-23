import {
  buildJimnyCampMetadata,
  JimnyCampPackagePage,
} from "@/components/JimnyCampPackagePage";
import { jimnyExplorerCamp } from "@/lib/jimny-camp-packages";

export const metadata = buildJimnyCampMetadata(jimnyExplorerCamp);

export default function JimnyExplorerCampPage() {
  return <JimnyCampPackagePage pkg={jimnyExplorerCamp} />;
}
