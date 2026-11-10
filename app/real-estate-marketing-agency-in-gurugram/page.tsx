import { getPageMetadata } from "@/lib/seo";
import {
  graph,
  serviceSchema,
  localBusinessSchema,
  breadcrumbSchema,
} from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import View from "@/views/RealEstateMarketingAgencyInGurugram";

export const metadata = getPageMetadata("/real-estate-marketing-agency-in-gurugram", {
  title: "Real Estate Marketing Agency in Gurugram",
  description:
    "Swastixa is a real estate marketing agency in Gurugram building qualified buyer pipelines for developers and brokers — RERA-safe creative and ads.",
  imageAlt:
    "Real estate marketing team in Gurugram planning a launch campaign for a residential project",
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={graph(
          localBusinessSchema({
            name: "Swastixa Digital — Real Estate Marketing Agency in Gurugram",
            areaServed: [
              { "@type": "City", name: "Gurugram" },
              { "@type": "City", name: "Golf Course Extension Road" },
              { "@type": "City", name: "Dwarka Expressway" },
              { "@type": "City", name: "New Gurgaon" },
              { "@type": "City", name: "Sohna Road" },
            ],
            knowsAbout: [
              "real estate marketing",
              "property lead generation",
              "developer launch campaigns",
              "RERA compliant real estate advertising",
            ],
          }),
          serviceSchema({
            name: "Real Estate Marketing",
            serviceType: "Real Estate Digital Marketing",
            path: "/real-estate-marketing-agency-in-gurugram",
            description:
              "Full-funnel real estate marketing for Gurugram developers and brokers: launch strategy, creative production, Google and Meta lead campaigns, site-visit nurture and CRM hand-off.",
            areaServed: ["Gurugram", "Delhi NCR"],
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            {
              name: "Real Estate Marketing Agency in Gurugram",
              path: "/real-estate-marketing-agency-in-gurugram",
            },
          ])
        )}
      />
      <View />
    </>
  );
}
