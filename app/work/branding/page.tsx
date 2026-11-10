import { getPageMetadata } from "@/lib/seo";
import { graph, breadcrumbSchema } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import View from "@/views/Branding";

export const metadata = getPageMetadata("/work/branding");

export default function Page() {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
            { name: "Branding & Identity", path: "/work/branding" },
          ])
        )}
      />
      <View />
    </>
  );
}
