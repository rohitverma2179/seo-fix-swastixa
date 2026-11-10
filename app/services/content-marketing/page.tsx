import { getPageMetadata } from "@/lib/seo";
import { graph, serviceSchema, localBusinessSchema, breadcrumbSchema } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import View from "@/views/ContentMarketingAgency";

export const metadata = getPageMetadata("/services/content-marketing");

export default function Page() {
  return (
    <>
      <JsonLd
        data={graph(
          serviceSchema({
            name: "Content Marketing",
            serviceType: "Content Marketing",
            path: "/services/content-marketing",
            description:
              "Content strategy, editorial calendars, blog and video scripts, and distribution for brands that want organic growth.",
          }),
          localBusinessSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: "Content Marketing", path: "/services/content-marketing" },
          ])
        )}
      />
      <View />
    </>
  );
}
