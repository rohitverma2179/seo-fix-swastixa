// app/robots.ts
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/draft/",
          "/preview/",
          "/*?utm_",
          "/*?fbclid=",
          "/*?gclid=",
          "/404",
        ],
      },
      // Do not block _next/static — Google needs CSS/JS to render the page.
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
    ],
    sitemap: "https://swastixa.com/sitemap.xml",
    host: "https://swastixa.com",
  };
}
