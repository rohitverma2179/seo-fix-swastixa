import { getPageMetadata } from "@/lib/seo";
import { graph, serviceSchema, localBusinessSchema, breadcrumbSchema } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import View from "@/views/WebsiteDevelopment";

export const metadata = getPageMetadata("/services/website-development");

export default function Page() {
  return (
    <>
      <JsonLd
        data={graph(
          serviceSchema({
            name: "Website Development",
            serviceType: "Website Development",
            path: "/services/website-development",
            description:
              "Responsive Next.js, WordPress and Shopify builds with Core Web Vitals, schema markup and analytics baked in.",
          }),
          localBusinessSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: "Website Development", path: "/services/website-development" },
          ])
        )}
      />
      <View />
    </>
  );
}
