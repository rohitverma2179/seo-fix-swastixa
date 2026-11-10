import { getPageMetadata } from "@/lib/seo";
import { graph, breadcrumbSchema } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import View from "@/components/work/SocialMediaManagement";

export const metadata = getPageMetadata("/work/social-media-management");

export default function Page() {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
            { name: "Social Media Management", path: "/work/social-media-management" },
          ])
        )}
      />
      <View />
    </>
  );
}
