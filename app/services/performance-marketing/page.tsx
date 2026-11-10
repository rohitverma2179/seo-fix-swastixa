import { getPageMetadata } from "@/lib/seo";
import { graph, serviceSchema, localBusinessSchema, breadcrumbSchema } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import View from "@/views/PerformanceMarketingAgency";

export const metadata = getPageMetadata("/services/performance-marketing");

export default function Page() {
  return (
    <>
      <JsonLd
        data={graph(
          serviceSchema({
            name: "Performance Marketing",
            serviceType: "Performance Marketing",
            path: "/services/performance-marketing",
            description:
              "Google Ads, Meta Ads, landing pages, conversion tracking and reporting built around cost per qualified lead.",
          }),
          localBusinessSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: "Performance Marketing", path: "/services/performance-marketing" },
          ])
        )}
      />
      <View />
    </>
  );
}
