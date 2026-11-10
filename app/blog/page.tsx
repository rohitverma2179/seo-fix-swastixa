import { getPageMetadata } from "@/lib/seo";
import { graph, breadcrumbSchema } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import View from "@/views/Blog";

export const metadata = getPageMetadata("/blog");

export default function Page() {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
          ])
        )}
      />
      <View />
    </>
  );
}
