import {
  buildJimnyCampMetadata,
  JimnyCampPackagePage,
} from "@/components/JimnyCampPackagePage";
import { jimnySleepCamp } from "@/lib/jimny-camp-packages";

export const metadata = buildJimnyCampMetadata(jimnySleepCamp);

export default function JimnySleepCampPage() {
  return <JimnyCampPackagePage pkg={jimnySleepCamp} />;
}
