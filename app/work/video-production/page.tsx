import { getPageMetadata } from "@/lib/seo";
import { graph, breadcrumbSchema } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import View from "@/components/work/ProductionHouse";

export const metadata = getPageMetadata("/work/video-production");

export default function Page() {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
            { name: "Video Production", path: "/work/video-production" },
          ])
        )}
      />
      <View />
    </>
  );
}
