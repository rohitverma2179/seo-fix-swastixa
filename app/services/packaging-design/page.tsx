import { getPageMetadata } from "@/lib/seo";
import { graph, serviceSchema, localBusinessSchema, breadcrumbSchema } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import View from "@/views/PackagingDesign";

export const metadata = getPageMetadata("/services/packaging-design");

export default function Page() {
  return (
    <>
      <JsonLd
        data={graph(
          serviceSchema({
            name: "Packaging Design",
            serviceType: "Packaging Design",
            path: "/services/packaging-design",
            description:
              "Structural and artwork packaging design for D2C and retail brands, delivered print-ready.",
          }),
          localBusinessSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: "Packaging Design", path: "/services/packaging-design" },
          ])
        )}
      />
      <View />
    </>
  );
}
