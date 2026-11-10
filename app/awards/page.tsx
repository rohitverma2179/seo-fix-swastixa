import { getPageMetadata } from "@/lib/seo";
import { graph, breadcrumbSchema } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import View from "@/views/Awards";

export const metadata = getPageMetadata("/awards");

export default function Page() {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Awards & Recognition", path: "/awards" },
          ])
        )}
      />
      <View />
    </>
  );
}
