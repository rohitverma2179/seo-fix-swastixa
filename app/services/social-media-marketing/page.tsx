import { getPageMetadata } from "@/lib/seo";
import { graph, serviceSchema, localBusinessSchema, breadcrumbSchema } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import View from "@/views/SocialMediaMarketingAgency";

export const metadata = getPageMetadata("/services/social-media-marketing");

export default function Page() {
  return (
    <>
      <JsonLd
        data={graph(
          serviceSchema({
            name: "Social Media Marketing",
            serviceType: "Social Media Marketing",
            path: "/services/social-media-marketing",
            description:
              "Content calendars, community management, creative production and paid social for brands across India.",
          }),
          localBusinessSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: "Social Media Marketing", path: "/services/social-media-marketing" },
          ])
        )}
      />
      <View />
    </>
  );
}
