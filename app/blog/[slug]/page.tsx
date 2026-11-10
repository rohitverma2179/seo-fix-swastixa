// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import { blogs } from "@/data/blogs";
import { blogDates } from "@/data/blogDates";
import { getBlogMetadata } from "@/lib/seo";
import { graph, blogPostingSchema, breadcrumbSchema } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import View from "@/views/BlogInner";

export const dynamicParams = false; // static export: only known slugs exist

export function generateStaticParams() {
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return getBlogMetadata(slug);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = (blogs as any[]).find((b) => b.slug === slug);
  if (!blog) notFound();

  const dates = blogDates[slug];
  const headline = blog.hero?.metaTitle || blog.hero?.title || slug;

  return (
    <>
      <JsonLd
        data={graph(
          blogPostingSchema({
            slug,
            headline,
            description: blog.hero?.description ?? "",
            image: blog.hero?.image ?? "/og/swastixa-og-default.jpg",
            publishedAt: dates?.publishedAt,
            updatedAt: dates?.updatedAt,
            author: blog.author,
            category: blog.category,
            tags: blog.tags,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: headline, path: `/blog/${slug}` },
          ])
        )}
      />
      <View />
    </>
  );
}
