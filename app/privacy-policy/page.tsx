import { getPageMetadata } from "@/lib/seo";
import View from "@/views/PrivacyPolicy";

export const metadata = getPageMetadata("/privacy-policy");

export default function Page() {
  return <View />;
}
