import { getPageMetadata } from "@/lib/seo";
import { graph, breadcrumbSchema } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import View from "@/components/work/ProductionHouse";

export function generateStaticParams() {
  return [{ tab: "films" }, { tab: "construction" }];
}

const TAB_LABELS: Record<string, string> = {
  films: "Commercial Films",
  construction: "Construction & Industrial",
};

export async function generateMetadata({ params }: { params: Promise<{ tab: string }> }) {
  const { tab } = await params;
  return getPageMetadata(`/work/video-production/${tab}`);
}

export default async function Page({ params }: { params: Promise<{ tab: string }> }) {
  const { tab } = await params;
  const label = TAB_LABELS[tab] ?? "Video Production";

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
            { name: "Video Production", path: "/work/video-production" },
            { name: label, path: `/work/video-production/${tab}` },
          ])
        )}
      />
      <View />
    </>
  );
}
