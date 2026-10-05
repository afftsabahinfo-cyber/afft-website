import {
  buildJimnyCampMetadata,
} from "@/components/JimnyCampPackagePage";
import { jimnyExplorerCamp } from "@/lib/jimny-camp-packages";
import { ExplorerLandingPage } from "@/components/ExplorerLandingPage";

export const metadata = buildJimnyCampMetadata(jimnyExplorerCamp);

export default function JimnyExplorerCampPage() {
  return <ExplorerLandingPage slug="jimny-explorer-camp" />;
}
