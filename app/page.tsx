import { getPageMetadata } from "@/lib/seo";
import View from "@/views/Home";

export const metadata = getPageMetadata("/");

export default function Page() {
  return <View />;
}
