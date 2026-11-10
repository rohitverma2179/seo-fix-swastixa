"use client";

import dynamic from 'next/dynamic';
import { useParams } from "@/lib/router";
import { blogs } from "../data/blogs";
const BlogLayout = dynamic(() => import('../components/blog/bloginnerPages/BlogLayout'));

export default function BlogInner() {
  const { slug } = useParams();     

  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    return <p className="text-white p-10">Blog not found</p>;
  }

  return <BlogLayout blog={blog} />;
}