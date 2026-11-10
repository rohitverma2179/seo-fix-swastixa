import { getPageMetadata } from "@/lib/seo";
import { graph, serviceSchema, localBusinessSchema, breadcrumbSchema } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import View from "@/views/VideoProductionHouse";

export const metadata = getPageMetadata("/services/video-production-house");

export default function Page() {
  return (
    <>
      <JsonLd
        data={graph(
          serviceSchema({
            name: "Video Production",
            serviceType: "Video Production",
            path: "/services/video-production-house",
            description:
              "Commercials, brand films, product videos, reels and drone footage produced in-house in Gurugram.",
          }),
          localBusinessSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: "Video Production", path: "/services/video-production-house" },
          ])
        )}
      />
      <View />
    </>
  );
}
