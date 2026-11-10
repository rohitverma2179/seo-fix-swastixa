import { getPageMetadata } from "@/lib/seo";
import { graph, serviceSchema, localBusinessSchema, breadcrumbSchema } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import View from "@/views/SeoAgency";

export const metadata = getPageMetadata("/services/seo-agency");

export default function Page() {
  return (
    <>
      <JsonLd
        data={graph(
          serviceSchema({
            name: "SEO Services",
            serviceType: "Search Engine Optimization",
            path: "/services/seo-agency",
            description:
              "Technical SEO, on-page optimisation, local SEO, content strategy and link acquisition for businesses in Gurugram and Delhi NCR.",
          }),
          localBusinessSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: "SEO Services", path: "/services/seo-agency" },
          ])
        )}
      />
      <View />
    </>
  );
}
