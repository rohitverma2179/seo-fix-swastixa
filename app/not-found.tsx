// app/not-found.tsx  —  server component (no "use client") so metadata works
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found (404)",
  description: "The page you are looking for does not exist or has been moved.",
  robots: { index: false, follow: true }, // never let a 404 get indexed
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-white text-6xl md:text-8xl font-bold">404</h1>
      <p className="text-white/70 mt-4 text-lg">
        The page you are looking for does not exist or has been moved.
      </p>

      {/* Real <a> links: crawlable and usable without JavaScript */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="inline-block border border-white/30 text-white px-8 py-3 rounded-sm transition-colors hover:border-white hover:bg-white hover:text-black"
        >
          Back to Home
        </Link>
        <Link
          href="/services"
          className="inline-block border border-white/30 text-white px-8 py-3 rounded-sm transition-colors hover:border-white hover:bg-white hover:text-black"
        >
          Our Services
        </Link>
        <Link
          href="/work"
          className="inline-block border border-white/30 text-white px-8 py-3 rounded-sm transition-colors hover:border-white hover:bg-white hover:text-black"
        >
          See Our Work
        </Link>
      </div>
    </main>
  );
}
