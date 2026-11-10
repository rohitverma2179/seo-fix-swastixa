import { getPageMetadata } from "@/lib/seo";
import View from "@/views/Work";

export const metadata = getPageMetadata("/work");

export default function Page() {
  return <View />;
}
