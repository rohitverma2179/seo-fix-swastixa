import { getPageMetadata } from "@/lib/seo";
import { graph, serviceSchema, localBusinessSchema, breadcrumbSchema } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import View from "@/views/InfluencerMarketingAgency";

export const metadata = getPageMetadata("/services/influencer-marketing");

export default function Page() {
  return (
    <>
      <JsonLd
        data={graph(
          serviceSchema({
            name: "Influencer Marketing",
            serviceType: "Influencer Marketing",
            path: "/services/influencer-marketing",
            description:
              "Creator sourcing, briefing, contracting, campaign management and reporting for Indian brands.",
          }),
          localBusinessSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: "Influencer Marketing", path: "/services/influencer-marketing" },
          ])
        )}
      />
      <View />
    </>
  );
}
