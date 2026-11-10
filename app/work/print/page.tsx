import { getPageMetadata } from "@/lib/seo";
import { graph, breadcrumbSchema } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import View from "@/views/Print";

export const metadata = getPageMetadata("/work/print");

export default function Page() {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
            { name: "Print & Packaging", path: "/work/print" },
          ])
        )}
      />
      <View />
    </>
  );
}
