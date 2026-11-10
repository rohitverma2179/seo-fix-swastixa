// src/components/seo/SmartImage.tsx
// Drop-in replacement for the raw <img> tags used across the site.
//
// Why not next/image? next.config.mjs sets output:"export" + images.unoptimized,
// so next/image adds no optimisation either — but it still gives you enforced
// width/height, lazy/eager control and srcset support. If you keep plain <img>,
// this wrapper gives the same discipline without the runtime.

import type { CSSProperties } from "react";

type SmartImageProps = {
  src: string;
  /** Required: descriptive, unique, <= 125 characters. Decorative? pass alt="". */
  alt: string;
  width: number;
  height: number;
  /** true only for the single LCP image in the viewport (hero/above-the-fold). */
  priority?: boolean;
  sizes?: string;
  className?: string;
  style?: CSSProperties;
  /** Optional responsive variants from your CDN, e.g. ["400w","800w","1600w"] */
  widths?: number[];
};

export default function SmartImage({
  src,
  alt,
  width,
  height,
  priority = false,
  sizes = "100vw",
  className,
  style,
  widths,
}: SmartImageProps) {
  const srcSet =
    widths && widths.length > 1
      ? widths.map((w) => `${withWidth(src, w)} ${w}w`).join(", ")
      : undefined;

  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      alt={alt}
      width={width}
      height={height}
      // LCP image: load immediately, highest priority
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding={priority ? "sync" : "async"}
      className={className}
      style={style}
    />
  );
}

/** Cloudflare Images style resize: .../img.jpg -> .../img.jpg?width=800 */
function withWidth(src: string, w: number) {
  if (src.includes("imagedelivery.net")) return src; // variant URLs already sized
  const sep = src.includes("?") ? "&" : "?";
  return `${src}${sep}width=${w}`;
}
