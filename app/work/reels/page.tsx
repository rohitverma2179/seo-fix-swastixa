import { getPageMetadata } from "@/lib/seo";
import { graph, breadcrumbSchema } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import View from "@/views/Reels";

export const metadata = getPageMetadata("/work/reels");

export default function Page() {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
            { name: "Reels & Short-Form Video", path: "/work/reels" },
          ])
        )}
      />
      <View />
    </>
  );
}
