import { getPageMetadata } from "@/lib/seo";
import { graph, breadcrumbSchema } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import View from "@/components/work/DigitalMarketing";

export const metadata = getPageMetadata("/work/digital-marketing");

export default function Page() {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
            { name: "Digital Marketing", path: "/work/digital-marketing" },
          ])
        )}
      />
      <View />
    </>
  );
}
