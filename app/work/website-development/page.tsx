import { getPageMetadata } from "@/lib/seo";
import { graph, breadcrumbSchema } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import View from "@/components/work/WebsiteDevelopment";

export const metadata = getPageMetadata("/work/website-development");

export default function Page() {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
            { name: "Website Development", path: "/work/website-development" },
          ])
        )}
      />
      <View />
    </>
  );
}
